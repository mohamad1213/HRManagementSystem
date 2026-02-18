import React, { useState } from 'react';

export default function EmployeeActivityView({ employee, onBack, onTabChange }) {

    // Mock Data for Activity View
    const leaveStats = [
        { label: '06 days available', subLabel: 'to Book time off', icon: 'check_circle', iconColor: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: '06 days available', subLabel: 'to Book time off', icon: 'wb_sunny', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
        { label: '15 Days per Year', subLabel: 'in the contract', icon: 'calendar_month', iconColor: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: '0 days upcoming', subLabel: '0 days taken', icon: 'grid_view', iconColor: 'text-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
        { label: '0 days extra leave', subLabel: 'Carry over days / Allowances', icon: 'card_giftcard', iconColor: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    ];

    const attendanceLog = [
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '7h -22m', late: '3m', leave: '3m', overTime: '30m', location: 'Jakarta HQ • Mobile', status: 'Early', statusColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '7h -22m', late: '12m', leave: '12m', overTime: '0m', location: 'Kemang, Jakarta • GPS', status: 'Absent', statusColor: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '1 hrs', workHours: '8h 30m', late: '8m', leave: '8m', overTime: '0m', location: 'Jakarta HQ • Auto-detected', status: 'Late', statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
        { date: '12 October 2025', checkIn: '08:20', checkOut: '17:00', break: '-', workHours: '8h 30m', late: '0m', leave: '0m', overTime: '-', location: 'Outside Area • GPS Drift', status: 'Late', statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
    ];

    const kpiData = [
        { month: 'Jan', value: 30 }, { month: 'Feb', value: 20 }, { month: 'Mar', value: 60 },
        { month: 'Apr', value: 40 }, { month: 'Mei', value: 70 }, { month: 'Jun', value: 50 },
        { month: 'Jul', value: 80 }, { month: 'Aug', value: 60 }, { month: 'Sep', value: 85, current: true },
        { month: 'Oct', value: 50 }, { month: 'Nov', value: 40 }, { month: 'Dec', value: 60 },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-slate-900 overflow-y-auto">
            {/* Header with Breadcrumb-like Tabs */}
            <div className="mb-6 p-6 pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Employee Details</h1>
                    <div className="flex gap-6 text-sm mt-4 border-b border-border-light dark:border-border-dark">
                        <button onClick={onBack} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Overview</button>
                        <button className="pb-3 border-b-2 border-primary text-primary font-medium">Activity</button>
                        <button onClick={() => onTabChange('personal')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Personal Details</button>
                        <button onClick={() => onTabChange('attendance')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Attendance</button>
                        <button onClick={() => onTabChange('payroll')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Payroll</button>
                    </div>
                </div>

                {/* Profile Summary Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={employee.avatar.replace('150', '300')} alt={employee.name} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{employee.name}</h2>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{employee.contact}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 pt-6 border-t border-border-light dark:border-border-dark">
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Join Date</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">{employee.joinDate.replace('2025', '2019')}</div>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Department</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Product Management
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Role</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Sr. UX Researcher</div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Employment</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">Full-Time</div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Status</div>
                            <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                            </span>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Monthly Salary</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">$5,000</div>
                        </div>
                    </div>
                </div>

                {/* Leave Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    {leaveStats.map((stat, idx) => (
                        <div key={idx} className={`${stat.bgColor} p-4 rounded-xl flex flex-col justify-between h-28`}>
                            <span className={`material-symbols-rounded text-2xl mb-2 ${stat.iconColor}`}>{stat.icon}</span>
                            <div>
                                <div className="font-bold text-sm text-text-main-light dark:text-text-main-dark">{stat.label}</div>
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">{stat.subLabel}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KPI and Workload Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* KPI Performance */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">KPI Performance</h3>
                                <span className="material-symbols-rounded text-xs text-text-muted-light cursor-help">info</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs border border-border-light dark:border-border-dark rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-slate-700">
                                Monthly View <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                        </div>

                        <div className="relative h-40 flex items-end justify-between gap-1 px-2">
                            {/* Dotted Lines Background */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-full w-full absolute top-0"></div>
                                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-full w-full absolute top-1/4"></div>
                                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-full w-full absolute top-2/4"></div>
                                <div className="border-t border-dashed border-gray-200 dark:border-gray-700 h-full w-full absolute top-3/4"></div>
                            </div>

                            {kpiData.map((data, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 z-10 w-full relative group">
                                    {data.current && (
                                        <div className="absolute bottom-full mb-2 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 border border-border-light dark:border-border-dark w-max text-left z-20">
                                            <div className="text-[10px] text-text-muted-light mb-0.5">November 2025</div>
                                            <div className="text-xs font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> In Progress <span className="text-text-main-light dark:text-text-main-dark">87% KPI Score</span>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`w-full max-w-[20px] rounded-sm transition-all duration-300 ${data.current ? 'bg-purple-500/50 h-24 relative' : 'bg-purple-400 h-1.5'}`}
                                        style={{ height: data.current ? '80%' : '6px', marginBottom: data.current ? '0' : `${data.value}%` }}
                                    >
                                        {/* Current bar specifically styled */}
                                        {data.current && <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500 rounded-sm"></div>}
                                    </div>
                                    <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Daily Workload */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Daily Workload</h3>
                                <span className="material-symbols-rounded text-xs text-text-muted-light cursor-help">info</span>
                            </div>
                            <button className="text-text-muted-light"><span className="material-symbols-rounded">more_horiz</span></button>
                        </div>

                        <div className="mb-6">
                            <div className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Total Time Worked</div>
                            <div className="text-sm text-text-muted-light dark:text-text-muted-dark">12 Hours 8 Minute</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex gap-2 h-8 w-full rounded-lg overflow-hidden mb-4">
                            <div className="w-[8%] bg-yellow-400 rounded-l-lg"></div>
                            <div className="flex-1 bg-blue-500"></div>
                            <div className="w-[15%] bg-pink-500 rounded-r-lg"></div>
                        </div>

                        {/* Legend */}
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                <span className="text-text-main-light dark:text-text-main-dark">Pause time</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                <span className="text-text-main-light dark:text-text-main-dark">Active time</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                <span className="text-text-main-light dark:text-text-main-dark">Extra time</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attendance Log Filter Tabs */}
                <div className="mb-4 flex gap-6 text-sm border-b border-border-light dark:border-border-dark">
                    <button className="pb-2 border-b-2 border-primary text-primary font-medium">Attendance</button>
                    <button className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Leave History</button>
                    <button className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Payroll</button>
                </div>

                {/* Detailed Log Table */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden">
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
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 w-20 ${log.statusColor}`}>
                                                <span className="material-symbols-rounded text-[10px]">{log.status === 'Early' ? 'check_circle' : log.status === 'Absent' ? 'cancel' : 'error'}</span> {log.status}
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
