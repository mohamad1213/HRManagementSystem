import React, { useState } from 'react';
import EmployeeActivityView from './EmployeeActivityView';
import EmployeePersonalDetailsView from './EmployeePersonalDetailsView';
import EmployeeAttendanceView from './EmployeeAttendanceView';
import EmployeePayrollView from './EmployeePayrollView';

export default function EmployeeDetailView({ employee, onBack }) {
    const [currentTab, setCurrentTab] = useState('overview');

    if (currentTab === 'activity') {
        return <EmployeeActivityView employee={employee} onBack={() => setCurrentTab('overview')} onTabChange={setCurrentTab} />;
    }

    if (currentTab === 'personal') {
        return <EmployeePersonalDetailsView employee={employee} onTabChange={setCurrentTab} onBack={() => setCurrentTab('overview')} />;
    }

    if (currentTab === 'attendance') {
        return <EmployeeAttendanceView employee={employee} onTabChange={setCurrentTab} onBack={() => setCurrentTab('overview')} />;
    }

    if (currentTab === 'payroll') {
        return <EmployeePayrollView employee={employee} onTabChange={setCurrentTab} onBack={() => setCurrentTab('overview')} />;
    }

    // Mock Data for specific sections
    const documents = [
        { name: 'CV - Shopia Aiko...', size: '12 Mb', date: '17 November', type: 'pdf', icon: 'picture_as_pdf', color: 'text-red-500 bg-red-50' },
        { name: 'Contract - Shopia...', size: '12 Mb', date: '17 November', type: 'doc', icon: 'description', color: 'text-blue-500 bg-blue-50' },
        { name: 'Statistic - Test', size: '12 Mb', date: '17 November', type: 'xls', icon: 'analytics', color: 'text-green-500 bg-green-50' },
    ];

    const attendanceLog = [
        { date: '12 November 2025', checkIn: '08:20', checkOut: '17:00', break: '1hrs', location: 'Jakarta HQ • Mobile', status: 'Early', statusColor: 'text-green-600 bg-green-100' },
        { date: '12 November 2025', checkIn: '08:20', checkOut: '17:00', break: '1hrs', location: 'Remote • Desktop App', status: 'Early', statusColor: 'text-green-600 bg-green-100' },
        { date: '12 November 2025', checkIn: '08:20', checkOut: '17:00', break: '1hrs', location: 'Jakarta HQ • Auto-detected', status: 'Early', statusColor: 'text-green-600 bg-green-100' },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-slate-900 overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Employee Details</h1>
                        {/* Breadcrumb / Tabs */}
                        <div className="flex gap-6 text-sm mt-2 border-b border-border-light dark:border-border-dark">
                            <button className="pb-2 border-b-2 border-primary text-primary font-medium">Overview</button>
                            <button onClick={() => setCurrentTab('activity')} className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Activity</button>
                            <button onClick={() => setCurrentTab('personal')} className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Personal Details</button>
                            <button onClick={() => setCurrentTab('attendance')} className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Attendance</button>
                            <button onClick={() => setCurrentTab('payroll')} className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Payroll</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Profile Info */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex flex-col items-center text-center mb-6 relative">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 bg-gray-100 relative">
                                <img src={employee.avatar.replace('150', '300')} alt={employee.name} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{employee.name}</h2>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{employee.position}</p>

                            <button className="absolute top-0 right-0 p-2 text-text-muted-light hover:text-primary transition-colors border border-border-light dark:border-border-dark rounded-lg flex items-center gap-1 text-xs">
                                Edit <span className="material-symbols-rounded text-sm">edit</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark border-dashed">
                                <div className="flex items-center gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-symbols-rounded text-lg">badge</span> Employee ID
                                </div>
                                <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{employee.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark border-dashed">
                                <div className="flex items-center gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-symbols-rounded text-lg">calendar_month</span> Join Date
                                </div>
                                <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{employee.joinDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-light dark:border-border-dark border-dashed">
                                <div className="flex items-center gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-symbols-rounded text-lg">mail</span> Email Address
                                </div>
                                <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate max-w-[150px]">{employee.contact}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <div className="flex items-center gap-3 text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <span className="material-symbols-rounded text-lg">call</span> Phone
                                </div>
                                <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">+62 856 - 4321 - 3498</span>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4">Document</h3>
                        <div className="space-y-3">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className={`p-2 rounded-lg ${doc.color} bg-opacity-10`}>
                                        <span className={`material-symbols-rounded text-xl ${doc.color.split(' ')[0]}`}>{doc.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-text-main-light dark:text-text-main-dark">{doc.name}</div>
                                        <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">{doc.size}</div>
                                    </div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">{doc.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Widgets */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Top Row Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Project Completion */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Project Completion</h3>
                                <button className="text-text-muted-light"><span className="material-symbols-rounded">more_horiz</span></button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-text-main-light dark:text-text-main-dark font-medium">SAAS Management</span>
                                        <span className="text-text-muted-light">64%</span>
                                    </div>
                                    <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <div key={i} className={`flex-1 mx-[1px] ${i < 13 ? 'bg-purple-500' : 'bg-transparent'}`}></div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-text-main-light dark:text-text-main-dark font-medium">Platform Update</span>
                                        <span className="text-text-muted-light">76%</span>
                                    </div>
                                    <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden flex">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <div key={i} className={`flex-1 mx-[1px] ${i < 15 ? 'bg-purple-500' : 'bg-transparent'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project Ongoing */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Project name</div>
                                    <div className="flex items-center gap-2 font-bold text-text-main-light dark:text-text-main-dark">
                                        <span className="w-2 h-2 rounded-full bg-orange-500"></span> Replit AI redesign
                                    </div>
                                </div>
                                <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-[10px] font-bold">In-Progress</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Project Manager</div>
                                    <div className="flex items-center gap-2">
                                        <img src="https://i.pravatar.cc/150?u=noah" className="w-5 h-5 rounded-full" alt="" />
                                        <span className="text-xs font-medium text-text-main-light dark:text-text-main-dark">Noah Kenji</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Time Line</div>
                                    <span className="text-xs font-medium text-text-main-light dark:text-text-main-dark">12.08.2024 - 04.10.2026</span>
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Team</div>
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/150?u=1" className="w-5 h-5 rounded-full border border-white dark:border-slate-800" alt="" />
                                        <img src="https://i.pravatar.cc/150?u=2" className="w-5 h-5 rounded-full border border-white dark:border-slate-800" alt="" />
                                        <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-[8px] border border-white dark:border-slate-800 font-bold text-gray-500">12+</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark mb-1">Design Lead</div>
                                    <div className="flex items-center gap-2">
                                        <img src="https://i.pravatar.cc/150?u=dante1" className="w-5 h-5 rounded-full" alt="" />
                                        <span className="text-xs font-medium text-text-main-light dark:text-text-main-dark w-full truncate">Dante Haru</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employee Activity */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Employee Activity</h3>
                            <button className="text-text-muted-light"><span className="material-symbols-rounded">more_horiz</span></button>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-text-main-light dark:text-text-main-dark">Nov 17, 2025</div>
                            <div className="px-3 py-1 text-xs text-text-muted-light dark:text-text-muted-dark">8 hrs</div>
                            <div className="px-3 py-1 text-xs text-text-muted-light dark:text-text-muted-dark">Overtime (1hrs)</div>
                        </div>

                        <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-0 before:w-[1px] before:border-l before:border-dashed before:border-gray-300 dark:before:border-gray-700">
                            <div className="relative pl-6">
                                <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full border-2 border-primary bg-background-light dark:bg-slate-900 z-10"></div>
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-text-main-light dark:text-text-main-dark flex items-center gap-2">Time-in <span className="material-symbols-rounded text-lg text-text-muted-light">schedule</span></div>
                                    <div className="text-xs flex items-center gap-2 font-medium">07.43 <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-[10px]">Early</span></div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-background-light dark:bg-slate-900 z-10"></div>
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-text-main-light dark:text-text-main-dark flex items-center gap-2">Break - Lunch <span className="material-symbols-rounded text-lg text-text-muted-light">soup_kitchen</span></div>
                                    <div className="text-xs flex items-center gap-2 text-text-muted-light">12.00 - 14.15 (15 min) <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px]">Late</span></div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-background-light dark:bg-slate-900 z-10"></div>
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-text-main-light dark:text-text-main-dark flex items-center gap-2">Break - Asr Pray <span className="material-symbols-rounded text-lg text-text-muted-light">dark_mode</span></div>
                                    <div className="text-xs text-text-main-light dark:text-text-main-dark font-medium">15.10</div>
                                </div>
                            </div>
                            <div className="relative pl-6">
                                <div className="absolute left-[-21px] top-1 w-3 h-3 rounded-full border-2 border-primary bg-background-light dark:bg-slate-900 z-10"></div>
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-sm text-text-main-light dark:text-text-main-dark flex items-center gap-2">Time-out <span className="material-symbols-rounded text-lg text-text-muted-light">schedule</span></div>
                                    <div className="text-xs flex items-center gap-2 font-medium">17.00 <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 text-[10px]">Good</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Log */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-4">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">November 2025</h3>
                                <div className="flex gap-1">
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"><span className="material-symbols-rounded text-sm">chevron_left</span></button>
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"><span className="material-symbols-rounded text-sm">chevron_right</span></button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 border border-border-light dark:border-border-dark rounded-lg text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                    Filter by <span className="material-symbols-rounded text-sm">filter_list</span>
                                </button>
                                <button className="px-3 py-1.5 border border-border-light dark:border-border-dark rounded-lg text-xs flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                    View All <span className="material-symbols-rounded text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-800/50 text-[10px] font-semibold text-text-muted-light dark:text-text-muted-dark border-b border-border-light dark:border-border-dark">
                                        <th className="p-3 rounded-tl-lg">Start Date</th>
                                        <th className="p-3">Check In</th>
                                        <th className="p-3">Check Out</th>
                                        <th className="p-3">Break</th>
                                        <th className="p-3">Locations</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3 text-right rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[11px] text-text-main-light dark:text-text-main-dark">
                                    {attendanceLog.map((log, i) => (
                                        <tr key={i} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="p-3">{log.date}</td>
                                            <td className="p-3">{log.checkIn}</td>
                                            <td className="p-3">{log.checkOut}</td>
                                            <td className="p-3">{log.break}</td>
                                            <td className="p-3">{log.location}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 w-fit ${log.statusColor}`}>
                                                    <span className="material-symbols-rounded text-[10px]">check_circle</span> {log.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
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
        </div>
    );
}
