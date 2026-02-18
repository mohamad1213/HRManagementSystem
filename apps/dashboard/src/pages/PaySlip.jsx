import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PaySlip = ({ onMenuClick }) => {
    // --- Mock Data ---

    // Salary Chart Data
    const salaryData = [
        { name: 'Net Pay', value: 9240, color: '#A855F7' }, // Purple
        { name: 'Meal Allowance', value: 850, color: '#EC4899' }, // Pink
        { name: 'Position Allowance', value: 5120, color: '#F97316' }, // Orange
        { name: 'Skill Allowance', value: 2940, color: '#E2E8F0' }, // Slate-200 (approx)
    ];

    // Earnings Summary Data
    const earningsSummary = [
        { label: 'Net Pay', amount: '$12.3432', icon: 'payments', color: 'blue', bg: 'bg-blue-50 text-blue-500' },
        { label: 'Allowance', amount: '$12.3432', icon: 'wallet', color: 'purple', bg: 'bg-purple-50 text-purple-500' },
        { label: 'Benefit', amount: '$12.3432', icon: 'card_giftcard', color: 'orange', bg: 'bg-orange-50 text-orange-500' },
        { label: 'Net Payable', amount: '$12.3432', icon: 'account_balance_wallet', color: 'pink', bg: 'bg-pink-50 text-pink-500' },
    ];

    // Payroll Table Data
    const payrollData = [
        { element: 'Regular Pay', category: 'Net Salary', payment: '$5,200.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Paid' },
        { element: 'Bonus', category: 'Incentive', payment: '$120.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Processing' },
        { element: 'Commission', category: 'Incentive', payment: '$350.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Pending' },
        { element: 'Signing Bonus', category: 'Benefit', payment: '$510.00', reimbursement: '$200', date: '12 October 2025', bank: 'BCA', status: 'On Hold' },
        { element: 'Business Expense', category: 'Overtime', payment: '$5,040.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Failed' },
        { element: 'Health Allowance', category: 'Overtime', payment: '$380.00', reimbursement: '$300', date: '12 October 2025', bank: 'BCA', status: 'Paid' },
        { element: 'Medical PRO', category: 'Contribution', payment: '$95.00', reimbursement: '-', date: '12 October 2025', bank: 'BCA', status: 'Paid' },
    ];

    // Helper for status badge styles
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-50 text-green-600';
            case 'Processing': return 'bg-purple-50 text-purple-600';
            case 'Pending': return 'bg-yellow-50 text-yellow-600';
            case 'On Hold': return 'bg-orange-50 text-orange-600';
            case 'Failed': return 'bg-red-50 text-red-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Paid': return 'check_circle';
            case 'Processing': return 'sync';
            case 'Pending': return 'schedule';
            case 'On Hold': return 'pause_circle';
            case 'Failed': return 'error';
            default: return 'help';
        }
    }

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Net Salary': return 'text-purple-500';
            case 'Incentive': return 'text-orange-500';
            case 'Benefit': return 'text-blue-500';
            case 'Overtime': return 'text-pink-500';
            case 'Contribution': return 'text-teal-500';
            default: return 'text-slate-500';
        }
    };


    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Pay Slip</h1>
                        <p className="text-sm text-slate-500 mt-1">View your monthly salary details and download payslip documents.</p>
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-6">

                {/* --- Top Row: Stats & Charts --- */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                    {/* Salary Chart Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:col-span-1">
                        <h3 className="text-base font-bold text-slate-800 mb-4">Salary</h3>
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40 mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={salaryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={75}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {salaryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xl font-extrabold text-slate-800">$17.300</span>
                                    <span className="text-[10px] text-slate-400 font-semibold">Total salary</span>
                                </div>
                            </div>

                            {/* Legend - Table Layout for alignment */}
                            <div className="w-full">
                                <table className="w-full">
                                    <tbody className="text-[11px]">
                                        {salaryData.map((item, index) => (
                                            <tr key={index} className="h-6">
                                                <td className="w-4">
                                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                                </td>
                                                <td className="text-slate-500 font-bold pl-2">{item.name}</td>
                                                <td className="text-right font-extrabold text-slate-800">
                                                    {item.name === 'Meal Allowance' ? '9%' : `$${item.value.toLocaleString()}`}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Additions Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 xl:col-span-2">
                        <h3 className="text-base font-bold text-slate-800 mb-6">Additions</h3>
                        <div className="flex flex-col justify-center h-full gap-8 pb-4">
                            {/* Row 1 */}
                            <div className="flex items-center">
                                {/* Circle */}
                                <div className="relative w-24 h-24 shrink-0 mr-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="#F3E8FF" strokeWidth="6" fill="transparent" />
                                        <circle cx="48" cy="48" r="40" stroke="#A855F7" strokeWidth="6" fill="transparent" strokeDasharray="251.2" strokeDashoffset="100" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                                        <span className="text-xl font-extrabold text-slate-800">2%</span>
                                        <span className="text-[9px] text-slate-400 font-bold">per hour</span>
                                    </div>
                                </div>

                                {/* Grid for details */}
                                <div className="grid grid-cols-3 w-full items-center gap-4">
                                    <span className="text-xs font-bold text-slate-500">of Daily Rate</span>
                                    <span className="text-xs font-bold text-slate-600">@ Overtime</span>
                                    <span className="text-base font-extrabold text-slate-800 text-right">1.400</span>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex items-center">
                                {/* Circle */}
                                <div className="relative w-24 h-24 shrink-0 mr-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="#FCE7F3" strokeWidth="6" fill="transparent" />
                                        <circle cx="48" cy="48" r="40" stroke="#EC4899" strokeWidth="6" fill="transparent" strokeDasharray="251.2" strokeDashoffset="125.6" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-xl font-extrabold text-slate-800">50%</span>
                                    </div>
                                </div>

                                {/* Grid for details */}
                                <div className="grid grid-cols-3 w-full items-center gap-4">
                                    <span className="text-xs font-bold text-slate-500">of Gross Salary</span>
                                    <span className="text-xs font-bold text-slate-600">@ Bonuses</span>
                                    <span className="text-base font-extrabold text-slate-800 text-right">10.000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Cards */}
                    <div className="flex flex-col gap-6 xl:col-span-1">
                        {/* View Payslip */}
                        <div className="bg-[#F9F5FF] rounded-2xl p-6 flex flex-col justify-between h-40 border border-purple-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">View Payslip</h3>
                                    <p className="text-[10px] text-slate-500 font-bold mt-1">Month of December</p>
                                </div>
                                <button className="px-4 py-1.5 bg-white text-[10px] font-bold text-slate-600 rounded-lg shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
                                    View all
                                </button>
                            </div>
                        </div>

                        {/* Net Payable */}
                        <div className="bg-[#F9F5FF] rounded-2xl p-6 flex flex-col justify-center h-40 border border-purple-50">
                            <h3 className="text-2xl font-extrabold text-slate-800 mb-1">$34000</h3>
                            <p className="text-[10px] text-slate-500 font-bold">Net Pay ble</p>
                        </div>
                    </div>
                </div>

                {/* --- Your Earnings --- */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Your Earnings</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {earningsSummary.map((item, index) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-purple-50 transition-all cursor-pointer">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.label === 'Net Pay' ? 'bg-blue-50 text-blue-500' : item.label === 'Allowance' ? 'bg-purple-50 text-purple-500' : item.label === 'Benefit' ? 'bg-orange-50 text-orange-500' : 'bg-pink-50 text-pink-500'}`}>
                                    <span className="material-symbols-rounded text-2xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 mb-1">{item.label}</p>
                                    <p className="text-xl font-extrabold text-slate-800">{item.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Payroll Breakdown --- */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Payroll Breakdown</h3>
                        <p className="text-xs text-slate-500 mt-1">Detailed view of all pay elements for this employee</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F8F9FB] border-b border-border-light text-left">
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 min-w-[150px]">Payment Element</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400">Payment</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400">Reimbursement</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 min-w-[120px]">Payment Date</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400">Bank</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payrollData.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-all border-b border-dashed border-slate-200 last:border-0 group">
                                        <td className="px-6 py-5 text-xs font-bold text-slate-700">{row.element}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                                                <div className={`w-2 h-2 rounded-full ${row.category === 'Net Salary' ? 'bg-purple-500' : row.category === 'Incentive' ? 'bg-orange-500' : row.category === 'Benefit' ? 'bg-blue-500' : row.category === 'Overtime' ? 'bg-pink-500' : 'bg-teal-500'}`}></div>
                                                {row.category}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-700">{row.payment}</td>
                                        <td className="px-6 py-5 text-xs font-medium text-slate-500">{row.reimbursement}</td>
                                        <td className="px-6 py-5 text-xs font-medium text-slate-500">{row.date}</td>
                                        <td className="px-6 py-5 text-xs font-medium text-slate-500 uppercase">{row.bank}</td>
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold shadow-sm border border-transparent ${row.status === 'Paid' ? 'bg-green-50 text-green-600' :
                                                row.status === 'Processing' ? 'bg-purple-50 text-purple-600' :
                                                    row.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                        row.status === 'On Hold' ? 'bg-orange-50 text-orange-600' :
                                                            'bg-red-50 text-red-600'
                                                }`}>
                                                <span className={`material-symbols-rounded text-[14px] leading-none ${row.status === 'Paid' ? 'text-green-500' :
                                                    row.status === 'Processing' ? 'text-purple-500' :
                                                        row.status === 'Pending' ? 'text-yellow-500' :
                                                            row.status === 'On Hold' ? 'text-orange-500' :
                                                                'text-red-500'
                                                    }`}>
                                                    {getStatusIcon(row.status)}
                                                </span>
                                                {row.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                                                <span className="material-symbols-rounded text-lg">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PaySlip;
