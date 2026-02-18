import React, { useState, useRef, useEffect } from 'react';

const DocumentDetail = ({ document, onBack, onDelete }) => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const viewerRef = useRef(null);

    // If no document is provided, don't render anything
    if (!document) return null;

    // --- Action Handlers ---

    const handleDownload = () => {
        // Mock download functionality
        alert(`Starting download for ${document.filename}...`);
    };

    const handlePrint = () => {
        window.print();
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (viewerRef.current) {
                viewerRef.current.requestFullscreen().catch((e) => {
                    console.error(`Error attempting to enable fullscreen mode: ${e.message} (${e.name})`);
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Listen for fullscreen changes to update state
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        const doc = window.document;
        doc.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => doc.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

    const handleDelete = () => {
        if (onDelete) {
            onDelete(document.id);
        }
    };

    const handleReplace = () => {
        alert("Upload new version feature coming soon!");
    };

    const handleEditInfo = () => {
        alert("Edit metadata form coming soon!");
    };

    const handleEditDocument = () => {
        alert("Online document editor integration coming soon!");
    };

    // --- Render ---

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8 h-full">
            {/* Top Navigation Bar */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                >
                    <span className="material-symbols-rounded">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                        {document.filename}
                    </h1>
                    <div className="text-sm text-text-muted-light dark:text-text-muted-dark flex items-center gap-1">
                        Document Center
                        <span className="material-symbols-rounded text-sm">chevron_right</span>
                        Document Detail
                        <span className="material-symbols-rounded text-sm">chevron_right</span>
                        <span className="text-text-main-light dark:text-text-main-dark font-medium">{document.name}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Content - Document Viewer */}
                <div
                    ref={viewerRef}
                    className={`flex-grow bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark min-h-[600px] flex flex-col transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none w-full h-full' : ''}`}
                >
                    {/* Viewer Toolbar */}
                    <div className="flex items-center justify-between mb-4 border-b border-border-light dark:border-border-dark pb-3">
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <span className="material-symbols-rounded">menu</span>
                            <span className="text-sm">1 of 28</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-background-light dark:bg-slate-800 rounded-lg px-2 py-1">
                                <button onClick={handleZoomOut} className="p-1 hover:text-primary" title="Zoom Out">
                                    <span className="material-symbols-rounded text-sm">remove</span>
                                </button>
                                <span className="text-sm font-medium px-2 w-12 text-center">{zoomLevel}%</span>
                                <button onClick={handleZoomIn} className="p-1 hover:text-primary" title="Zoom In">
                                    <span className="material-symbols-rounded text-sm">add</span>
                                </button>
                            </div>
                            <button onClick={handlePrint} className="text-text-muted-light hover:text-primary" title="Print">
                                <span className="material-symbols-rounded">print</span>
                            </button>
                            <button onClick={toggleFullscreen} className="text-text-muted-light hover:text-primary" title="Toggle Fullscreen">
                                <span className="material-symbols-rounded">{isFullscreen ? 'close_fullscreen' : 'fullscreen'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Document Content Area (Mock) */}
                    <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-border-light dark:border-border-dark p-8 overflow-auto">
                        <div
                            className="text-center w-full transition-transform duration-200 ease-out"
                            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                        >
                            <span className="material-symbols-rounded text-6xl text-gray-300 dark:text-slate-600 mb-4">description</span>
                            <p className="text-text-muted-light dark:text-text-muted-dark mb-8">Document Preview Placeholder</p>

                            {/* Mock Document Page */}
                            <div className="bg-white dark:bg-slate-900 p-8 shadow-sm max-w-3xl mx-auto text-left rounded-lg border border-gray-200 dark:border-slate-700 h-[800px] overflow-hidden relative">
                                <h2 className="text-center font-bold text-xl mb-6 text-gray-800 dark:text-gray-200 uppercase">{document.name}</h2>
                                <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    <p>
                                        <strong>EFFECTIVE DATE:</strong> {document.date}
                                    </p>
                                    <p className="text-justify">
                                        This document serves as a formal record of the <strong>{document.name}</strong>. It outlines the terms, conditions, and specifications related to {document.category}. All parties involved are required to adhere to the guidelines set forth herein.
                                    </p>
                                    <p className="text-justify">
                                        <strong>1. PURPOSE</strong><br />
                                        The purpose of this document is to establish a clear understanding of the expectations and responsibilities. This ensures transparency and accountability across all levels of the organization.
                                    </p>
                                    <p className="text-justify">
                                        <strong>2. SCOPE</strong><br />
                                        This policy applies to all employees, contractors, and stakeholders interacting with the {document.category} department. Deviations from this policy must be approved in writing by the designated authority.
                                    </p>
                                    <p className="text-justify">
                                        <strong>3. CONFIDENTIALITY</strong><br />
                                        Information contained within this document is classified as internal and confidential. Unauthorized distribution or reproduction is strictly prohibited.
                                    </p>

                                    {/* Obfuscated / Lorem Ipsum filler for visual texture */}
                                    <p className="text-justify opacity-60 filter blur-[0.3px]">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>

                                {/* Footer of the page */}
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-400 border-t pt-4">
                                    <span>Page 1 of 28</span>
                                    <span>{document.filename}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Details & Actions */}
                {!isFullscreen && (
                    <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
                        {/* Meta Information Card */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-rounded text-2xl">picture_as_pdf</span>
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="font-semibold text-text-main-light dark:text-text-main-dark truncate" title={document.name}>{document.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium`}>{document.category}</span>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300 font-medium uppercase">{document.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-border-light dark:border-border-dark">
                                    <span className="text-text-muted-light dark:text-text-muted-dark">File Size</span>
                                    <span className="font-medium text-text-main-light dark:text-text-main-dark">{document.size}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border-light dark:border-border-dark">
                                    <span className="text-text-muted-light dark:text-text-muted-dark">Created</span>
                                    <span className="font-medium text-text-main-light dark:text-text-main-dark">{document.date}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border-light dark:border-border-dark">
                                    <span className="text-text-muted-light dark:text-text-muted-dark">Last Modified</span>
                                    <span className="font-medium text-text-main-light dark:text-text-main-dark">Oct 24, 2025</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border-light dark:border-border-dark">
                                    <span className="text-text-muted-light dark:text-text-muted-dark">Uploaded</span>
                                    <span className="font-medium text-text-main-light dark:text-text-main-dark">{document.date}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase mb-3">Owner</h4>
                                <div className="flex items-center gap-3">
                                    <img src={document.uploadedBy.avatar} alt={document.uploadedBy.name} className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{document.uploadedBy.name}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase">Access Permission</h4>
                                    <button
                                        className="text-xs text-primary hover:underline"
                                        onClick={() => alert("Access Management Modal coming soon!")}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                                    <span className="material-symbols-rounded text-lg">public</span>
                                    <span className="text-xs font-medium">All Staff</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3">
                                <button
                                    onClick={handleDownload}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-purple-500/30"
                                >
                                    Download File
                                    <span className="material-symbols-rounded text-lg">cloud_download</span>
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={handleReplace}
                                        className="border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                                    >
                                        Replace
                                        <span className="material-symbols-rounded text-base">upload</span>
                                    </button>
                                    <button
                                        onClick={handleEditInfo}
                                        className="border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                                    >
                                        Edit Info
                                        <span className="material-symbols-rounded text-base">edit</span>
                                    </button>
                                </div>
                                <button
                                    onClick={handleEditDocument}
                                    className="w-full border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                                >
                                    Edit Document
                                    <span className="material-symbols-rounded text-base">edit_document</span>
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                                >
                                    Delete File
                                    <span className="material-symbols-rounded text-base">delete</span>
                                </button>
                            </div>
                        </div>

                        {/* Related Documents */}
                        <div>
                            <h4 className="font-semibold text-text-main-light dark:text-text-main-dark mb-3">Related Document</h4>
                            <div className="space-y-3">
                                {/* Mock Related Docs */}
                                <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-border-light dark:border-border-dark flex items-center gap-3 hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <span className="material-symbols-rounded">description</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Amendment v2.0</div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark">DOCX • 0.8 MB</div>
                                    </div>
                                </div>
                                <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-border-light dark:border-border-dark flex items-center gap-3 hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <span className="material-symbols-rounded">description</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Legal Guidelines Appx</div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark">PDF • 1.2 MB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentDetail;
