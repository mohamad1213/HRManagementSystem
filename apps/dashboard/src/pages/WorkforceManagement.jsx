import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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

const ATTENDANCE_LOG = [
    { id: '43178', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '7h -22m', late: '3m', leave: '3m', overTime: '30m', location: 'Jakarta HQ • Mobile', status: 'Early', statusColor: 'bg-emerald-50 text-emerald-600', isAbsent: false },
    { id: '43179', name: 'Dante Haru Nakamura', checkIn: '-', checkOut: '-', break: '-', workHours: '-', late: '-', leave: '-', overTime: '-', location: '-', status: 'Absent', statusColor: 'bg-red-50 text-red-600', isAbsent: true },
    { id: '43180', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
    { id: '43181', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
    { id: '43182', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
    { id: '43183', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
    { id: '43184', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
    { id: '43185', name: 'Dante Haru Nakamura', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detect', status: 'Late', statusColor: 'bg-amber-50 text-amber-600', isAbsent: false },
];

const LEAVE_APPROVAL_DATA = [
    { name: 'Requested', value: 120, color: '#A78BFA' }, // Purple
    { name: 'Approved', value: 12, color: '#34D399' },   // Green
    { name: 'Pending', value: 20, color: '#FBBF24' },    // Amber
    { name: 'Rejected', value: 47, color: '#F87171' },   // Red
];

const LEAVE_TYPE_DATA = [
    { name: 'Casual Leave', value: 1428, color: '#A78BFA' },
    { name: 'Sick Leave', value: 1012, color: '#FBBF24' },
    { name: 'Other Leave', value: 560, color: '#60A5FA' },
];

const UPCOMING_HOLIDAYS = [
    { name: 'Independence day', date: '12 Aug', day: 'Saturday', color: 'bg-white text-slate-800' },
    { name: 'Independence day', date: '17 Aug', day: 'Saturday', color: 'bg-white text-slate-800' },
    { name: 'Independence day', date: '21 Aug', day: 'Wednesday', color: 'bg-white text-slate-800' },
];

const LEAVE_REQUESTS = [
    { id: '97174', name: 'Noah Kenji Tanaka', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Sick Leave', attachment: 'File.pdf', status: 'Action' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Family Emergency', attachment: 'File.pdf', status: 'Approved' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Maternity Leave', attachment: 'File.pdf', status: 'Approved' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Personal Leave', attachment: 'File.pdf', status: 'Rejected' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Official Business Trip', attachment: 'File.pdf', status: 'Rejected' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Study Leave', attachment: 'File.pdf', status: 'Approved' },
    { id: '43178', name: 'Dante Haru Nakamura', from: '12 June 2025', to: '12 June 2025', total: '4 Days', type: 'Study Leave', attachment: 'File.pdf', status: 'Action' },
];

// --- HELPER COMPONENTS ---
const CalendarEventModal = ({ event, onClose }) => {
    if (!event) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in relative">
                {/* Header Gradient */}
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
                    {/* Decorative curves/mesh overlay could go here */}
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
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">2+</div>
                            <p className="text-[10px] font-bold text-slate-400 ml-2 block">8 Members</p>
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
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-slate-400 text-xl rotate-45">link</span>
                            <div>
                                <p className="text-sm font-medium text-slate-600">Join Meeting</p>
                                <a href="#" className="text-xs text-blue-500 hover:underline break-all">https://meet.google.com/abc-defg-hij</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-rounded text-slate-400 text-xl">subject</span>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {event.subtitle || 'Discussion on ongoing marketing campaigns, performance metrics, budget allocation, and next-month content strategy.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <span className="whitespace-nowrap">Join</span>
                        <div className="flex gap-2 w-full">
                            <button className="flex-1 py-2 bg-[#7C3AED] text-white rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-purple-700 transition-colors">
                                <span className="material-symbols-rounded text-sm">check_circle</span> Yes
                            </button>
                            <button className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-rounded text-sm">cancel</span> No
                            </button>
                            <button className="flex-1 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-rounded text-sm">help</span> Maybe
                            </button>
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

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Date & Time</label>
                        <div className="relative">
                            <input type="text" placeholder="Select date and time" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                            <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">calendar_month</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Place</label>
                        <input type="text" placeholder="Add location (optional)" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Link</label>
                        <div className="relative">
                            <input type="text" placeholder="Insert meeting link (optional)" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                            <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none -rotate-45">link</span>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Description</label>
                        <div className="relative">
                            <textarea placeholder="Write a short description about this agenda" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400 resize-none"></textarea>
                            <span className="absolute bottom-2 right-3 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-rounded text-xs">notes</span> 360/360
                            </span>
                        </div>
                        <p className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                            <span className="material-symbols-rounded text-sm">info</span>
                            Add additional context or instructions if needed.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Invite People</label>
                        <div className="relative">
                            <input type="text" placeholder="Type name or email..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                            <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">expand_more</span>
                        </div>

                        <div className="space-y-3 pt-1">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=olivia" alt="avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Organizer</p>
                                    <p className="text-sm font-bold text-slate-700">Olivia Mei Nakamura</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 border-t border-slate-50 pt-2">
                                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=ricky" alt="avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Guest</p>
                                    <p className="text-sm font-bold text-slate-700">Ricky Andriansyah</p>
                                </div>
                            </div>
                            <div className="pl-12">
                                <button className="text-xs font-bold text-slate-500 hover:text-purple-600 flex items-center gap-1">
                                    20+ More <span className="material-symbols-rounded text-base">expand_more</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <div className="flex gap-3">
                            <label className="flex-1 relative cursor-pointer group">
                                <input type="radio" name="category" className="peer sr-only" defaultChecked />
                                <div className="px-3 py-2 rounded-xl border border-slate-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all flex items-center gap-2 justify-center">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-600 peer-checked:text-purple-700">Meeting</span>
                                </div>
                            </label>
                            <label className="flex-1 relative cursor-pointer group">
                                <input type="radio" name="category" className="peer sr-only" />
                                <div className="px-3 py-2 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 transition-all flex items-center gap-2 justify-center">
                                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-600 peer-checked:text-amber-700">Training</span>
                                </div>
                            </label>
                            <label className="flex-1 relative cursor-pointer group">
                                <input type="radio" name="category" className="peer sr-only" />
                                <div className="px-3 py-2 rounded-xl border border-slate-200 peer-checked:border-pink-500 peer-checked:bg-pink-50 transition-all flex items-center gap-2 justify-center">
                                    <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-600 peer-checked:text-pink-700">Event</span>
                                </div>
                            </label>
                        </div>
                    </div>
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
            <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center overflow-hidden">
                <span className="text-[8px] text-white font-bold">{String.fromCharCode(65 + i)}</span>
            </div>
        ))}
        {count > 2 && (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">
                {count - 2}+
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
        { name: 'Sun', date: 6 },
    ];

    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 pb-8">
            {/* Meeting Cards */}
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

            {/* Calendar Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 md:gap-4">
                <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
                    <button className="px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-slate-600 shadow-sm shrink-0">Today</button>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="material-symbols-rounded cursor-pointer text-slate-400 hover:text-slate-600 text-lg sm:text-2xl">chevron_left</span>
                        <h2 className="text-sm sm:text-lg font-bold text-slate-800 min-w-[100px] sm:min-w-[140px] text-center whitespace-nowrap">Augustus 2025</h2>
                        <span className="material-symbols-rounded cursor-pointer text-slate-400 hover:text-slate-600 text-lg sm:text-2xl">chevron_right</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 min-w-0">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-base sm:text-lg">search</span>
                        <input type="text" placeholder="Quick Search..." className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all" />
                    </div>
                    <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-slate-600 whitespace-nowrap shrink-0">
                        Monthly <span className="material-symbols-rounded text-xs sm:text-sm">expand_more</span>
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto overflow-y-auto max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] wfm-scroll">
                    <div className="min-w-[700px] sm:min-w-[800px]">
                        <div className="grid grid-cols-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-40">
                            <div className="p-2 sm:p-4 text-center text-[9px] sm:text-[10px] font-semibold text-slate-400 border-r border-slate-100 uppercase tracking-widest">GMT+7</div>
                            {calDays.map((day, i) => (
                                <div key={i} className="p-2 sm:p-4 text-center border-r border-slate-100 last:border-0">
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{day.name}</span>
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
                                    <div className="absolute top-1 sm:top-2 right-2 sm:right-4 text-xs sm:text-sm font-semibold text-slate-100 select-none">{day.date}</div>
                                    {hours.map(h => <div key={h} className="h-20 sm:h-24 border-b border-slate-50" />)}
                                    {DUMMY_DATA.calendarEvents.filter(ev => ev.day === day.date).map((ev, i) => (
                                        <div key={i}
                                            onClick={() => setSelectedEvent(ev)}
                                            className={`absolute left-1 right-1 sm:left-2 sm:right-2 p-2 sm:p-3 rounded-xl sm:rounded-2xl border-l-4 sm:border-l-[6px] shadow-sm z-10 transition-transform hover:scale-[1.02] cursor-pointer
                                                ${ev.color === 'purple' ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-slate-50 border-slate-300 text-slate-700'}`}
                                            style={{ top: `${(ev.hour - 7) * 80 + 12}px` }}
                                        >
                                            <p className="text-[8px] sm:text-[9px] font-semibold opacity-50 uppercase tracking-tighter">{ev.title}</p>
                                            <p className="text-[10px] sm:text-[11px] font-bold leading-tight mt-0.5 sm:mt-1">{ev.subtitle || 'No description'}</p>
                                            <p className="text-[9px] sm:text-[10px] mt-1 sm:mt-2 font-semibold opacity-40">{ev.timeText}</p>
                                        </div>
                                    ))}
                                    {day.name === 'Wed' && (
                                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold shadow-lg z-20 animate-pulse">3</div>
                                    )}
                                </div>
                            ))}
                            <div className="absolute w-full flex items-center z-30 pointer-events-none" style={{ top: '252px' }}>
                                <div className="flex-1 border-t-2 border-dashed border-purple-500/30"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full border-4 border-white shadow-sm mr-2 sm:mr-4"></div>
                            </div>
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
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SCHEDULE_SUMMARY.map((item, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[110px]">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${item.colorClass} flex items-center justify-center`}>
                                    <span className="material-symbols-rounded">{item.icon}</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                            </div>
                            <span className="material-symbols-rounded text-slate-300 cursor-pointer hover:text-slate-500">more_horiz</span>
                        </div>
                        <div className="flex items-end gap-2 mt-2">
                            <h3 className="text-[32px] font-semibold text-slate-800 leading-none">{item.value}</h3>
                            <p className="text-xs font-semibold text-slate-400 mb-0.5">{item.unit}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">Today</button>
                    <div className="flex items-center gap-3">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                            <span className="material-symbols-rounded text-xl">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                            <span className="material-symbols-rounded text-xl">chevron_right</span>
                        </button>
                    </div>
                    <span className="text-lg font-bold text-slate-800 whitespace-nowrap">Augustus 2025</span>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:min-w-[240px]">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-xl">search</span>
                        <input type="text" placeholder="Quick Search..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                    </div>
                    <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2 whitespace-nowrap">
                        Weekly <span className="material-symbols-rounded">expand_more</span>
                    </button>
                </div>
            </div>

            {/* Main Schedule Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto wfm-scroll">
                    <div className="min-w-[1200px]">
                        {/* Header */}
                        <div className="flex border-b border-slate-200">
                            {/* Fixed Left Header */}
                            <div className="w-[580px] shrink-0 flex divide-x divide-slate-100 bg-white">
                                <div className="w-[180px] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</div>
                                <div className="w-[140px] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Position</div>
                                <div className="w-[100px] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Team</div>
                                <div className="w-[80px] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Start</div>
                                <div className="w-[80px] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">End</div>
                            </div>

                            {/* Scrollable Days Header */}
                            <div className="flex-1 grid grid-cols-9 divide-x divide-slate-100 bg-white">
                                {SCHEDULE_DAYS.map((day, i) => (
                                    <div key={i} className={`p-3 text-center flex flex-col items-center justify-center ${day.isToday ? 'bg-purple-50' : 'bg-white'}`}>
                                        <span className={`text-[10px] font-bold uppercase mb-1 ${day.isToday ? 'text-purple-600' : 'text-slate-400'}`}>{day.name}</span>
                                        <span className={`text-sm font-semibold ${day.isToday ? 'text-purple-700' : 'text-slate-700'}`}>{day.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-slate-100">
                            {SCHEDULE_ROWS.map((row, i) => (
                                <div key={i} className="flex hover:bg-slate-50/50 transition-colors group">
                                    {/* Fixed Left Content */}
                                    <div className="w-[580px] shrink-0 flex divide-x divide-slate-100 bg-white sticky left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                        <div className="w-[180px] p-4 flex items-center">
                                            <span className="text-sm font-bold text-slate-700 truncate">{row.department}</span>
                                        </div>
                                        <div className="w-[140px] p-4 flex items-center">
                                            <span className="text-xs font-medium text-slate-500 truncate">{row.position}</span>
                                        </div>
                                        <div className="w-[100px] p-4 flex items-center">
                                            <AvatarGroup count={row.team} />
                                        </div>
                                        <div className="w-[80px] p-4 flex items-center justify-center">
                                            <span className="text-xs font-mono text-slate-500">{row.start}</span>
                                        </div>
                                        <div className="w-[80px] p-4 flex items-center justify-center">
                                            <span className="text-xs font-mono text-slate-500">{row.end}</span>
                                        </div>
                                    </div>

                                    {/* Scrollable Days Content */}
                                    <div className="flex-1 grid grid-cols-9 divide-x divide-slate-100 relative">
                                        {/* Background Cells */}
                                        {SCHEDULE_DAYS.map((day, d) => (
                                            <div key={d} className={`h-16 relative ${row.isStriped ? 'bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDhMODIDMGl6bTQgMEw4IDR6bTQgOEw4IDh6IiBzdHJva2U9IiNmMmY0ZjYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=\')]' : ''} ${day.isToday ? 'bg-purple-50/20' : ''}`}>
                                            </div>
                                        ))}

                                        {/* Floating Bars Overlay */}
                                        <div className="absolute inset-0 pointer-events-none">
                                            {row.bars.map((bar, b) => {
                                                const barColor = bar.color === 'purple' ? 'bg-purple-100 text-purple-700'
                                                    : bar.color === 'pink' ? 'bg-pink-100 text-pink-700'
                                                        : 'bg-[#FFF7ED] text-[#9A3412]'; // orange/beige
                                                return (
                                                    <div
                                                        key={b}
                                                        className={`absolute top-2.5 bottom-2.5 rounded-lg px-3 flex items-center shadow-sm cursor-pointer pointer-events-auto hover:brightness-95 transition-all
                                                            ${barColor}`}
                                                        style={{
                                                            left: `${(bar.startDay / 9) * 100}%`,
                                                            marginLeft: '4px',
                                                            width: `calc(${(bar.span / 9) * 100}% - 8px)`
                                                        }}
                                                    >
                                                        <span className="text-[10px] font-bold truncate">{bar.title}</span>
                                                    </div>
                                                );
                                            })}
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

const AttendanceView = () => {
    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 md:space-y-8 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Present Summary */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-rounded">description</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800">Present Summary</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-rounded">more_horiz</span></button>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                        <div className="px-4 first:pl-0">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Ontime</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">459</h2>
                            <p className="text-xs font-semibold text-purple-600 mt-1 flex items-center gap-1">
                                +12 <span className="text-slate-400 font-medium">vs yesterday</span>
                            </p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Late clock-in</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">74</h2>
                            <p className="text-xs font-semibold text-pink-500 mt-1 flex items-center gap-1">
                                -12 <span className="text-slate-400 font-medium">vs yesterday</span>
                            </p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Early clock-in</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">874</h2>
                            <p className="text-xs font-semibold text-blue-500 mt-1 flex items-center gap-1">
                                -12 <span className="text-slate-400 font-medium">vs yesterday</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Not Present Summary */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                                <span className="material-symbols-rounded">bar_chart</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800">Not Present Summary</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-rounded">more_horiz</span></button>
                    </div>
                    <div className="grid grid-cols-4 divide-x divide-slate-100">
                        <div className="px-4 first:pl-0">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Absent</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">32</h2>
                            <p className="text-xs font-semibold text-purple-600 mt-1 flex items-center gap-1">
                                +12 <span className="text-slate-400 font-medium whitespace-nowrap">vs yesterday</span>
                            </p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1 whitespace-nowrap">No clock-in</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">24</h2>
                            <p className="text-xs font-semibold text-pink-500 mt-1 flex items-center gap-1">
                                -12 <span className="text-slate-400 font-medium whitespace-nowrap">vs yesterday</span>
                            </p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1 whitespace-nowrap">No clock-out</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">0</h2>
                            <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1">
                                0 <span className="text-slate-400 font-medium whitespace-nowrap">vs yesterday</span>
                            </p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">Invalid</p>
                            <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">0</h2>
                            <p className="text-xs font-semibold text-slate-400 mt-1 flex items-center gap-1">
                                0 <span className="text-slate-400 font-medium whitespace-nowrap">vs yesterday</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attendance Log Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">Attendance Log</h3>
                        <p className="text-sm text-slate-400 mt-1">Daily check-in and check-out history</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:min-w-[240px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-xl">search</span>
                            <input type="text" placeholder="Search by Name or ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 whitespace-nowrap shadow-sm">
                            Filter <span className="material-symbols-rounded text-lg">filter_list</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 whitespace-nowrap shadow-sm">
                            Sort by <span className="material-symbols-rounded text-lg">swap_vert</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto wfm-scroll">
                    <table className="w-full min-w-[1200px] text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                {['Employee Name', 'Check In', 'Check Out', 'Break', 'Work Hours', 'Late', 'Leave', 'Over Time', 'Present Locations', 'Status', 'Action'].map((head) => (
                                    <th key={head} className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {ATTENDANCE_LOG.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                                <img src={`https://i.pravatar.cc/150?u=${i + 30}`} alt="avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{row.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">ID: {row.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.checkIn}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.checkOut}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{row.break}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-600">{row.workHours}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{row.late}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{row.leave}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-500">{row.overTime}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-600 truncate max-w-[200px]">{row.location}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${row.statusColor.replace('bg-', 'border-').replace('50', '100')} ${row.statusColor}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                            <span className="material-symbols-rounded text-lg">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-2">
                    <p className="text-sm font-medium text-slate-400">Showing 1 to 8 of 459 entries</p>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50"><span className="material-symbols-rounded text-lg">chevron_left</span></button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7C3AED] text-white font-bold text-sm shadow-md shadow-purple-200">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">...</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">12</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"><span className="material-symbols-rounded text-lg">chevron_right</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LeaveView = () => {
    return (
        <div className="p-3 sm:p-4 md:p-8 space-y-4 sm:space-y-6 pb-8">
            {/* Top Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* 1. Leave Approval Status (Donut Chart) */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[340px]">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Approval Status</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-rounded">more_horiz</span></button>
                    </div>

                    <div className="flex items-center gap-4 h-full">
                        <div className="relative flex-1 h-[200px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={LEAVE_APPROVAL_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {LEAVE_APPROVAL_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-semibold text-slate-800">230</span>
                                <span className="text-xs font-medium text-slate-400">Total</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[100px]">
                            {LEAVE_APPROVAL_DATA.map((item, i) => (
                                <div key={i} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-md" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Leave Type (Semi-Circle Gauge) */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[340px]">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Leave Type</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-rounded">more_horiz</span></button>
                    </div>

                    <div className="relative flex-1 flex items-center justify-center mt-4">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={LEAVE_TYPE_DATA}
                                    cx="50%"
                                    cy="100%"
                                    startAngle={180}
                                    endAngle={0}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={2}
                                    dataKey="value"
                                    cornerRadius={6}
                                    stroke="none"
                                >
                                    {LEAVE_TYPE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-0 flex flex-col items-center mb-4">
                            <span className="text-2xl font-semibold text-slate-800">98.470</span>
                            <span className="text-xs font-medium text-slate-400">Indoor goods</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        {LEAVE_TYPE_DATA.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs font-semibold text-slate-500">{item.name}</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-800">{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Upcoming Holidays */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col h-[340px]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Upcoming Holiday</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-rounded">more_horiz</span></button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {UPCOMING_HOLIDAYS.map((holiday, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100">
                                    <span className="text-sm font-semibold text-slate-800 leading-none">{holiday.date.split(' ')[0]}</span>
                                    <span className="text-[10px] font-semibold text-slate-400 uppercase leading-none mt-1">{holiday.date.split(' ')[1]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-slate-800 text-sm truncate">{holiday.name}</h4>
                                    <p className="text-xs text-slate-400">{holiday.day}</p>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Full day</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Employee Leave Requests Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="font-semibold text-slate-800 text-lg">Employee Leave Requests</h3>
                        <p className="text-sm text-slate-400 mt-1">Track and approve leave requests across your organization.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:min-w-[240px]">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-xl">search</span>
                            <input type="text" placeholder="Search by Name or ID..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 whitespace-nowrap shadow-sm">
                            Filter <span className="material-symbols-rounded text-lg">filter_list</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 whitespace-nowrap shadow-sm">
                            Sort by <span className="material-symbols-rounded text-lg">swap_vert</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto wfm-scroll">
                    <table className="w-full min-w-[1000px] text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                {['Employee Name', 'From Date', 'To Date', 'Total', 'Leave Type', 'Attachment', 'Action'].map((head) => (
                                    <th key={head} className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {LEAVE_REQUESTS.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-4 py-4 w-[300px]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                                <img src={`https://i.pravatar.cc/150?u=${i + 60}`} alt="avatar" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">{row.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">ID: {row.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.from}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700">{row.to}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-600">{row.total}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-600">{row.type}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <a href="#" className="flex items-center gap-1 text-purple-600 hover:text-purple-700 hover:underline font-bold">
                                            {row.attachment} <span className="material-symbols-rounded text-lg">download</span>
                                        </a>
                                    </td>
                                    <td className="px-4 py-4">
                                        {row.status === 'Approved' && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                                                <span className="material-symbols-rounded text-sm">check</span> Approved
                                            </span>
                                        )}
                                        {row.status === 'Rejected' && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                                                <span className="material-symbols-rounded text-sm">close</span> Rejected
                                            </span>
                                        )}
                                        {row.status === 'Action' && (
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
                                                    <span className="material-symbols-rounded text-lg">close</span>
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7C3AED] text-white hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200">
                                                    <span className="material-symbols-rounded text-lg">check</span>
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

    // -- Button label based on view --
    const headerBtn = (() => {
        if (view === 'schedule') return 'New Schedule';
        if (view === 'attendance') return 'Export Log';
        return 'New Agenda';
    })();

    return (
        <React.Fragment>
            {/* Custom scrollbar styles */}
            <style>{`
                .wfm-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
                .wfm-scroll::-webkit-scrollbar-track { background: transparent; }
                .wfm-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }
                .wfm-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fadeIn 0.2s ease-out; }
                .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>

            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-sans text-slate-700">
                {/* HEADLINE / HEADER */}
                <header className="p-3 sm:p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-30 shadow-sm sm:shadow-none sm:static">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-purple-600 transition-colors"
                        >
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Workforce Management</h1>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Manage schedules, attendance, events, and leave requests in one place</p>
                        </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-lg">search</span>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <span className="p-1 bg-slate-100 rounded text-[10px] text-slate-500 font-bold">⌘</span>
                                <span className="p-1 bg-slate-100 rounded text-[10px] text-slate-500 font-bold">/</span>
                            </div>
                            <input type="text" placeholder="Quick Search..." className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium" />
                        </div>
                    </div>
                    {view !== 'leave' && (
                        <button
                            onClick={() => view === 'calendar' && setIsNewAgendaOpen(true)}
                            className={`w-full sm:w-auto ${view === 'attendance' ? 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-[#7C3AED] hover:bg-purple-700 text-white'} px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm sm:text-base transition-all shadow-sm ${view !== 'attendance' && 'shadow-purple-100'}`}
                        >
                            {headerBtn} {view !== 'attendance' && <span className="text-lg sm:text-xl">+</span>}
                            {view === 'attendance' && <span className="material-symbols-rounded text-lg">download</span>}
                        </button>
                    )}
                </header>

                {/* TABS */}
                <nav className="bg-white px-3 sm:px-4 md:px-8 flex gap-4 sm:gap-6 md:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {[
                        { id: 'calendar', label: 'Calendar', icon: 'calendar_today' },
                        { id: 'schedule', label: 'Schedule', icon: 'grid_view' },
                        { id: 'attendance', label: 'Attendance', icon: 'person' },
                        { id: 'leave', label: 'Leave', icon: 'pie_chart' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setView(tab.id)}
                            className={`pb-3 md:pb-4 text-xs sm:text-sm font-semibold transition-all relative ${view === tab.id ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-rounded text-base sm:text-lg">{tab.icon}</span>
                                {tab.label}
                            </span>
                            {view === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#7C3AED] rounded-t-full" />}
                        </button>
                    ))}
                </nav>

                {/* ==================== CONTENT VIEWS ==================== */}

                {view === 'calendar' && <CalendarView setSelectedEvent={setSelectedEvent} />}
                {view === 'schedule' && <ScheduleView />}
                {view === 'attendance' && <AttendanceView />}
                {view === 'leave' && <LeaveView />}

                <CalendarEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                <NewAgendaDrawer isOpen={isNewAgendaOpen} onClose={() => setIsNewAgendaOpen(false)} />
            </main>
        </React.Fragment>
    );
};

export default WorkforceManagement;