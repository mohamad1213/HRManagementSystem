import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function EmployeeAttendanceView({ employee, onBack, onTabChange }) {

    // Mock Data for Attendance Overview Pie Chart
    const attendanceData = [
        { name: 'On Time', value: 62, color: '#8b5cf6' }, // Purple-500
        { name: 'Late', value: 12, color: '#60a5fa' },   // Blue-400
        { name: 'Early Leave', value: 6, color: '#f472b6' }, // Pink-400
        { name: 'Absent', value: 2, color: '#fbbf24' },  // Amber-400
    ];

    // Mock Data for Attendance Log
    const attendanceLog = [
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '7h -22m', late: '3m', leave: '3m', overTime: '30m', location: 'Jakarta HQ • Mobile', status: 'Early', statusColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
        { date: '12 October 2025', checkIn: '-', checkOut: '-', break: '-', workHours: '-', late: '-', leave: '-', overTime: '-', location: '-', status: 'Absent', statusColor: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '0m', leave: '0m', overTime: '0m', location: 'Remote • Desktop App', status: 'Ontime', statusColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detected', status: 'Late', statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
        { date: '12 October 2025', checkIn: '-', checkOut: '-', break: '-', workHours: '-', late: '-', leave: '-', overTime: '-', location: '-', status: 'Sick Leave', statusColor: 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '0m', leave: '0m', overTime: '0m', location: 'Sudirman Office • Auto-detec...', status: 'Ontime', statusColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    ];

    // Shift Timeline Bars
    const shiftTimeline = Array.from({ length: 14 }).map((_, i) => ({
        height: [60, 80, 50, 90, 70, 40, 60, 80, 90, 50, 70, 60, 80, 90][i],
        color: i >= 5 && i <= 7 ? 'bg-purple-300' : 'bg-purple-500' // Lighter for break
    }));

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-slate-900 overflow-y-auto">
            {/* Header Section */}
            <div className="mb-6 p-6 pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Employee Details</h1>
                    <div className="flex gap-6 text-sm mt-4 border-b border-border-light dark:border-border-dark">
                        <button onClick={() => onTabChange('overview')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Overview</button>
                        <button onClick={() => onTabChange('activity')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Activity</button>
                        <button onClick={() => onTabChange('personal')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Personal Details</button>
                        <button onClick={() => onTabChange('attendance')} className="pb-3 border-b-2 border-primary text-primary font-medium">Attendance</button>
                        <button onClick={() => onTabChange('payroll')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Payroll</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Left Card: Shift/Daily Status */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col justify-between">
                        <div className="text-center mb-8">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Monday, 24 October 2025</div>
                            <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-4">{employee.name}</h2>
                            <div className="flex justify-center gap-4">
                                <div className="bg-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                                    <span className="w-5 h-5 bg-white text-purple-500 rounded-full flex items-center justify-center font-bold text-[10px]">8</span>
                                    Tasks in Progress
                                </div>
                                <div className="bg-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                                    <span className="w-5 h-5 bg-white text-purple-500 rounded-full flex items-center justify-center font-bold text-[10px]">17</span>
                                    Inquiries Pending
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between text-xs font-medium text-text-main-light dark:text-text-main-dark mb-2">
                                <div>08:00 AM<br /><span className="text-text-muted-light font-normal text-[10px]">Start</span></div>
                                <div className="text-center">12:00<br /><span className="text-text-muted-light font-normal text-[10px]">Break</span></div>
                                <div className="text-right">17:00 PM<br /><span className="text-text-muted-light font-normal text-[10px]">End</span></div>
                            </div>
                            <div className="flex items-end gap-1 h-16">
                                {shiftTimeline.map((bar, i) => (
                                    <div key={i} className={`flex-1 rounded-sm ${bar.color}`} style={{ height: `${bar.height}%` }}></div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-border-light dark:border-border-dark pt-6">
                            <div>
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Compared to Yesterday</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark">+2%</div>
                            </div>
                            <div className="border-l border-border-light dark:border-border-dark pl-4">
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Break Duration</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark">1 Hour</div>
                            </div>
                            <div className="border-l border-border-light dark:border-border-dark pl-4">
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Shift Completion Rate</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark">82% Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Attendance Overview */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Attendance Overview</h3>

                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-48 h-48 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={attendanceData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={0}
                                            dataKey="value"
                                        >
                                            {attendanceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                    <div className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">62%</div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-1.5 rounded-full bg-purple-500"></div>
                                        <div className="text-xs font-bold text-text-main-light dark:text-text-main-dark">On Time</div>
                                    </div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark pl-5">Stable check-in & check-out</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-1.5 rounded-full bg-blue-400"></div>
                                        <div className="text-xs font-bold text-text-main-light dark:text-text-main-dark">Early Leave</div>
                                    </div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark pl-5">No attendance logged</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-1.5 rounded-full bg-yellow-400"></div>
                                        <div className="text-xs font-bold text-text-main-light dark:text-text-main-dark">Late</div>
                                    </div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark pl-5">Minutes past scheduled time</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-3 h-1.5 rounded-full bg-pink-400"></div>
                                        <div className="text-xs font-bold text-text-main-light dark:text-text-main-dark">Absent</div>
                                    </div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark pl-5">No attendance logged</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-border-light dark:border-border-dark pt-6 mt-6">
                            <div>
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">On Time</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark text-lg">3h 15m</div>
                                <div className="text-[10px] text-green-500">+8m vs yesterday</div>
                            </div>
                            <div className="border-l border-border-light dark:border-border-dark pl-4">
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Late</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark text-lg">12m</div>
                                <div className="text-[10px] text-red-500">-4m vs yesterday</div>
                            </div>
                            <div className="border-l border-border-light dark:border-border-dark pl-4">
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Pending</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark text-lg">2 items</div>
                                <div className="text-[10px] text-text-muted-light">Correction & Approval</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Log Table */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Attendance Log</h3>
                            <p className="text-xs text-text-muted-light mt-1">Daily check-in and check-out history</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-3 py-1.5 border border-border-light dark:border-border-dark rounded-lg text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                01 October - 31 October 2024 <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                            <button className="px-3 py-1.5 border border-border-light dark:border-border-dark rounded-lg text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                Filter by <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                            <button className="px-3 py-1.5 border border-border-light dark:border-border-dark rounded-lg text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                Page Size 10 <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-800/50 text-[10px] font-semibold text-text-muted-light dark:text-text-muted-dark border-b border-border-light dark:border-border-dark">
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Start Date</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Check In</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Check Out</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Break</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Work Hours</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Late</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Leave</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Over Time</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Present Locations</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Status</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] text-text-main-light dark:text-text-main-dark">
                                {attendanceLog.map((log, i) => (
                                    <tr key={i} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4">{log.date}</td>
                                        <td className="p-4">{log.checkIn}</td>
                                        <td className="p-4">{log.checkOut}</td>
                                        <td className="p-4 text-blue-500 font-medium">{log.break}</td>
                                        <td className="p-4">{log.workHours}</td>
                                        <td className="p-4">{log.late}</td>
                                        <td className="p-4">{log.leave}</td>
                                        <td className="p-4 text-blue-500 font-medium">{log.overTime}</td>
                                        <td className="p-4">{log.location}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 w-24 ${log.statusColor}`}>
                                                <span className="material-symbols-rounded text-[10px]">
                                                    {log.status === 'Early' || log.status === 'Ontime' ? 'check_circle' : log.status.includes('Absent') || log.status.includes('Late') ? 'error' : 'schedule'}
                                                </span>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-text-muted-light hover:text-text-main-light p-1"><span className="material-symbols-rounded text-base">more_vert</span></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
