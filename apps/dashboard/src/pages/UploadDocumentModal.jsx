import React, { useState } from 'react';

export default function UploadDocumentModal({ isOpen, onClose, onUpload }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Legal',
        file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file || !formData.name) return;

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('file', formData.file);

            await onUpload(data);
            onClose();
            setFormData({ name: '', category: 'Legal', file: null });
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload document");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                    <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Upload Document</h2>
                    <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-1.5">Document Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-background-light dark:bg-slate-800 border-border-light dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 outline-none text-text-main-light dark:text-white"
                            placeholder="e.g. Employee Handbook 2025"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-1.5">Category</label>
                        <select
                            className="w-full bg-background-light dark:bg-slate-800 border-border-light dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 outline-none text-text-main-light dark:text-white"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Legal">Legal</option>
                            <option value="HR Policy">HR Policy</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text-main-light dark:text-text-main-dark mb-1.5">File</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-light dark:border-slate-700 border-dashed rounded-xl hover:border-primary/50 transition-colors cursor-pointer relative">
                            <div className="space-y-1 text-center">
                                <span className="material-symbols-rounded text-4xl text-text-muted-light dark:text-text-muted-dark">cloud_upload</span>
                                <div className="flex text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark outline-none">
                                        <span>{formData.file ? formData.file.name : 'Click to upload'}</span>
                                        <input type="file" required className="sr-only" onChange={handleFileChange} />
                                    </label>
                                </div>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark italic">
                                    PDF, DOCX, XLSX up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-lg border border-border-light dark:border-slate-700 text-sm font-medium text-text-main-light dark:text-text-main-dark hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    Upload
                                    <span className="material-symbols-rounded text-lg">check</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
