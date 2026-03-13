import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { getAttendanceRecords } from '../services/attendance';
import { getLeaveRequests, updateLeaveStatus } from '../services/leave';
import { getDashboardSummary } from '../services/dashboard';

// --- DATA CONSTANTS ---
const DUMMY_DATA = {
    meetings: [
        { id: 1, title: 'Marketing meeting', time: '10:00 AM - 11:30 AM', date: '3 August', type: 'Zoom Meeting' },
        { id: 2, title: 'Project Sync', time: '01:00 PM - 02:00 PM', date: '3 August', type: 'Google Meet' },
        { id: 3, title: 'Design Review', time: '03:00 PM - 04:30 PM', date: '4 August', type: 'Zoom Meeting' },
        { id: 4, title: 'HR Interview', time: '09:00 AM - 10:00 AM', date: '5 August', type: 'Teams' },
    ],
    calendarEvents: [
        { day: 1, hour: 10, title: 'Talent Acquisition', subtitle: 'Recruitment Planning - Q3', timeText: '10.30 AM', color: 'purple' },
        { day: 4, hour: 10, title: 'Recruitment', subtitle: 'Interview Session', timeText: '10.30 AM', color: 'slate' },
        { day: 5, hour: 11, title: 'Internal Workshop', subtitle: 'UI/UX Best Practices', timeText: '11.00 AM', color: 'purple' },
        { day: 6, hour: 9, title: 'System Check', subtitle: 'Server Maintenance', timeText: '09.00 AM', color: 'slate' },
    ]
};

const SCHEDULE_SUMMARY = [
    { label: 'Employees On Duty', value: '874', unit: 'Employee', icon: 'person', colorClass: 'bg-blue-50 text-blue-500' },
    { label: 'Missing Check-ins', value: '12', unit: 'People', icon: 'error', colorClass: 'bg-pink-50 text-pink-500' },
    { label: 'Leave request', value: '431', unit: 'Employee', icon: 'inbox', colorClass: 'bg-purple-50 text-purple-500' },
    { label: 'Contracts Expiring', value: '431', unit: 'Employee', icon: 'description', colorClass: 'bg-amber-50 text-amber-500' },
];

const SCHEDULE_DAYS = [
    { name: 'Sun', date: '01', isWeekend: true },
    { name: 'Mon', date: '02', isToday: true },
    { name: 'Tue', date: '03' },
    { name: 'Wed', date: '04' },
    { name: 'Thu', date: '05' },
    { name: 'Fri', date: '06' },
    { name: 'Sat', date: '07' },
    { name: 'Sun', date: '08', isWeekend: true },
    { name: 'Mon', date: '09' },
];

const SCHEDULE_ROWS = [
    {
        department: 'Product Management', position: 'UI/UX Designer', team: 3, start: '08:00', end: '17:00',
        bars: [{ title: 'Sprint Planning & Prioritization Meeting', startDay: 1, span: 3, color: 'purple' }]
    },
    {
        department: 'Human Resource', position: 'Product Manager', team: 3, start: '08:00', end: '17:00',
        bars: [{ title: 'New Employee Onboarding (Morning Session)', startDay: 1, span: 5, color: 'purple' }]
    },
    {
        department: 'Engineering', position: 'Backend Engineer', team: 3, start: '08:00', end: '17:00',
        bars: [{ title: 'Daily Standup & Technical Debt Discussion', startDay: 1, span: 2, color: 'purple' }]
    },
    {
        department: 'UX/UI Design', position: 'UI Designer, UX...', team: 3, start: '08:00', end: '17:00',
        bars: [], isStriped: true
    },
    {
        department: 'Data Science', position: 'Data Scientist,...', team: 3, start: '08:00', end: '17:00',
        bars: [
            { title: 'Churn Prediction', startDay: 6, span: 1.5, color: 'purple' },
            { title: 'Project Kick-off', startDay: 7.5, span: 1.5, color: 'pink' },
        ]
    },
    {
        department: 'Data Analytics', position: 'Data Analyst, B...', team: 3, start: '08:00', end: '17:00',
        bars: [
            { title: 'UI/UX Designer', startDay: 0, span: 2, color: 'purple' },
            { title: 'UI/UX Designer', startDay: 7, span: 2, color: 'orange' },
        ]
    },
    {
        department: 'DevOps / SRE', position: 'DevOps Engine...', team: 3, start: '08:00', end: '17:00',
        bars: [{ title: 'System Health Check & Deployment Pipeline Review', startDay: 6, span: 3, color: 'purple' }]
    },
    {
        department: 'Cybersecurity', position: 'Security Analys...', team: 3, start: '08:00', end: '17:00',
        bars: [], isStriped: true
    },
    {
        department: 'Cloud Infrastru...', position: 'Cloud Engineer...', team: 3, start: '08:00', end: '17:00',
        bars: [{ title: 'Resource Usage Review & Cloud Cost Optimization', startDay: 1, span: 4, color: 'purple' }]
    },
    {
        department: 'Quality Assura...', position: 'QA Engineer, A...', team: 3, start: '08:00', end: '17:00',
        bars: [
            { title: 'Test Case Review', startDay: 1, span: 2, color: 'purple' },
            { title: 'Automation Scripting', startDay: 5, span: 1.5, color: 'pink' },
            { title: 'Kick-off', startDay: 7, span: 1, color: 'orange' },
        ]
    },
];

