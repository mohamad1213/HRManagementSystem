import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/eventService';
import NewEventModal from './NewEventModal';
import EventDetailModal from './EventDetailModal';

export default function EventAnnouncement({ onMenuClick }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dateRange, setDateRange] = useState('01 October - 31 October 2024');

    const stats = [
        { label: 'Employees On Duty', value: '874', sub: 'Employee', icon: 'person', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Missing Check-ins', value: '12', sub: 'People', icon: 'error', color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' },
        { label: 'Leave request', value: '431', sub: 'Employee', icon: 'event_busy', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Contracts Expiring', value: '431', sub: 'Employee', icon: 'contract', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await getEvents();
            setEvents(Array.isArray(data) ? data : (data.results || []));
            setError(null);
        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError("Failed to load events.");
        } finally {
            setLoading(false);
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Important': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            case 'High': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
            default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    const timelineEvents = (events || []).slice(0, 7).map((event, index) => ({
        id: event.id,
        title: event.title,
        time: event.start_time?.substring(0, 5) || '00:00',
        duration: 2, // Default duration for timeline preview
        color: index % 2 === 0 ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200',
        row: (index % 5) + 1
    }));

    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

    // Timeline Calculation Helpers
    const START_HOUR = 8;
    const END_HOUR = 23;
    const TOTAL_HOURS = END_HOUR - START_HOUR;

    const getEventStyle = (time, duration) => {
        if (!time) return { left: '0%', width: '0%' };
        const [hour, minute] = time.split(':').map(Number);
        const startOffset = (hour + minute / 60) - START_HOUR;
        const left = (startOffset / TOTAL_HOURS) * 100;
        const width = (duration / TOTAL_HOURS) * 100;

        return {
            left: `${left}%`,
            width: `${width}%`
        };
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                        <span className="material-symbols-rounded text-2xl">menu</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Event and Announcement</h1>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage schedules, attendance, events, and leave requests in one place</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-purple-500/30"
                >
                    New Event
                    <span className="material-symbols-rounded text-lg">add</span>
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                <span className="material-symbols-rounded text-xl">{stat.icon}</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <span className="material-symbols-rounded">more_horiz</span>
                            </button>
                        </div>
                        <h3 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-1">{stat.value}</h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{stat.label}</p>
                        <span className="text-xs text-gray-400 absolute bottom-6 right-6 font-medium">{stat.sub}</span>
                    </div>
                ))}
            </div>

            {/* Upcoming Agendas (Timeline) */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Upcoming Agendas</h2>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark rounded-xl text-sm font-medium text-text-main-light dark:text-text-main-dark bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                            {dateRange}
                            <span className="material-symbols-rounded text-lg">expand_more</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark rounded-xl text-sm font-medium text-text-main-light dark:text-text-main-dark bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                            Filter
                            <span className="material-symbols-rounded text-lg">filter_list</span>
                        </button>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="relative overflow-x-auto pb-4">
                    <div className="min-w-[1000px]">
                        {/* Time Headers */}
                        <div className="flex justify-between text-xs text-text-muted-light dark:text-text-muted-dark mb-6 px-4">
                            {hours.map((hour, i) => (
                                <div key={i} className={`relative flex flex-col items-center ${hour === '15:00' ? 'text-primary font-bold' : ''}`}>
                                    {hour === '15:00' ? (
                                        <div className="px-3 py-1 bg-primary text-white rounded-full mb-2 shadow-lg shadow-purple-500/30">{hour}</div>
                                    ) : (
                                        <span className="mb-2">{hour}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Events Container */}
                        <div className="relative h-[300px] border-l border-r border-dashed border-border-light dark:border-gray-800 mx-4">
                            {/* Vertical Grid Lines */}
                            <div className="absolute inset-0 flex justify-between pointer-events-none">
                                {hours.map((_, i) => (
                                    <div key={i} className={`h-full border-r border-dashed border-border-light dark:border-gray-800 w-px ${i === hours.length - 1 ? 'border-none' : ''}`}></div>
                                ))}
                            </div>

                            {/* Current Time Line Mockup (at 15:00) */}
                            <div className="absolute top-0 bottom-0 left-[46.6%] w-px bg-primary z-10 hidden sm:block">
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                            </div>

                            {/* Dynamic Event Blocks */}
                            {timelineEvents.map((event) => {
                                const style = getEventStyle(event.time, event.duration);
                                const topPos = (event.row - 1) * 60 + 16;

                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEvent(events.find(e => e.id === event.id))}
                                        className={`absolute h-12 rounded-xl text-xs font-medium flex items-center px-3 shadow-sm border border-l-4 ${event.color} hover:shadow-md transition-shadow cursor-pointer`}
                                        style={{
                                            ...style,
                                            top: `${topPos}px`
                                        }}
                                        title={`${event.title} (${event.time})`}
                                    >
                                        <span className="bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded text-[10px] mr-2">{event.time}</span>
                                        <span className="truncate">{event.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Event List */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-6">Upcoming Event</h2>
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-text-muted-light dark:text-text-muted-dark">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                            <p>Loading events...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500">
                            <p>{error}</p>
                            <button onClick={fetchEvents} className="text-primary hover:underline mt-2">Try again</button>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-12 text-text-muted-light dark:text-text-muted-dark border border-dashed border-border-light dark:border-border-dark rounded-xl">
                            <span className="material-symbols-rounded text-4xl mb-2">event_busy</span>
                            <p>No upcoming events found.</p>
                        </div>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-border-light dark:border-border-dark rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors gap-4 cursor-pointer group"
                            >
                                <div className="flex-grow">
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Meet Name</div>
                                    <div className="font-semibold text-text-main-light dark:text-text-main-dark text-sm group-hover:text-primary transition-colors">{event.title}</div>
                                </div>

                                <div className="min-w-[150px]">
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Started at</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">
                                        {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'No date'} at {event.start_time?.substring(0, 5) || '--:--'}
                                    </div>
                                </div>

                                <div className="min-w-[150px] flex items-center gap-3">
                                    <div className="w-8 h-8 rounded p-1 bg-white border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-primary text-xl">videocam</span>
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-0.5">Platform</div>
                                        <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{event.platform}</div>
                                    </div>
                                </div>

                                <div className="min-w-[120px]">
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-2">Organizer</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border-2 border-white dark:border-slate-800">
                                            {event.created_by_name?.charAt(0) || 'O'}
                                        </div>
                                        <span className="text-xs font-medium text-text-main-light dark:text-text-main-dark">{event.created_by_name}</span>
                                    </div>
                                </div>

                                <div className="min-w-[100px] flex items-center justify-between gap-4 w-full lg:w-auto">
                                    <div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Status</div>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(event.priority)}`}>
                                            <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                            {event.priority}
                                        </span>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <span className="material-symbols-rounded">more_vert</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <NewEventModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchEvents}
                />
                <EventDetailModal
                    event={selectedEvent}
                    isOpen={!!selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onDeleteSuccess={fetchEvents}
                />
            </div>
        </main>
    );
}
