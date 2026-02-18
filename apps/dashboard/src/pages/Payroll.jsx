import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';

const Payroll = ({ onMenuClick }) => {
    const [activeTab, setActiveTab] = useState('Overview');

    // --- Mock Data ---

    const performanceData = [
        { name: 'Account', profit: 32000, deduction: 18000, other: 10000 },
        { name: 'HR', profit: 18000, deduction: 10000, other: 10000 },
        { name: 'Design', profit: 24000, deduction: 10000, other: 10000 },
        { name: 'Product', profit: 68000, deduction: 20000, other: 12000 },
        { name: 'IT Man..', profit: 20000, deduction: 10000, other: 10000 },
        { name: 'Marke..', profit: 24000, deduction: 14000, other: 14000 },
        { name: 'Other', profit: 20000, deduction: 10000, other: 8000 },
    ];

    const payrollTrendData = [
        { name: 'Jan', value: 130000 },
        { name: 'Feb', value: 175000 },
        { name: 'Mar', value: 172000 },
        { name: 'Apr', value: 150000 },
        { name: 'Mei', value: 205000 },
        { name: 'Jun', value: 140000 },
        { name: 'Jul', value: 125000 },
        { name: 'Aug', value: 168000 },
        { name: 'Sep', value: 142000 },
        { name: 'Oct', value: 175000 },
        { name: 'Nov', value: 115000 },
        { name: 'Dec', value: 162000 },
    ];

    const payrollList = [
        { id: 97174, name: 'Noah Kenji Tanaka', role: 'UIX Designer', dept: 'Product', netPay: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 43178, name: 'Dante Haru Nakamura', role: 'HR Specialist', dept: 'Human Resource', netPay: '$120.34', status: 'Processing', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 24451, name: 'Dante Haru Nakamura', role: 'Product Manager', dept: 'Product', netPay: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=3' },
    ];

    const payslipHistoryData = [
        { id: 97174, name: 'Noah Kenji Tanaka', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 43178, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Processing', date: '-', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 43179, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Pending', date: '-', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 43180, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'On Hold', date: '-', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 43181, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Failed', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 43182, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 43183, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 43184, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=8' },
        { id: 43185, name: 'Dante Haru Nakamura', gross: '$120.34', allowance: '$120.34', incentive: '$120.34', net: '$120.34', status: 'Paid', date: '12 June 2025', avatar: 'https://i.pravatar.cc/150?u=9' },
    ];

    // --- Components ---

    const MetricCard = ({ icon, label, value, trend, trendValue, syncDate, iconBg, iconColor }) => (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                        <span className="material-symbols-rounded text-xl">{icon}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-500">{label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
                    <span className={`text-xs font-bold flex items-center ${trend === 'up' ? 'text-green-500' : 'text-rose-500'}`}>
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </span>
                </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium mt-2">Auto-synced: {syncDate}</p>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        {onMenuClick && (
                            <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                                <span className="material-symbols-rounded text-2xl">menu</span>
                            </button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Payroll</h1>
                            <p className="text-sm text-slate-500 mt-1">A central view of open roles, candidates, and pipeline progress.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 min-w-[200px]">
                                <span>01 October - 31 October 2024</span>
                                <span className="material-symbols-rounded text-base">expand_more</span>
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                            Export <span className="material-symbols-rounded text-base">download</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-xs font-bold hover:bg-[#6D28D9] shadow-sm shadow-purple-200">
                            <span className="material-symbols-rounded text-base">add</span> New Payroll
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-slate-100">
                    {['Overview', 'Payslip History'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-t-full" />}
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-6">
                {activeTab === 'Overview' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Metrics Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard
                                icon="group"
                                iconBg="bg-purple-50"
                                iconColor="text-purple-600"
                                label="Total Employee"
                                value="4.341"
                                trend="up"
                                trendValue="2.7$"
                                syncDate="November 01, 2025"
                            />
                            <MetricCard
                                icon="payments"
                                iconBg="bg-blue-50"
                                iconColor="text-blue-600"
                                label="Total Payroll"
                                value="$143,494.09"
                                trend="up"
                                trendValue="12%"
                                syncDate="November 01, 2025"
                            />
                            <MetricCard
                                icon="account_balance_wallet"
                                iconBg="bg-pink-50"
                                iconColor="text-pink-600"
                                label="Net Pay"
                                value="$143,218.09"
                                trend="up"
                                trendValue="2.0%"
                                syncDate="November 01, 2025"
                            />
                            <MetricCard
                                icon="account_balance"
                                iconBg="bg-orange-50"
                                iconColor="text-orange-600"
                                label="Taxes and Deduction"
                                value="$276.00"
                                trend="down"
                                trendValue="1.8%"
                                syncDate="November 01, 2025"
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Performance Distribution Stacked Bar */}
                            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Performance Distribution</h3>
                                        <p className="text-xs text-slate-400 font-medium">Track performance distribution KPI's</p>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400">
                                        <span className="material-symbols-rounded">more_horiz</span>
                                    </button>
                                </div>

                                <div className="flex items-center justify-end gap-4 mb-4 text-[10px] font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#A855F7]"></span> Total Profit</div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F472B6]"></span> Deduction Amount</div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FCD34D]"></span> Other</div>
                                </div>

                                <div className="h-64 mt-auto">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={performanceData} barSize={32} stackOffset="sign">
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                                tickFormatter={(value) => `$${value / 1000}k`}
                                                dx={-10}
                                            />
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                            />
                                            <Bar dataKey="other" stackId="a" fill="#FCD34D" radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="deduction" stackId="a" fill="#F472B6" radius={[0, 0, 0, 0]} />
                                            <Bar dataKey="profit" stackId="a" fill="#A855F7" radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Monthly Payroll Line Chart */}
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Monthly Payroll</h3>
                                        <p className="text-xs text-slate-400 font-medium">Track performance distribution KPI's</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">
                                        Last 11 Month <span className="material-symbols-rounded text-sm">calendar_month</span>
                                    </button>
                                </div>

                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={payrollTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                                tickFormatter={(value) => `$${value / 1000}k`}
                                                dx={-10}
                                            />
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#7C3AED"
                                                strokeWidth={2}
                                                dot={{ r: 4, fill: '#7C3AED', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                <h3 className="text-lg font-bold text-slate-800">Employees Payroll List</h3>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                        <input
                                            type="text"
                                            placeholder="Search Payroll record..."
                                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                        />
                                    </div>
                                    <div className="relative">
                                        <select className="appearance-none bg-slate-50 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                            <option>Period</option>
                                        </select>
                                        <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                                        View All <span className="material-symbols-rounded text-base">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Period</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee Name</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Position</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Pay</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment Date</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {payrollList.map((item, index) => (
                                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">November 2025</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-700">{item.name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold">ID: {item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.role}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.dept}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-800">{item.netPay}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${item.status === 'Paid'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-purple-50 text-purple-600'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Paid' ? 'bg-green-500' : 'bg-purple-500'
                                                            }`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.date}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-slate-600">
                                                        <span className="material-symbols-rounded">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}
                {activeTab === 'Payslip History' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <span className="material-symbols-rounded text-2xl">monetization_on</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">This Month's Payroll</p>
                                    <h3 className="text-2xl font-bold text-slate-800">$12.3432</h3>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                                    <span className="material-symbols-rounded text-2xl">how_to_reg</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">Employee Paid</p>
                                    <h3 className="text-2xl font-bold text-slate-800">120 <span className="text-sm text-slate-400 font-medium">/ 450</span></h3>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <span className="material-symbols-rounded text-2xl">calendar_today</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">Next Pay Date</p>
                                    <h3 className="text-lg font-bold text-slate-800">Dec 27, 2025</h3>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                    <span className="material-symbols-rounded text-2xl">cancel_presentation</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">Failed</p>
                                    <h3 className="text-2xl font-bold text-slate-800">14</h3>
                                </div>
                            </div>
                        </div>

                        {/* Filters & Table */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-center gap-4">
                                <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto">
                                    <div className="relative w-full md:w-64">
                                        <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                        <input
                                            type="text"
                                            placeholder="Search Payroll record..."
                                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                        />
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
                                        <div className="relative min-w-[120px]">
                                            <select className="appearance-none w-full bg-white pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                                <option>All Status</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                        </div>
                                        <div className="relative min-w-[100px]">
                                            <select className="appearance-none w-full bg-white pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                                <option>Period</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                        </div>
                                        <div className="relative min-w-[120px]">
                                            <select className="appearance-none w-full bg-white pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                                <option>All Dates</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 w-full md:w-auto justify-center">
                                    Export <span className="material-symbols-rounded text-base">download</span>
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Period</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee Name</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Salary</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Allowances</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Incentives</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Pay</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processed Date</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {payslipHistoryData.map((item, index) => (
                                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">Nov 2025</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-700">{item.name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold">ID: {item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.gross}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.allowance}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.incentive}</td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-800">{item.net}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${item.status === 'Paid' ? 'bg-green-50 text-green-600' :
                                                            item.status === 'Processing' ? 'bg-purple-50 text-purple-600' :
                                                                item.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                                                    item.status === 'On Hold' ? 'bg-orange-50 text-orange-600' :
                                                                        'bg-rose-50 text-rose-600'
                                                        }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Paid' ? 'bg-green-500' :
                                                                item.status === 'Processing' ? 'bg-purple-500' :
                                                                    item.status === 'Pending' ? 'bg-yellow-500' :
                                                                        item.status === 'On Hold' ? 'bg-orange-500' :
                                                                            'bg-rose-500'
                                                            }`}></span>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.date}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-slate-600">
                                                        <span className="material-symbols-rounded">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                                <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm">arrow_back</span> Prev
                                </button>
                                <button className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 text-xs font-bold flex items-center justify-center border border-purple-100">1</button>
                                <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-500 text-xs font-bold flex items-center justify-center">2</button>
                                <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-500 text-xs font-bold flex items-center justify-center">3</button>
                                <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-500 text-xs font-bold flex items-center justify-center">4</button>
                                <span className="text-slate-400 text-xs">...</span>
                                <button className="w-8 h-8 rounded-lg hover:bg-slate-50 text-slate-500 text-xs font-bold flex items-center justify-center">127</button>
                                <button className="px-3 py-1.5 rounded-lg bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] flex items-center gap-1 shadow-sm shadow-purple-200">
                                    Next <span className="material-symbols-rounded text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Payroll;