// --- HELPER COMPONENTS ---
const CalendarEventModal = ({ event, onClose }) => {
    if (!event) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in relative">
                <div className="h-32 bg-gradient-to-br from-orange-100 via-rose-100 to-purple-100 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-600 transition-colors">
                            <span className="material-symbols-rounded text-lg">edit</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-600 transition-colors">
                            <span className="material-symbols-rounded text-lg">delete</span>
                        </button>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-slate-600 transition-colors">
                            <span className="material-symbols-rounded text-lg">close</span>
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
                </div>

                <div className="p-6 -mt-6 bg-white rounded-t-[2rem] relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 leading-tight mb-1">{event.title || 'Quarterly Marketing Sync'}</h2>
                            <p className="text-xs font-semibold text-slate-500">Tuesday 09, 2025 • {event.timeText || '10:00 AM'} - 12:00 PM</p>
                        </div>
                        <div className="flex items-center -space-x-2 flex-shrink-0 ml-2">
                            {[1, 2, 3].map(i => (
                                <img key={i} src={`https://i.pravatar.cc/150?u=${event.day * 10 + i}`} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-rounded text-slate-400 text-xl">notifications</span>
                            <span className="text-sm font-medium text-slate-600">30 Minutes Before</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-rounded text-slate-400 text-xl">location_on</span>
                            <span className="text-sm font-medium text-slate-600">Online on Google meet</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <span className="whitespace-nowrap">Join</span>
                        <div className="flex gap-2 w-full">
                            <button className="flex-1 py-2 bg-[#7C3AED] text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Yes</button>
                            <button className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors">No</button>
                            <button className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors">Maybe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const NewAgendaDrawer = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-end bg-slate-900/20 backdrop-blur-sm animate-fade-in">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="w-full max-w-md bg-white h-full shadow-2xl animate-slide-in-right relative flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">New Agenda</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-rounded text-xl">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar pb-20">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Title</label>
                        <input type="text" placeholder="Enter agenda title" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                    </div>
                    {/* ... (rest of the drawer fields shortened for brevity but functional) */}
                </div>

                <div className="p-6 border-t border-slate-100 flex gap-3 bg-white z-20">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button className="flex-1 py-3 rounded-xl bg-[#7C3AED] font-bold text-white hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">Save</button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const AvatarGroup = ({ count }) => (
    <div className="flex items-center -space-x-2">
        {[...Array(Math.min(count, 3))].map((_, i) => (
            <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center overflow-hidden">
                <span className="text-[8px] text-white font-bold">{String.fromCharCode(65 + i)}</span>
            </div>
        ))}
        {count > 3 && (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">
                {count - 3}+
            </div>
        )}
    </div>
);

// --- VIEW COMPONENTS ---

const CalendarView = ({ setSelectedEvent }) => {
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const calDays = [
        { name: 'Sun', date: 31, isPrev: true },
        { name: 'Mon', date: 1 },
        { name: 'Tue', date: 2 },
        { name: 'Wed', date: 3 },
        { name: 'Thu', date: 4 },
        { name: 'Fri', date: 5 },
        { name: 'Sat', date: 6 },
        { name: 'Sun', date: 7 },
    ];

    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {DUMMY_DATA.meetings.map((card) => (
                    <div key={card.id} className="bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1 truncate">{card.title}</h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mb-3 sm:mb-4">{card.time} ({card.date})</p>
                        <div className="bg-purple-50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex justify-between items-center">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-[#3B82F6] text-[10px] sm:text-[11px] font-bold">
                                <span className="material-symbols-rounded text-xs sm:text-sm">videocam</span>
                                {card.type}
                            </div>
                            <button className="text-[#7C3AED] text-[10px] sm:text-[11px] font-bold hover:underline">Join</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] wfm-scroll">
                    <div className="min-w-[700px] sm:min-w-[800px]">
                        <div className="grid grid-cols-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-40">
                            <div className="p-2 sm:p-4 text-center text-[9px] sm:text-[10px] font-semibold text-slate-400 border-r border-slate-100 uppercase tracking-widest">GMT+7</div>
                            {calDays.map((day, i) => (
                                <div key={i} className="p-2 sm:p-4 text-center border-r border-slate-100 last:border-0">
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">{day.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-8 relative bg-white">
                            <div className="border-r border-slate-100">
                                {hours.map(hour => (
                                    <div key={hour} className={`h-20 sm:h-24 border-b border-slate-50 flex items-start justify-center pt-3 sm:pt-4 transition-all ${hour === 10 ? 'bg-purple-600' : ''}`}>
                                        <span className={`text-[9px] sm:text-[10px] font-semibold uppercase ${hour === 10 ? 'text-white' : 'text-slate-300'}`}>
                                            {hour === 12 ? '12 pm' : hour > 12 ? `${hour - 12} pm` : `${hour} am`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {calDays.map((day, dayIdx) => (
                                <div key={dayIdx} className={`relative border-r border-slate-100 h-full ${day.isPrev ? 'bg-slate-50/30' : ''}`}>
                                    {hours.map(h => <div key={h} className="h-20 sm:h-24 border-b border-slate-50" />)}
                                    {DUMMY_DATA.calendarEvents.filter(ev => ev.day === day.date).map((ev, i) => (
                                        <div key={i}
                                            onClick={() => setSelectedEvent(ev)}
                                            className={`absolute left-1 right-1 sm:left-2 sm:right-2 p-2 sm:p-3 rounded-xl sm:rounded-2xl border-l-4 sm:border-l-[6px] shadow-sm z-10 transition-transform hover:scale-[1.02] cursor-pointer
                                                ${ev.color === 'purple' ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-slate-50 border-slate-300 text-slate-700'}`}
                                            style={{ top: `${(ev.hour - 7) * 80 + 12}px` }}
                                        >
                                            <p className="text-[11px] font-bold leading-tight">{ev.subtitle || 'No description'}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScheduleView = () => {
    return (
        <div className="p-3 md:p-8 space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SCHEDULE_SUMMARY.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[110px]">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${item.colorClass} flex items-center justify-center`}><span className="material-symbols-rounded">{item.icon}</span></div>
                                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                            </div>
                        </div>
                        <div className="flex items-end gap-2 mt-2">
                            <h3 className="text-[32px] font-semibold text-slate-800 leading-none">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto wfm-scroll">
                    <div className="min-w-[1200px]">
                        <div className="flex border-b border-slate-200">
                            <div className="w-[580px] shrink-0 flex divide-x divide-slate-100 bg-white">
                                <div className="w-[180px] p-4 text-xs font-bold text-slate-400">Department</div>
                                <div className="w-[140px] p-4 text-xs font-bold text-slate-400">Position</div>
                                <div className="w-[100px] p-4 text-xs font-bold text-slate-400">Team</div>
                            </div>
                            <div className="flex-1 grid grid-cols-9 divide-x divide-slate-100 bg-white">
                                {SCHEDULE_DAYS.map((day, i) => (
                                    <div key={i} className={`p-3 text-center ${day.isToday ? 'bg-purple-50' : ''}`}>
                                        <span className={`text-[10px] font-bold uppercase ${day.isToday ? 'text-purple-600' : 'text-slate-400'}`}>{day.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {SCHEDULE_ROWS.map((row, i) => (
                                <div key={i} className="flex hover:bg-slate-50/50 transition-colors group">
                                    <div className="w-[580px] shrink-0 flex divide-x divide-slate-100 bg-white shadow-sm">
                                        <div className="w-[180px] p-4 font-bold text-slate-700">{row.department}</div>
                                        <div className="w-[140px] p-4 text-xs text-slate-500">{row.position}</div>
                                        <div className="w-[100px] p-4"><AvatarGroup count={row.team} /></div>
                                    </div>
                                    <div className="flex-1 grid grid-cols-9 divide-x divide-slate-100 relative">
                                        {SCHEDULE_DAYS.map((day, d) => <div key={d} className="h-16"></div>)}
                                        <div className="absolute inset-0">
                                            {row.bars.map((bar, b) => (
                                                <div key={b} className="absolute top-2.5 bottom-2.5 rounded-lg px-3 flex items-center bg-purple-100 text-purple-700 text-[10px] font-bold"
                                                    style={{ left: `${(bar.startDay / 9) * 100}%`, width: `${(bar.span / 9) * 100}%` }}>
                                                    {bar.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AttendanceView = ({ data, summary, loading }) => {
    if (loading) return <div className="p-8 text-center text-slate-400">Loading attendance data...</div>;

    const mappedLogs = data.map(record => ({
        id: record.employee,
        name: record.employee_name,
        checkIn: record.clock_in ? record.clock_in.substring(0, 5) : '-',
        checkOut: record.clock_out ? record.clock_out.substring(0, 5) : '-',
        break: '1 hrs',
        workHours: record.hours_worked || '-',
        status: record.status || 'Present',
        statusColor: record.status === 'Late' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
    }));

    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Present Summary</h3>
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                        <div className="px-4 first:pl-0">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Total Present</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">{summary?.present_employees || 0}</h2>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Late clock-in</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">{data.filter(r => r.status === 'Late').length}</h2>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">On-Time</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">{data.filter(r => r.status === 'Present').length}</h2>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">Not Present Summary</h3>
                    <div className="grid grid-cols-2 divide-x divide-slate-100">
                        <div className="px-4 first:pl-0">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Absent</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">{(summary?.total_employees || 0) - (summary?.present_employees || 0)}</h2>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Total Employees</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">{summary?.total_employees || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-6">Attendance Log</h3>
                <div className="overflow-x-auto wfm-scroll">
                    <table className="w-full min-w-[1200px] text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                {['Employee Name', 'Check In', 'Check Out', 'Break', 'Work Hours', 'Status'].map((head) => (
                                    <th key={head} className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {mappedLogs.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-slate-700">{row.name}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.checkIn}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.checkOut}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{row.break}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-600">{row.workHours}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.statusColor}`}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const LeaveView = ({ requests, summary, loading, onUpdateStatus }) => {
    if (loading) return <div className="p-8 text-center text-slate-400">Loading leave data...</div>;

    const approvalStats = [
        { name: 'Approved', value: requests.filter(r => r.status === 'Approved').length, color: '#34D399' },
        { name: 'Pending', value: requests.filter(r => r.status === 'Pending').length, color: '#FBBF24' },
        { name: 'Rejected', value: requests.filter(r => r.status === 'Rejected').length, color: '#F87171' },
    ];

    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[340px]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">Approval Status</h3>
                        {summary && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {summary.total_employees} Total Emp
                            </span>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={approvalStats} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {approvalStats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 shadow-lg h-[340px] flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-white mb-4">Holiday Calendar</h3>
                    <div className="space-y-4">
                        <div className="bg-white/10 p-4 rounded-xl">
                            <p className="text-white font-bold">Labor Day</p>
                            <p className="text-white/50 text-xs">May 01, 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-6">Leave Applications</h3>
                <div className="overflow-x-auto wfm-scroll">
                    <table className="w-full min-w-[1000px] text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                {['Employee', 'From', 'To', 'Type', 'Status', 'Actions'].map((head) => (
                                    <th key={head} className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {requests.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-slate-700">{row.employee_name}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500">{new Date(row.start_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500">{new Date(row.end_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-600">{row.leave_type}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                            row.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>{row.status}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        {row.status === 'Pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => onUpdateStatus(row.id, 'Approved')}
                                                    className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                                                    title="Approve"
                                                >
                                                    <span className="material-symbols-rounded text-lg">check</span>
                                                </button>
                                                <button
                                                    onClick={() => onUpdateStatus(row.id, 'Rejected')}
                                                    className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                                                    title="Reject"
                                                >
                                                    <span className="material-symbols-rounded text-lg">close</span>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const WorkforceManagement = ({ onMenuClick }) => {
    const [view, setView] = useState('calendar');
    const [isNewAgendaOpen, setIsNewAgendaOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [attendanceData, setAttendanceData] = useState([]);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [attendanceRes, leavesRes, dashboardSummary] = await Promise.all([
                getAttendanceRecords(),
                getLeaveRequests(),
                getDashboardSummary()
            ]);

            // Handle paginated responses
            setAttendanceData(attendanceRes.results || attendanceRes);
            setLeaveRequests(leavesRes.results || leavesRes);
            setSummary(dashboardSummary);
        } catch (err) {
            console.error('Failed to fetch workforce data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLeaveStatusUpdate = async (id, status) => {
        try {
            await updateLeaveStatus(id, status);
            // Refresh data
            fetchData();
        } catch (err) {
            alert('Failed to update leave status');
        }
    };

    return (
        <React.Fragment>
            <style>{`.wfm-scroll::-webkit-scrollbar { width: 6px; height: 6px; }`}</style>
            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 font-sans text-slate-700">
                <header className="p-4 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-[#7C3AED] transition-colors"
                        >
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Workforce Management</h1>
                            <p className="text-sm text-slate-500">Manage schedules, attendance, and leave requests</p>
                        </div>
                    </div>
                    <button onClick={() => setIsNewAgendaOpen(true)} className="bg-[#7C3AED] hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-100">+ New Action</button>
                </header>

                <nav className="bg-white px-4 sm:px-8 flex gap-6 sm:gap-8 border-b border-slate-200 overflow-x-auto">
                    {[
                        { id: 'calendar', label: 'Calendar', icon: 'calendar_today' },
                        { id: 'schedule', label: 'Schedule', icon: 'grid_view' },
                        { id: 'attendance', label: 'Attendance', icon: 'person' },
                        { id: 'leave', label: 'Leave', icon: 'pie_chart' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`py-4 text-sm font-bold transition-all relative whitespace-nowrap ${view === tab.id ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-rounded text-lg">{tab.icon}</span>
                                {tab.label}
                            </span>
                            {view === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7C3AED] rounded-t-full" />}
                        </button>
                    ))}
                </nav>

                <div className="flex-1">
                    {view === 'calendar' && <CalendarView setSelectedEvent={setSelectedEvent} />}
                    {view === 'schedule' && <ScheduleView />}
                    {view === 'attendance' && <AttendanceView data={attendanceData} summary={summary} loading={loading} />}
                    {view === 'leave' && <LeaveView requests={leaveRequests} summary={summary} loading={loading} onUpdateStatus={handleLeaveStatusUpdate} />}
                </div>

                <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                <NewAgendaDrawer isOpen={isNewAgendaOpen} onClose={() => setIsNewAgendaOpen(false)} />
            </main>
        </React.Fragment>
    );
};

export default WorkforceManagement;