import React, { useState } from 'react';

const NewEventModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: '',
        platform: 'Google Meet',
        platform_link: '',
        priority: 'Normal'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { createEvent } = await import('../services/eventService');
            await createEvent(formData);
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to create event:", err);
            setError(err.response?.data ? JSON.stringify(err.response.data) : "Failed to create event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                    <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Create New Event</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-900/30">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="e.g. Quarterly Team Sync"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-24 resize-none"
                            placeholder="Brief details about the event..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Date</label>
                            <input
                                type="date"
                                name="event_date"
                                required
                                value={formData.event_date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Start Time</label>
                            <input
                                type="time"
                                name="start_time"
                                required
                                value={formData.start_time}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">End Time</label>
                            <input
                                type="time"
                                name="end_time"
                                required
                                value={formData.end_time}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Platform</label>
                            <select
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            >
                                <option value="Google Meet">Google Meet</option>
                                <option value="Zoom">Zoom</option>
                                <option value="Microsoft Teams">Microsoft Teams</option>
                                <option value="Office">In-Office</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Meeting Link (Optional)</label>
                            <input
                                type="url"
                                name="platform_link"
                                value={formData.platform_link}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1">Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-900 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        >
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                            <option value="Important">Important</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Event
                                    <span className="material-symbols-rounded text-lg">add</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEventModal;
