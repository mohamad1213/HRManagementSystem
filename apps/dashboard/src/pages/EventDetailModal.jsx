import React, { useState } from 'react';
import { deleteEvent } from '../services/eventService';

const EventDetailModal = ({ event, isOpen, onClose, onDeleteSuccess }) => {
    const [deleting, setDeleting] = useState(false);

    if (!isOpen || !event) return null;

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            setDeleting(true);
            await deleteEvent(event.id);
            onDeleteSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to delete event:", err);
            alert("Failed to delete event.");
        } finally {
            setDeleting(false);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Important': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            case 'High': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface-light dark:bg-surface-dark w-full max-w-lg rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden transition-all scale-100">
                <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getPriorityColor(event.priority)}`}>
                            <span className="material-symbols-rounded text-xl">event</span>
                        </div>
                        <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Event Details</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-text-muted-light dark:text-text-muted-dark">
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="text-base font-bold text-text-main-light dark:text-text-main-dark mb-1">{event.title}</h4>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            {event.description || "No description provided."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-primary mt-0.5">calendar_today</span>
                            <div>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider font-semibold">Date</p>
                                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                                    {event.event_date ? new Date(event.event_date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'No date set'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-primary mt-0.5">schedule</span>
                            <div>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider font-semibold">Time</p>
                                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                                    {event.start_time?.substring(0, 5) || '--:--'} - {event.end_time?.substring(0, 5) || '--:--'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-primary mt-0.5">videocam</span>
                            <div>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider font-semibold">Platform</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{event.platform}</p>
                                    {event.platform_link && (
                                        <a href={event.platform_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-xs">
                                            Join <span className="material-symbols-rounded text-xs">open_in_new</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-primary mt-0.5">person</span>
                            <div>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider font-semibold">Organizer</p>
                                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{event.created_by_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 border-t border-border-light dark:border-border-dark">
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                        >
                            {deleting ? (
                                <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                                <>
                                    Delete Event
                                    <span className="material-symbols-rounded text-lg">delete</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-text-main-light dark:text-text-main-dark font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
