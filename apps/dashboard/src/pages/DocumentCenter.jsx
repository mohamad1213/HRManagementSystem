import React, { useState, useMemo, useEffect } from 'react';
import DocumentDetailView from './DocumentDetailView';
import ReviewDocumentModal from './ReviewDocumentModal';
import UploadDocumentModal from './UploadDocumentModal';
import { getDocuments, uploadDocument, deleteDocument as deleteDocApi, reviewDocument as reviewDocApi } from '../services/document';

export default function DocumentCenter({ onMenuClick }) {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const stats = [
        { label: 'Total Document', value: documents.length.toString(), trend: '10%', icon: 'description', color: 'bg-primary/10 text-primary', iconBg: 'bg-primary/20 text-primary' },
        { label: 'Approved', value: documents.filter(d => d.status === 'Approved').length.toString(), trend: '12%', icon: 'check_circle', color: 'bg-green-100 text-green-600', iconBg: 'bg-green-100 text-green-600' },
        { label: 'Awaiting', value: documents.filter(d => d.status === 'Awaiting').length.toString(), trend: '5%', icon: 'schedule', color: 'bg-yellow-100 text-yellow-600', iconBg: 'bg-yellow-100 text-yellow-600' },
        { label: 'Rejected', value: documents.filter(d => d.status === 'Rejected').length.toString(), trend: '2%', icon: 'cancel', color: 'bg-red-100 text-red-600', iconBg: 'bg-red-100 text-red-600' },
    ];

    const [viewDocument, setViewDocument] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // --- State for Filtering ---
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [actionDropdownId, setActionDropdownId] = useState(null);

    // --- Review Modal State ---
    const [reviewDocument, setReviewDocument] = useState(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    // --- Filter Options ---
    const statusOptions = ['All Status', 'Approved', 'Awaiting', 'Rejected'];
    const categoryOptions = ['All Categories', 'Legal', 'HR Policy', 'Finance'];

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const data = await getDocuments();
            setDocuments(Array.isArray(data) ? data : (data.results || []));
            setError(null);
        } catch (err) {
            console.error("Failed to fetch documents:", err);
            setError("Failed to load documents.");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const filteredDocuments = useMemo(() => {
        return documents.filter(doc => {
            const searchLower = searchTerm.toLowerCase();

            const matchesSearch =
                (doc.name?.toLowerCase() || '').includes(searchLower) ||
                (doc.filename?.toLowerCase() || '').includes(searchLower) ||
                (doc.category?.toLowerCase() || '').includes(searchLower) ||
                (doc.status?.toLowerCase() || '').includes(searchLower) ||
                (doc.uploaded_by_name?.toLowerCase() || '').includes(searchLower);

            const matchesStatus =
                statusFilter === 'All Status' ||
                doc.status.toLowerCase() === statusFilter.toLowerCase();

            const matchesCategory =
                categoryFilter === 'All Categories' ||
                doc.category.toLowerCase() === categoryFilter.toLowerCase();

            const matchesDate = () => {
                if (!startDate && !endDate) return true;

                const docDate = new Date(doc.uploaded_date);

                if (startDate && new Date(startDate) > docDate) return false;
                if (endDate && new Date(endDate) < docDate) return false;

                return true;
            };

            return matchesSearch && matchesStatus && matchesCategory && matchesDate();
        });
    }, [documents, searchTerm, statusFilter, categoryFilter, startDate, endDate]);


    const getFileIcon = (type) => {
        const t = type?.toLowerCase();
        if (t?.includes('pdf')) return { icon: 'picture_as_pdf', color: 'text-red-500' };
        if (t?.includes('doc')) return { icon: 'description', color: 'text-blue-500' };
        if (t?.includes('xls') || t?.includes('csv')) return { icon: 'table_view', color: 'text-green-500' };
        return { icon: 'article', color: 'text-gray-500' };
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'Awaiting': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Rejected': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return 'check_circle';
            case 'Awaiting': return 'schedule';
            case 'Rejected': return 'cancel';
            default: return 'help';
        }
    };

    const handleDeleteDocument = async (id) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await deleteDocApi(id);
                setDocuments(prev => prev.filter(doc => doc.id !== id));
                setViewDocument(null);
            } catch (err) {
                alert("Failed to delete document");
            }
        }
    };

    const handleOpenReview = (doc) => {
        setReviewDocument(doc);
        setIsReviewModalOpen(true);
        setActionDropdownId(null);
    };

    const handleConfirmReview = async (docId, decision, notes) => {
        try {
            await reviewDocApi(docId, decision, notes);
            setDocuments(prevDocs => prevDocs.map(doc => {
                if (doc.id === docId) {
                    return {
                        ...doc,
                        status: decision === 'approve' ? 'Approved' : 'Rejected',
                        review_notes: notes
                    };
                }
                return doc;
            }));
            setIsReviewModalOpen(false);
            setReviewDocument(null);
        } catch (err) {
            alert("Failed to review document");
        }
    };

    const handleUploadComplete = async (formData) => {
        try {
            await uploadDocument(formData);
            fetchDocuments();
            setIsUploadModalOpen(false);
        } catch (err) {
            throw err;
        }
    };

    if (viewDocument) {
        return <DocumentDetailView document={viewDocument} onBack={() => setViewDocument(null)} onDelete={handleDeleteDocument} />;
    }

    return (
        <main
            className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8"
            onClick={(e) => {
                setShowStatusDropdown(false);
                setShowCategoryDropdown(false);
                setActionDropdownId(null);
                e.stopPropagation();
            }}
        >
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    {/* Hamburger menu - mobile only */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 -ml-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-background-light dark:hover:bg-slate-800 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-rounded text-2xl">menu</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Document Center</h1>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage schedules, attendance, events, and leave requests in one place</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-purple-500/30"
                >
                    Upload Document
                    <span className="material-symbols-rounded text-lg">cloud_upload</span>
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">{stat.label}</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{stat.value}</span>
                                <div className="flex items-center text-xs font-semibold text-green-500 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-full">
                                    {stat.trend}
                                    <span className="material-symbols-rounded text-sm">arrow_upward</span>
                                </div>
                            </div>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                            <span className="material-symbols-rounded text-xl">{stat.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col min-h-[500px]">
                {/* Filters */}
                <div className="p-4 border-b border-border-light dark:border-border-dark flex flex-col lg:flex-row gap-4 justify-between items-center whitespace-nowrap">
                    <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center">
                        {/* Status Filter */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-slate-800 border border-border-light dark:border-slate-700 rounded-lg text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-slate-700 w-32 justify-between"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowStatusDropdown(!showStatusDropdown);
                                    setShowCategoryDropdown(false);
                                }}
                            >
                                <span className="truncate">{statusFilter}</span>
                                <span className="material-symbols-rounded text-lg">expand_more</span>
                            </button>
                            {showStatusDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark rounded-lg shadow-lg z-[100] overflow-hidden">
                                    {statusOptions.map(status => (
                                        <button
                                            key={status}
                                            className="w-full text-left px-4 py-2 text-[12px] hover:bg-gray-100 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark transition-colors"
                                            onClick={(e) => {
                                                setStatusFilter(status);
                                                setShowStatusDropdown(false);
                                                e.stopPropagation()
                                            }}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-slate-800 border border-border-light dark:border-slate-700 rounded-lg text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-slate-700 w-36 justify-between"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowCategoryDropdown(!showCategoryDropdown);
                                    setShowStatusDropdown(false);
                                    e.stopPropagation()
                                }}
                            >
                                <span className="truncate">{categoryFilter}</span>
                                <span className="material-symbols-rounded text-lg">expand_more</span>
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark rounded-lg shadow-lg z-[100] overflow-hidden">
                                    {categoryOptions.map(cat => (
                                        <button
                                            key={cat}
                                            className="w-full text-left px-4 py-2 text-[12px] hover:bg-gray-100 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark transition-colors"
                                            onClick={() => {
                                                setCategoryFilter(cat);
                                                setShowCategoryDropdown(false);
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Date Picker (Range) */}
                        <div className="flex items-center gap-2 bg-background-light dark:bg-slate-800 border border-border-light dark:border-slate-700 rounded-lg px-3 py-2">
                            <span className="material-symbols-rounded text-sm text-text-muted-light dark:text-text-muted-dark">calendar_month</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-transparent text-[12px] text-text-main-light dark:text-text-main-dark focus:outline-none w-[110px]"
                                placeholder="Start Date"
                            />
                            <span className="text-text-muted-light dark:text-text-muted-dark">-</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-transparent text-[12px] text-text-main-light dark:text-text-main-dark focus:outline-none w-[110px]"
                                placeholder="End Date"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 w-full lg:w-auto items-center">
                        {/* Search */}
                        <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
                            <span className="absolute left-3 top-2.5 text-text-muted-light dark:text-text-muted-dark material-symbols-rounded text-lg">search</span>
                            <input
                                className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-[12px] focus:ring-2 focus:ring-primary/50 dark:text-white placeholder-gray-400"
                                placeholder="Search document..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[300px]">
                    {loading ? (
                        <div className="w-full h-[300px] flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center gap-2">
                            <span className="material-symbols-rounded text-red-500 text-4xl">error</span>
                            <p className="text-text-muted-light dark:text-text-muted-dark font-medium">{error}</p>
                            <button onClick={fetchDocuments} className="text-primary hover:underline font-medium">Try again</button>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-background-light dark:bg-slate-800/50 text-[12px] font-semibold text-text-muted-light dark:text-text-muted-dark">
                                    <th className="p-4 pl-6 font-medium whitespace-nowrap">Nama File</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Category</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Uploaded By</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Uploaded Date</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Size</th>
                                    <th className="p-4 font-medium whitespace-nowrap">Status</th>
                                    <th className="p-4 font-medium text-right pr-6 whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark text-[12px]">
                                {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => {
                                    const fileIcon = getFileIcon(doc.file_type);
                                    const categoryStyles = {
                                        'Legal': 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
                                        'HR Policy': 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
                                        'Finance': 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
                                    };
                                    const catColor = categoryStyles[doc.category] || 'text-gray-600 bg-gray-100';

                                    return (
                                        <tr key={doc.id} className="hover:bg-background-light/50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="p-4 pl-6 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-border-light dark:border-slate-700 flex items-center justify-center shadow-sm flex-shrink-0">
                                                        <span className={`material-symbols-rounded ${fileIcon.color}`}>{fileIcon.icon}</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-text-main-light dark:text-text-main-dark text-[12px]">{doc.name}</div>
                                                        <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">{doc.filename}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap ${catColor}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1.5 mb-0.5"></span>
                                                    {doc.category}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                                        {doc.uploaded_by_name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="text-[12px] font-bold text-text-main-light dark:text-text-main-dark whitespace-nowrap">{doc.uploaded_by_name}</div>
                                                        <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">Uploader</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap">{doc.uploaded_date}</td>
                                            <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap">{doc.size}</td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap ${getStatusStyle(doc.status)}`}>
                                                    <span className="material-symbols-rounded text-[14px]">{getStatusIcon(doc.status)}</span>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right pr-6 align-middle relative">
                                                <button
                                                    className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActionDropdownId(actionDropdownId === doc.id ? null : doc.id);
                                                        setShowStatusDropdown(false);
                                                        setShowCategoryDropdown(false);
                                                    }}
                                                >
                                                    <span className="material-symbols-rounded">more_vert</span>
                                                </button>

                                                {actionDropdownId === doc.id && (
                                                    <div className="absolute right-8 top-10 w-32 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark rounded-lg shadow-lg z-50 overflow-hidden text-left">
                                                        <button
                                                            className="w-full px-4 py-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                                            onClick={() => setViewDocument(doc)}
                                                        >
                                                            <span className="material-symbols-rounded text-sm">visibility</span> Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenReview(doc)}
                                                            className="w-full px-4 py-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                                                        >
                                                            <span className="material-symbols-rounded text-sm">rate_review</span> Review
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDocument(doc.id)}
                                                            className="w-full px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                        >
                                                            <span className="material-symbols-rounded text-sm">delete</span> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan="7" className="p-8 text-center text-text-muted-light dark:text-text-muted-dark">
                                            No documents found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer / Pagination */}
                <div className="p-4 border-t border-border-light dark:border-border-dark flex justify-end items-center gap-2 mt-auto">
                    <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-slate-700 text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-1">
                        <span className="material-symbols-rounded text-sm">chevron_left</span>
                        Prev
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center border border-primary/20">1</button>
                    <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark flex items-center gap-1 shadow-lg shadow-purple-500/20">
                        Next
                        <span className="material-symbols-rounded text-sm">chevron_right</span>
                    </button>
                </div>
            </div>

            <ReviewDocumentModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                document={reviewDocument}
                onConfirm={handleConfirmReview}
            />

            <UploadDocumentModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleUploadComplete}
            />
        </main>
    );
}
