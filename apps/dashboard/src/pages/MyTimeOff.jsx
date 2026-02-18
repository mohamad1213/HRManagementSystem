import React, { useState } from 'react';

const MyTimeOff = ({ onMenuClick }) => {
    // --- Mock Data ---
    const metrics = [
        { label: 'Remaining Leave', value: '18', sub: '/days', footer: 'Your available balance for the current year.', icon: 'event_note', color: 'purple', bg: 'purple' },
        { label: 'Used This Year', value: '12', sub: '/days', footer: 'Total time off taken this year.', icon: 'description', color: 'blue', bg: 'blue' },
        { label: 'Pending Requests', value: '1', sub: '/request', footer: 'Awaiting approval.', icon: 'pending_actions', color: 'orange', bg: 'orange' },
        { label: 'Rejected / Cancelled', value: '1', sub: '/request', footer: 'Previously declined or withdrawn.', icon: 'cancel', color: 'rose', bg: 'rose' },
    ];

    const initialRequests = [
        { type: 'Annual Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Family event', attachment: 'File.pdf', status: 'Approved' },
        { type: 'Personal Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Attending graduation', attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Sick Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: "Doctor's recommendation", attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Personal Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Short trip with family', attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Unpaid Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Insufficient leave balance', attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Annual Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Attending a close family gathering that has...', attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Personal Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Experiencing a mild fever since last night. Pl...', attachment: 'File.pdf', status: 'Awaiting' },
        { type: 'Personal Leave', start: '17 Oct, 2025', end: '17 Oct, 2025', duration: '3 days', reason: 'Taking a short personal break due to burnou...', attachment: 'File.pdf', status: 'Rejected' },
    ];

    const [requests, setRequests] = useState(initialRequests);
    const [searchTerm, setSearchTerm] = useState('');

    // --- Modal State ---
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestData, setRequestData] = useState({
        type: '',
        startDate: '',
        endDate: '',
        notes: ''
    });

    const handleRequestSubmit = () => {
        console.log("Submitting request:", requestData);
        // Add new request logic here
        setShowRequestModal(false);
        setRequestData({ type: '', startDate: '', endDate: '', notes: '' });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-50 text-green-600';
            case 'Awaiting': return 'bg-yellow-50 text-yellow-600';
            case 'Rejected': return 'bg-red-50 text-red-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return 'check_circle';
            case 'Awaiting': return 'schedule'; // or pending
            case 'Rejected': return 'cancel';
            default: return 'help';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">My Time Off</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your personal leave and time-off records.</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setShowRequestModal(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-bold hover:bg-[#6D28D9] shadow-lg shadow-purple-200 transition-all active:scale-95"
                    >
                        Request Time Off <span className="material-symbols-rounded text-lg">description</span>
                    </button>
                </div>
            </header>

            <main className="p-8 max-w-[1600px] mx-auto space-y-8">

                {/* Metrics Row */}
                {/* Metrics Row (Single Card) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {metrics.map((m, i) => (
                            <div key={i} className={`flex flex-col ${i > 0 ? 'md:pl-8 pt-8 md:pt-0' : 'pb-8 md:pb-0'}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${m.bg}-50 text-${m.color}-500`}>
                                        <span className="material-symbols-rounded text-lg">{m.icon}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">{m.label}</span>
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <h3 className="text-3xl font-bold text-slate-800">{m.value}</h3>
                                        {m.sub && <span className="text-sm text-slate-400 font-bold">{m.sub}</span>}
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-400">
                                        {m.footer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter & Table Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-96">
                            <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">search</span>
                            <input
                                type="text"
                                placeholder="Search request time off record..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-slate-300 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <select className="appearance-none w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                                    <option>All Status</option>
                                    <option>Approved</option>
                                    <option>Awaiting</option>
                                    <option>Rejected</option>
                                </select>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                            </div>
                            <div className="relative flex-1 md:flex-none">
                                <select className="appearance-none w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                                    <option>Type</option>
                                    <option>Annual Leave</option>
                                    <option>Sick Leave</option>
                                </select>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                            </div>
                            <div className="relative flex-1 md:flex-none">
                                <select className="appearance-none w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                                    <option>All Dates</option>
                                </select>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Start date / End Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">Reason / Notes</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Attachment</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, index) => (
                                    <tr key={index} className="hover:bg-slate-50/50 transition-colors group border-b border-dashed border-slate-100 last:border-0 text-xs">
                                        <td className="px-6 py-5 font-bold text-slate-700">{req.type}</td>
                                        <td className="px-6 py-5 font-bold text-slate-700">
                                            {req.start}
                                            {req.start !== req.end && <span className="text-slate-400 mx-1">-</span>}
                                            {req.start !== req.end && req.end}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-700">{req.duration}</td>
                                        <td className="px-6 py-5 font-medium text-slate-600">{req.reason}</td>
                                        <td className="px-6 py-5">
                                            <a href="#" className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline decoration-1 underline-offset-2 transition-all">
                                                {req.attachment}
                                                <span className="material-symbols-rounded text-sm bg-purple-50 p-0.5 rounded">download</span>
                                            </a>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold ${getStatusStyle(req.status)}`}>
                                                <span className={`material-symbols-rounded text-sm ${req.status === 'Approved' ? 'bg-green-100 text-green-600 rounded-full p-0.5' : req.status === 'Rejected' ? 'bg-red-100 text-red-600 rounded-full p-0.5' : 'bg-yellow-100 text-yellow-600 rounded-full p-0.5'}`}>
                                                    {getStatusIcon(req.status)}
                                                </span>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                                                <span className="material-symbols-rounded text-lg">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>

            {/* --- Request Time Off Modal --- */}
            {
                showRequestModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                                <h2 className="text-xl font-bold text-slate-800">New Request Off</h2>
                                <button
                                    onClick={() => setShowRequestModal(false)}
                                    className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
                                >
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Select Type */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Select Type</label>
                                    <div className="relative">
                                        <select
                                            value={requestData.type}
                                            onChange={(e) => setRequestData({ ...requestData, type: e.target.value })}
                                            className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
                                        >
                                            <option value="">All Type</option>
                                            <option value="Annual Leave">Annual Leave</option>
                                            <option value="Sick Leave">Sick Leave</option>
                                            <option value="Personal Leave">Personal Leave</option>
                                            <option value="Unpaid Leave">Unpaid Leave</option>
                                        </select>
                                        <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Start date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={requestData.startDate}
                                                onChange={(e) => setRequestData({ ...requestData, startDate: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
                                            />
                                            {/* <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_today</span> */}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">End date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={requestData.endDate}
                                                onChange={(e) => setRequestData({ ...requestData, endDate: e.target.value })}
                                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
                                            />
                                            {/* <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_today</span> */}
                                        </div>
                                    </div>
                                </div>

                                {/* Upload File */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Upload Media / File</label>
                                    <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-purple-50/30 hover:bg-purple-50/50 transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-rounded text-2xl">cloud_upload</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-700 mb-1">Drop your file here</p>
                                        <p className="text-xs text-slate-400 mb-4">Drag & drop or browse to begin.</p>
                                        <button className="px-6 py-2 bg-white border border-purple-100 rounded-xl text-xs font-bold text-purple-600 shadow-sm hover:shadow-md transition-all">
                                            Browse file
                                        </button>
                                        <p className="text-[10px] text-slate-400 mt-4 font-medium">Supported formats: jpg, png, pdf — up to 10MB.</p>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-500">Notes (Optional)</label>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            value={requestData.notes}
                                            onChange={(e) => setRequestData({ ...requestData, notes: e.target.value })}
                                            placeholder="Add additional notes/reason for this Request off..."
                                            maxLength={360}
                                            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 h-32 resize-none"
                                        ></textarea>
                                        <span className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                            <span className="material-symbols-rounded text-xs">edit_note</span> {requestData.notes.length}/360
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end items-center gap-3 p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
                                <button
                                    onClick={() => setShowRequestModal(false)}
                                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-white hover:border-slate-300 transition-all bg-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRequestSubmit}
                                    className="px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] shadow-lg shadow-purple-200 transition-all"
                                >
                                    Request time off
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyTimeOff;
