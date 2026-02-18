import React, { useState } from 'react';

const MyAttendance = ({ onMenuClick }) => {
    // --- Mock Data ---
    const initialMetrics = [
        { label: 'Days Present', value: '18', sub: '/days', footer: 'Auto-synced · 10 November 2025', icon: 'history', color: 'blue' },
        { label: 'Days Absent', value: '2', sub: '/days', footer: 'No change from last month', icon: 'event_busy', color: 'rose' },
        { label: 'Total Hours Worked', value: '142h 20m', sub: '', footer: 'Average 7h/day', icon: 'work_history', color: 'purple' },
        { label: 'Overtime Hours', value: '12h 40m', sub: '', footer: '+4h from last month', footerColor: 'text-purple-600', icon: 'av_timer', color: 'orange' },
    ];

    const initialAttendanceLog = [
        {
            date: 'Today',
            clockIn: '08:40 AM',
            clockOut: '17:12 PM',
            duration: '08h 12m',
            segments: [
                { type: 'work', width: '30%', label: 'Working time' },
                { type: 'break', width: '10%', label: 'Break' },
                { type: 'work', width: '20%', label: 'Working time' },
                { type: 'empty', width: '40%' }
            ]
        },
        {
            date: 'Friday, 11',
            clockIn: '08:40 AM',
            clockOut: '17:12 PM',
            duration: '08h 12m',
            notes: true,
            segments: [
                { type: 'work', width: '30%', label: 'Working time' },
                { type: 'break', width: '10%', label: 'Break' },
                { type: 'overtime', width: '25%', label: 'Over time' },
                { type: 'empty', width: '35%' }
            ]
        },
        {
            date: 'Thursday, 10',
            clockIn: '08:40 AM',
            clockOut: '17:12 PM',
            duration: '08h 12m',
            notes: true,
            approved: true,
            segments: [
                { type: 'off', width: '100%', label: 'Requested off' }
            ]
        },
        {
            date: 'Wednesday, 03',
            clockIn: '08:40 AM',
            clockOut: '17:12 PM',
            duration: '08h 12m',
            segments: [
                { type: 'late', width: '10%', label: 'Late' },
                { type: 'work', width: '20%', label: 'Working time' },
                { type: 'break', width: '10%', label: 'Break' },
                { type: 'work', width: '20%', label: 'Working time' },
                { type: 'overtime', width: '20%', label: 'Over time' },
                { type: 'empty', width: '20%' }
            ]
        },
        {
            date: 'Tuesday, 02',
            clockIn: '08:40 AM',
            clockOut: '17:12 PM',
            duration: '08h 12m',
            segments: [
                { type: 'late', width: '10%', label: 'Late' },
                { type: 'work', width: '20%', label: 'Working time' },
                { type: 'break', width: '10%', label: 'Break' },
                { type: 'work', width: '20%', label: 'Working time' },
                { type: 'empty', width: '40%' }
            ]
        }
    ];

    // --- Helper for Segment Colors ---
    const getSegmentStyle = (type) => {
        switch (type) {
            case 'work': return 'bg-[#A855F7] text-white';
            case 'break': return 'bg-[#60A5FA] text-white';
            case 'overtime': return 'bg-[#FBBF24] text-white';
            case 'late': return 'bg-[#F43F5E] text-white';
            case 'off': return 'bg-[#FCD34D] text-slate-800 font-bold';
            case 'empty': return 'bg-slate-100';
            default: return 'bg-slate-200';
        }
    };

    const [metrics, setMetrics] = useState(initialMetrics);
    const [attendanceLog, setAttendanceLog] = useState(initialAttendanceLog);

    // --- Detail Modal State ---
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    // --- New Attendance Modal State ---
    const [showNewAttendanceModal, setShowNewAttendanceModal] = useState(false);
    const [newAttendanceData, setNewAttendanceData] = useState({
        type: 'check-in', // 'check-in' or 'check-out'
        location: 'on-site', // 'on-site', 'wfh', 'anywhere'
        notes: ''
    });

    // --- Break Session Modal State ---
    const [showBreakModal, setShowBreakModal] = useState(false);
    const [breakData, setBreakData] = useState({
        type: 'start', // 'start' or 'end'
        notes: ''
    });

    const handleLogClick = (log) => {
        setSelectedLog(log);
        setShowDetailModal(true);
    };

    const handleNewAttendanceSubmit = () => {
        console.log("Submitting new attendance:", newAttendanceData);
        // Here you would typically make an API call.
        // For functionality demonstration, we can simulate adding a new entry or updating status.

        // Example: Add a new "Pending" log to the list (top)
        const newLog = {
            date: 'Today (New)',
            clockIn: newAttendanceData.type === 'check-in' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
            clockOut: newAttendanceData.type === 'check-out' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-',
            duration: '-',
            segments: [{ type: 'work', width: '0%', label: 'Started' }, { type: 'empty', width: '100%' }],
            notes: newAttendanceData.notes.length > 0
        };

        setAttendanceLog([newLog, ...attendanceLog]);
        setShowNewAttendanceModal(false);
        setNewAttendanceData({ type: 'check-in', location: 'on-site', notes: '' }); // Reset
    };

    const handleBreakSubmit = () => {
        console.log("Submitting break session:", breakData);
        // Simulate adding a break
        // close modal
        setShowBreakModal(false);
        setBreakData({ type: 'start', notes: '' });
    };

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {onMenuClick && (
                            <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                                <span className="material-symbols-rounded text-2xl">menu</span>
                            </button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">My Attendance</h1>
                            <p className="text-sm text-slate-500 mt-1">View and track your complete attendance log.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowBreakModal(true)}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                        >
                            Break <span className="material-symbols-rounded text-base">local_cafe</span>
                        </button>
                        <button
                            onClick={() => setShowNewAttendanceModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-xs font-bold hover:bg-[#6D28D9] shadow-sm shadow-purple-200 transition-all active:scale-95"
                        >
                            Start Check in 00h 04m 34s <span className="material-symbols-rounded text-base">play_circle</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-8">

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${m.color}-50 text-${m.color}-500`}>
                                    <span className="material-symbols-rounded text-lg">{m.icon}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-500">{m.label}</span>
                            </div>
                            <div className="mt-auto">
                                <div className="flex items-baseline gap-1 mb-2">
                                    <h3 className="text-3xl font-bold text-slate-800">{m.value}</h3>
                                    {m.sub && <span className="text-sm text-slate-400 font-bold">{m.sub}</span>}
                                </div>
                                <p className={`text-[10px] font-medium ${m.footerColor || 'text-slate-400'}`}>
                                    {m.footer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400">
                            <button className="hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors"><span className="material-symbols-rounded">chevron_left</span></button>
                            <button className="hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition-colors"><span className="material-symbols-rounded">chevron_right</span></button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">01 November - 30 November</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select className="appearance-none bg-white border border-slate-200 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer">
                                <option>This Month</option>
                            </select>
                            <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 bg-white transition-colors">
                            Custom Range <span className="material-symbols-rounded text-base">calendar_month</span>
                        </button>
                    </div>
                </div>

                {/* Attendance List */}
                <div className="space-y-4">
                    {/* Time Ruler Labels */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden lg:grid">
                        <div className="col-span-2"></div> {/* Date/Clock-in */}
                        <div className="col-span-8 flex justify-between">
                            <span>09:00</span>
                            <span>11:00</span>
                            <span>13:00</span>
                            <span>15:00</span>
                            <span>17:00</span>
                            <span>19:00</span>
                            <span>21:00</span>
                            <span>23:59</span>
                        </div>
                        <div className="col-span-2"></div> {/* Clock-out/Duration */}
                    </div>

                    {attendanceLog.map((log, index) => (
                        <div
                            key={index}
                            onClick={() => handleLogClick(log)}
                            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-purple-200 transition-colors cursor-pointer"
                        >
                            {/* Badges */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                {log.notes && (
                                    <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                        <span className="material-symbols-rounded text-xs">description</span> Notes added
                                    </span>
                                )}
                                {log.approved && (
                                    <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                        <span className="material-symbols-rounded text-xs">check_circle</span> Approved
                                    </span>
                                )}
                            </div>

                            <h4 className="font-bold text-slate-800 mb-4">{log.date}</h4>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* Clock In */}
                                <div className="col-span-2 lg:col-span-1 border-l-2 border-slate-100 pl-3">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1">Clock-in</p>
                                    <p className="text-sm font-bold text-slate-700">{log.clockIn}</p>
                                </div>

                                {/* Timeline Bar */}
                                <div className="col-span-12 lg:col-span-9 h-8 flex rounded-lg overflow-hidden relative">
                                    {/* Ruler Lines (Background) */}
                                    <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
                                        {[...Array(8)].map((_, i) => <div key={i} className="w-px h-full bg-slate-400 border-dashed border-l"></div>)}
                                    </div>

                                    {log.segments.map((seg, i) => (
                                        <div
                                            key={i}
                                            className={`${getSegmentStyle(seg.type)} h-full flex items-center justify-center text-[10px] font-bold whitespace-nowrap overflow-hidden transition-all hover:opacity-90 cursor-default`}
                                            style={{ width: seg.width }}
                                            title={seg.label}
                                        >
                                            {/* Only show label if width is sufficient */}
                                            {seg.type !== 'empty' && seg.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Clock Out & Duration */}
                                <div className="col-span-6 lg:col-span-1 border-l-2 border-slate-100 pl-3">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1">Clock-out</p>
                                    <p className="text-sm font-bold text-slate-700">{log.clockOut}</p>
                                </div>
                                <div className="col-span-6 lg:col-span-1 border-l-2 border-slate-100 pl-3">
                                    <p className="text-[10px] font-bold text-slate-400 mb-1">Duration</p>
                                    <p className="text-sm font-bold text-slate-700">{log.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>

            {/* Attendance Detail Modal (Existing) */}
            {showDetailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800">Attendance Details</h2>
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 p-6 space-y-8">
                            {/* User Profile */}
                            <div className="flex items-center gap-4">
                                <img src="https://i.pravatar.cc/150?u=44" alt="User" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Sophia Aiko Rose</h3>
                                    <p className="text-xs text-slate-500 font-bold">HR. Management</p>
                                </div>
                            </div>

                            {/* Current Status */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 border-b border-slate-100 pb-8">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check in</p>
                                    <p className="text-sm font-bold text-slate-800">08:40 AM</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check out</p>
                                    <p className="text-sm font-bold text-slate-400">-</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Break</p>
                                    <p className="text-sm font-bold text-slate-800">20m</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Hours</p>
                                    <p className="text-sm font-bold text-slate-800">4h 12m</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Present
                                    </span>
                                </div>
                            </div>

                            {/* Metrics Reuse */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {metrics.map((m, i) => (
                                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col h-full">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className={`w-6 h-6 rounded flex items-center justify-center bg-${m.color}-100 text-${m.color}-500`}>
                                                <span className="material-symbols-rounded text-sm">{m.icon}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">{m.label}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-1 mb-1">
                                                <h3 className="text-2xl font-bold text-slate-800">{m.value}</h3>
                                                {m.sub && <span className="text-[10px] text-slate-400 font-bold">{m.sub}</span>}
                                            </div>
                                            <p className={`text-[9px] font-medium ${m.footerColor || 'text-slate-400'}`}>
                                                {m.footer}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Detailed Timeline ... */}
                            <div className="space-y-4">
                                {/* Today Detailed */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-visible">
                                    <h4 className="font-bold text-slate-800 mb-4 text-sm">Today</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Clock-in</p>
                                            <p className="text-xs font-bold text-slate-700">08:40 AM</p>
                                        </div>
                                        <div className="md:col-span-9 h-10 flex rounded-lg bg-slate-50 relative border border-slate-100">
                                            {/* Tooltip */}
                                            <div className="absolute left-[8%] -top-10 z-10 bg-white p-2 rounded-lg shadow-lg border border-slate-100 flex items-center gap-2 text-[10px] font-bold text-slate-600 whitespace-nowrap animate-in fade-in zoom-in-95">
                                                <span className="material-symbols-rounded text-xs text-blue-500">history</span> Working Time
                                            </div>
                                            <div className="absolute left-[8%] -top-1.5 z-10 w-3 h-3 bg-white rotate-45 border-b border-r border-slate-100"></div>

                                            <div className="h-full bg-purple-500 rounded-l-lg flex items-center justify-center text-white text-[9px] font-bold relative group" style={{ width: '25%' }}>
                                                Working time
                                                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[9px] py-1 px-2 rounded whitespace-nowrap z-20">09:00 - 11:50 (2h 50m)</div>
                                            </div>
                                            <div className="h-full bg-blue-400 flex items-center justify-center text-white text-[9px] font-bold" style={{ width: '8%' }}>Break</div>
                                            <div className="h-full bg-purple-500 flex items-center justify-center text-white text-[9px] font-bold" style={{ width: '25%' }}>Working time</div>
                                            <div className="h-full bg-slate-200" style={{ width: '42%' }}></div>
                                        </div>
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Clock-out</p>
                                            <p className="text-xs font-bold text-slate-700">17:12 PM</p>
                                        </div>
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Duration</p>
                                            <p className="text-xs font-bold text-slate-700">08h 12m</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Friday Detailed */}
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-visible">
                                    <h4 className="font-bold text-slate-800 mb-4 text-sm">Friday, 11</h4>

                                    <div className="absolute right-4 top-4">
                                        <div className="relative group">
                                            <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 cursor-help">
                                                <span className="material-symbols-rounded text-xs">description</span> Notes added
                                            </span>
                                            <div className="absolute right-0 top-full mt-2 w-64 bg-white p-3 rounded-xl shadow-xl border border-slate-100 z-20 hidden group-hover:block animate-in fade-in zoom-in-95">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-rounded text-blue-500 text-sm">description</span>
                                                    <span className="text-xs font-bold text-slate-700">Additional Notes</span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 leading-relaxed">
                                                    Requesting the day off due to a scheduled medical appointment in the afternoon. All pending tasks have been handed over, and I will be available for urgent matters via chat if needed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Clock-in</p>
                                            <p className="text-xs font-bold text-slate-700">08:40 AM</p>
                                        </div>
                                        <div className="md:col-span-9 h-10 flex rounded-lg bg-slate-50 relative border border-slate-100">
                                            <div className="h-full bg-purple-500 rounded-l-lg flex items-center justify-center text-white text-[9px] font-bold" style={{ width: '25%' }}>Working time</div>
                                            <div className="h-full bg-blue-400 flex items-center justify-center text-white text-[9px] font-bold" style={{ width: '8%' }}>Break</div>
                                            <div className="h-full bg-purple-500 flex items-center justify-center text-white text-[9px] font-bold" style={{ width: '25%' }}>Working time</div>
                                            <div className="h-full bg-slate-200" style={{ width: '42%' }}></div>
                                        </div>
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Clock-out</p>
                                            <p className="text-xs font-bold text-slate-700">17:12 PM</p>
                                        </div>
                                        <div className="md:col-span-1 border-l-2 border-slate-100 pl-3">
                                            <p className="text-[9px] font-bold text-slate-400 mb-0.5">Duration</p>
                                            <p className="text-xs font-bold text-slate-700">08h 12m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- New Attendance Modal --- */}
            {showNewAttendanceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg  animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                            <h2 className="text-lg font-bold text-slate-800">New Attendance</h2>
                            <button
                                onClick={() => setShowNewAttendanceModal(false)}
                                className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto">
                            {/* Attendance Type (Check in/out) */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-3">Attendance type</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setNewAttendanceData({ ...newAttendanceData, type: 'check-in' })}
                                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${newAttendanceData.type === 'check-in' ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newAttendanceData.type === 'check-in' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <span className="material-symbols-rounded">play_circle</span>
                                        </div>
                                        <span className="font-bold text-sm">Check in</span>
                                    </button>
                                    <button
                                        onClick={() => setNewAttendanceData({ ...newAttendanceData, type: 'check-out' })}
                                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${newAttendanceData.type === 'check-out' ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${newAttendanceData.type === 'check-out' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <span className="material-symbols-rounded">stop_circle</span>
                                        </div>
                                        <span className="font-bold text-sm">Check out</span>
                                    </button>
                                </div>
                            </div>

                            {/* Location Type */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-3">Attendance type</p>
                                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                                    {['on-site', 'wfh', 'anywhere'].map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => setNewAttendanceData({ ...newAttendanceData, location: loc })}
                                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold capitalize transition-all ${newAttendanceData.location === loc ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                        >
                                            {loc.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-3">Timestamp</p>
                                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 text-red-500">
                                    <span className="material-symbols-rounded text-lg">schedule</span>
                                    <span className="text-xs font-bold">December 10 2025, 08:43 AM (Auto recorded)</span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-xs font-bold text-slate-500">Notes (Optional)</p>
                                </div>
                                <div className="relative">
                                    <textarea
                                        value={newAttendanceData.notes}
                                        onChange={(e) => setNewAttendanceData({ ...newAttendanceData, notes: e.target.value })}
                                        placeholder="Add additional context for this attendance session..."
                                        maxLength={360}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 h-32 resize-none"
                                    ></textarea>
                                    <span className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <span className="material-symbols-rounded text-xs">add</span> {newAttendanceData.notes.length}/360
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center gap-3 p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
                            <button
                                onClick={() => setShowNewAttendanceModal(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-white hover:border-slate-300 transition-all bg-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNewAttendanceSubmit}
                                className="px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] shadow-lg shadow-purple-200 transition-all"
                            >
                                {newAttendanceData.type === 'check-in' ? 'Check in' : 'Check out'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Break Session Modal --- */}
            {showBreakModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                            <h2 className="text-lg font-bold text-slate-800">Break Session</h2>
                            <button
                                onClick={() => setShowBreakModal(false)}
                                className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto">
                            {/* Break Type */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-3">Break Type</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setBreakData({ ...breakData, type: 'start' })}
                                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${breakData.type === 'start' ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${breakData.type === 'start' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <span className="material-symbols-rounded">local_cafe</span>
                                        </div>
                                        <span className="font-bold text-sm">Start Break</span>
                                    </button>
                                    <button
                                        onClick={() => setBreakData({ ...breakData, type: 'end' })}
                                        className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${breakData.type === 'end' ? 'border-purple-500 bg-purple-50 text-purple-700 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${breakData.type === 'end' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <span className="material-symbols-rounded">stop_circle</span>
                                        </div>
                                        <span className="font-bold text-sm">End Break</span>
                                    </button>
                                </div>
                            </div>

                            {/* Timestamp */}
                            <div>
                                <p className="text-xs font-bold text-slate-500 mb-3">Timestamp</p>
                                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100 text-pink-500">
                                    <span className="material-symbols-rounded text-lg">schedule</span>
                                    <span className="text-xs font-bold">December 10 2025, 12:00 PM (Auto recorded)</span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-xs font-bold text-slate-500">Notes (Optional)</p>
                                </div>
                                <div className="relative">
                                    <textarea
                                        value={breakData.notes}
                                        onChange={(e) => setBreakData({ ...breakData, notes: e.target.value })}
                                        placeholder="Add additional context for this break session..."
                                        maxLength={360}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 h-32 resize-none"
                                    ></textarea>
                                    <span className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <span className="material-symbols-rounded text-xs">add</span> {breakData.notes.length}/360
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end items-center gap-3 p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
                            <button
                                onClick={() => setShowBreakModal(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-white hover:border-slate-300 transition-all bg-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBreakSubmit}
                                className="px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] shadow-lg shadow-purple-200 transition-all"
                            >
                                {breakData.type === 'start' ? 'Start Break' : 'End Break'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAttendance;
