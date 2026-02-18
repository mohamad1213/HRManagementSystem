import React from 'react';

export default function EmployeePayrollView({ employee, onBack, onTabChange }) {

    // Mock Data for Payroll Summary
    const payrollSummary = {
        totalSalary: '$12,452.11',
        breakdown: [
            { label: 'Net Salary', value: '$928.41', color: 'bg-purple-500', text: 'text-purple-500', width: '30%' },
            { label: 'Benefit', value: '$328.85', color: 'bg-blue-500', text: 'text-blue-500', width: '15%' },
            { label: 'Incentive', value: '$351.02', color: 'bg-orange-500', text: 'text-orange-500', width: '15%' },
            { label: 'Overtime', value: '$300', color: 'bg-pink-500', text: 'text-pink-500', width: '10%' },
            { label: 'Employer Contribution', value: '$576.28', color: 'bg-gray-400', text: 'text-gray-500', width: '30%' },
        ]
    };

    // Mock Data for Payroll Breakdown Table
    const payrollLog = [
        { element: 'Regular Pay', category: 'Net Salary', categoryColor: 'text-purple-500', payment: '$5,200.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Paid', statusColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
        { element: 'Bonus', category: 'Incentive', categoryColor: 'text-orange-500', payment: '$120.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Processing', statusColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
        { element: 'Commission', category: 'Incentive', categoryColor: 'text-orange-500', payment: '$350.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
        { element: 'Signing Bonus', category: 'Benefit', categoryColor: 'text-blue-500', payment: '$510.00', reimbursement: '$200', date: '12 October 2025', bank: 'BCA', status: 'On Hold', statusColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
        { element: 'Business Expense', category: 'Overtime', categoryColor: 'text-pink-500', payment: '$5,040.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Failed', statusColor: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
        { element: 'Health Allowance', category: 'Overtime', categoryColor: 'text-pink-500', payment: '$380.00', reimbursement: '$300', date: '12 October 2025', bank: 'BCA', status: 'Paid', statusColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
        { element: 'Medical PPO', category: 'Contribution', categoryColor: 'text-gray-500', payment: '$95.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Paid', statusColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    ];

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
                        <button onClick={() => onTabChange('attendance')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Attendance</button>
                        <button onClick={() => onTabChange('payroll')} className="pb-3 border-b-2 border-primary text-primary font-medium">Payroll</button>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                            01 October to 31 October 2025
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-text-main-light dark:text-text-main-dark">
                                Send to Payslip
                            </button>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-purple-500/20">
                                Send to Payroll
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-end mb-6">
                        <div className="mb-2">
                            <h2 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-1">{payrollSummary.totalSalary}</h2>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Salary</p>
                        </div>

                        <div className="flex flex-wrap gap-8 flex-1 justify-end pb-2">
                            {payrollSummary.breakdown.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                                        <span className="font-bold text-text-main-light dark:text-text-main-dark">{item.value}</span>
                                    </div>
                                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark pl-4.5">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Multi-color Progress Bar */}
                    <div className="flex h-2 w-full rounded-full overflow-hidden">
                        {payrollSummary.breakdown.map((item, index) => (
                            <div key={index} className={`${item.color}`} style={{ width: item.width }}></div>
                        ))}
                    </div>
                </div>

                {/* Payroll Breakdown Table */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-8">
                    <div className="mb-6">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Payroll Breakdown</h3>
                        <p className="text-xs text-text-muted-light mt-1">Detailed view of all pay elements for this employee</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-slate-800/50 text-[10px] font-semibold text-text-muted-light dark:text-text-muted-dark border-b border-border-light dark:border-border-dark">
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Payment Element</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Category</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Payment</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Reimbursement</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Payment Date</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Bank</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50">Status</th>
                                    <th className="p-4 bg-gray-50 dark:bg-slate-800/50 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[11px] text-text-main-light dark:text-text-main-dark">
                                {payrollLog.map((log, i) => (
                                    <tr key={i} className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4 font-medium">{log.element}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 ">
                                                <span className={`w-2 h-2 rounded-full ${log.categoryColor === 'text-purple-500' ? 'bg-purple-500' : log.categoryColor === 'text-orange-500' ? 'bg-orange-500' : log.categoryColor === 'text-blue-500' ? 'bg-blue-500' : log.categoryColor === 'text-pink-500' ? 'bg-pink-500' : 'bg-gray-500'}`}></span>
                                                {log.category}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">{log.payment}</td>
                                        <td className="p-4">{log.reimbursement}</td>
                                        <td className="p-4">{log.date}</td>
                                        <td className="p-4">{log.bank}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 w-24 justify-center ${log.statusColor}`}>
                                                <span className="material-symbols-rounded text-[12px]">
                                                    {['Paid', 'Good'].includes(log.status) ? 'check_circle' :
                                                        ['Processing'].includes(log.status) ? 'settings' :
                                                            ['Failed'].includes(log.status) ? 'cancel' : 'pending'}
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
