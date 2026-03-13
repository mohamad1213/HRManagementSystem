import React, { useState } from 'react';

const ReviewDocumentModal = ({ isOpen, onClose, document, onConfirm }) => {
    const [decision, setDecision] = useState('approve'); // 'approve' or 'reject'
    const [notes, setNotes] = useState('');
    const maxChars = 360;

    if (!isOpen || !document) return null;

    const handleConfirm = () => {
        onConfirm(document.id, decision, notes);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 dark:border-border-dark overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-border-dark">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-text-main-dark">Review Document</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {/* Document Info Card */}
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 flex gap-4 mb-6 border border-gray-100 dark:border-border-dark items-start">
                        <div className="w-12 h-14 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-border-dark flex items-center justify-center flex-shrink-0 shadow-sm">
                            {/* Placeholder for document thumb */}
                            <span className="material-symbols-rounded text-2xl text-red-500">picture_as_pdf</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-text-main-dark text-sm truncate" title={document.filename}>
                                        {document.filename}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Category: <span className="text-gray-700 dark:text-gray-300 font-medium">{document.category}</span></p>
                                </div>
                                <button className="flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary-dark transition-colors">
                                    Preview
                                    <span className="material-symbols-rounded text-[14px]">open_in_new</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                                    {document.uploaded_by_name?.charAt(0) || 'U'}
                                </div>
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{document.uploaded_by_name}</span>
                                    <span>•</span>
                                    <span>{document.uploaded_date}</span>
                                    <span>•</span>
                                    <span>{document.size}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decision Selector */}
                    <div className="mb-6">
                        <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 block">Decision</label>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Approve Card */}
                            <button
                                onClick={() => setDecision('approve')}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center group ${decision === 'approve'
                                    ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10'
                                    : 'border-gray-200 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-900/30 bg-white dark:bg-surface-dark'
                                    }`}
                            >
                                {decision === 'approve' && (
                                    <div className="absolute top-2 right-2 text-green-500">
                                        <span className="material-symbols-rounded text-lg">check_circle</span>
                                    </div>
                                )}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${decision === 'approve' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500'
                                    }`}>
                                    <span className="material-symbols-rounded text-xl">thumb_up</span>
                                </div>
                                <div>
                                    <div className={`font-semibold text-sm ${decision === 'approve' ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>Approve</div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Standard workflow</div>
                                </div>
                            </button>

                            {/* Reject Card */}
                            <button
                                onClick={() => setDecision('reject')}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 text-center group ${decision === 'reject'
                                    ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10'
                                    : 'border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/30 bg-white dark:bg-surface-dark'
                                    }`}
                            >
                                {decision === 'reject' && (
                                    <div className="absolute top-2 right-2 text-red-500">
                                        <span className="material-symbols-rounded text-lg">check_circle</span>
                                    </div>
                                )}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${decision === 'reject' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-red-500'
                                    }`}>
                                    <span className="material-symbols-rounded text-xl">thumb_down</span>
                                </div>
                                <div>
                                    <div className={`font-semibold text-sm ${decision === 'reject' ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>Reject</div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Requires feedback</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Notes (Optional)</label>
                        </div>
                        <div className="relative">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                maxLength={maxChars}
                                placeholder="Add additional notes for this action..."
                                className="w-full h-24 p-3 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none placeholder:text-gray-400 font-normal"
                            />
                            <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium bg-white/80 dark:bg-slate-800/80 px-1 rounded">
                                <span className="material-symbols-rounded text-[10px] align-middle mr-0.5">keyboard</span>
                                {notes.length}/{maxChars}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-border-dark flex justify-end gap-3 bg-gray-50/50 dark:bg-slate-800/30">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors shadow-lg shadow-purple-500/20"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDocumentModal;
