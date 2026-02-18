import React, { useState } from 'react';
import {
    PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

const EmployeeDetail = ({ onBack }) => {
    const detailChartData = [
        { name: 'Jan', score: 8.5, avg: 8.1 },
        { name: 'Feb', score: 9.1, avg: 8.4 },
        { name: 'Mar', score: 8.8, avg: 8.2 },
        { name: 'Apr', score: 9.5, avg: 8.6 },
        { name: 'Mei', score: 8.6, avg: 8.1 },
        { name: 'Jun', score: 9.0, avg: 8.3 },
        { name: 'Jul', score: 9.2, avg: 8.4 },
        { name: 'Aug', score: 8.4, avg: 8.0 },
        { name: 'Sep', score: 8.9, avg: 8.2 },
    ];

    const kpiCards = [
        { label: 'Communication', score: '8.4', icon: 'forum', color: 'text-purple-600', bg: 'bg-purple-50', bar: 'bg-purple-500' },
        { label: 'Leadership', score: '8.4', icon: 'military_tech', color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500' },
        { label: 'Problem-Solving', score: '8.4', icon: 'lightbulb', color: 'text-yellow-600', bg: 'bg-yellow-50', bar: 'bg-yellow-500' },
        { label: 'Execution', score: '8.4', icon: 'rocket_launch', color: 'text-orange-600', bg: 'bg-orange-50', bar: 'bg-orange-500' },
        { label: 'Collaboration', score: '4.9', icon: 'handshake', color: 'text-rose-600', bg: 'bg-rose-50', bar: 'bg-rose-500' },
    ];

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Employee Performance Detail</h1>
                        <p className="text-xs text-slate-500">Comprehensive performance analysis and evaluation history</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 pl-12">
                    <span className="hover:text-purple-600 cursor-pointer transition-colors" onClick={onBack}>Performance</span>
                    <span>/</span>
                    <span className="hover:text-purple-600 cursor-pointer transition-colors" onClick={onBack}>Team</span>
                    <span>/</span>
                    <span className="text-slate-600">Employee Performance Detail</span>
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-6">
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full xl:w-auto">
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=30" alt="Profile" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                                <span className="material-symbols-rounded text-sm font-bold">check</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-1">Sophia Aiko Rose</h2>
                            <p className="text-sm font-bold text-slate-500 mb-3">Sr. UX Researcher & Writer</p>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                <span className="flex items-center gap-1"><span className="material-symbols-rounded text-base">business</span> Product Department</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-rounded text-base">calendar_month</span> Joined Feb 2019</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-rounded text-base">location_on</span> Bandung</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm">star</span> High Performer
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-600 text-[10px] font-bold flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm">timer</span> Fulltime
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-600 text-[10px] font-bold flex items-center gap-1">
                                    <span className="material-symbols-rounded text-sm">history</span> 8.7 years tenure
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-full xl:w-auto border-t xl:border-t-0 border-slate-100 pt-6 xl:pt-0">
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-4xl font-bold text-slate-800">4.9</div>
                                <div className="text-[10px] font-bold text-slate-400 mt-1">Overall Performance Rating</div>
                                <div className="flex gap-0.5 mt-1 justify-end text-yellow-400 text-sm">
                                    {'★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                                    <span className="text-slate-300">★</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-bold hover:bg-[#6D28D9] shadow-sm shadow-purple-200 transition-all">
                                Start evaluation <span className="material-symbols-rounded text-base">add_circle</span>
                            </button>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-rounded text-base">forum</span> Give feedback
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-rounded">more_horiz</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Personal KPI Overview Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Personal KPI Overview</h3>
                            <p className="text-xs text-slate-400 mt-1">Monthly performance trends and category breakdown</p>
                        </div>
                        <div className="relative">
                            <select className="appearance-none bg-slate-50 pl-4 pr-10 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                <option>Last 12 months</option>
                            </select>
                            <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={detailChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} domain={[7, 10]} dx={-10} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
                                />
                                <Line type="monotone" dataKey="score" stroke="#A855F7" strokeWidth={2} dot={{ r: 4, fill: '#A855F7', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                                <Line type="monotone" dataKey="avg" stroke="#F472B6" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* KPI Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {kpiCards.map((card, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-3">
                                <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                                    <span className="material-symbols-rounded text-lg">{card.icon}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${card.color === 'text-rose-600' ? 'bg-rose-50 text-rose-600' : 'bg-green-50 text-green-600'}`}>
                                    <span className="material-symbols-rounded text-[10px] mr-0.5">
                                        {card.color === 'text-rose-600' ? 'arrow_downward' : 'arrow_upward'}
                                    </span>
                                    21%
                                </span>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 mb-1">{card.label}</h4>
                                <div className="flex items-end gap-1 mb-3">
                                    <span className="text-2xl font-bold text-slate-800">{card.score}</span>
                                    <span className="text-[10px] font-semibold text-slate-400 mb-1">/10</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${card.bar}`} style={{ width: `${(parseFloat(card.score) / 10) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <span className="material-symbols-rounded text-xl">thumb_up</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800">Personal KPI Overview</h3>
                                <p className="text-xs text-slate-400">Monthly performance trends and category breakdown</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Creative Problem Solving', 'Attention to Detail', 'User-Centric Design', 'Team Collaboration', 'Proactive Communication', 'Mentorship Skills'].map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs font-bold flex items-center gap-1.5 border border-green-100">
                                    <span className="material-symbols-rounded text-sm">star</span> {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                <span className="material-symbols-rounded text-xl">trending_up</span>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-800">Growth Areas</h3>
                                <p className="text-xs text-slate-400">Opportunities for development</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Technical Documentation', 'Public Speaking', 'Time Management', 'Data Analysis Skills', 'Strategic Planning', 'Critical System'].map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold flex items-center gap-1.5 border border-orange-100">
                                    <span className="material-symbols-rounded text-sm">trending_up</span> {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Performance = ({ onMenuClick }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [view, setView] = useState('list');

    if (view === 'detail') {
        return <EmployeeDetail onBack={() => setView('list')} />;
    }

    // --- Mock Data ---

    const donutData = [
        { name: 'Excellent', value: 28, color: '#A855F7' }, // Purple-500
        { name: 'Good', value: 45, color: '#F97316' },      // Orange-500
        { name: 'Average', value: 18, color: '#E2E8F0' },   // Slate-200
        { name: 'Bad', value: 9, color: '#F43F5E' },        // Rose-500
    ];

    const lineChartData = [
        { name: 'Jan', val1: 8.2, val2: 7.8, val3: 6.5, val4: 5.0 },
        { name: 'Feb', val1: 8.5, val2: 8.0, val3: 7.0, val4: 5.5 },
        { name: 'Mar', val1: 8.4, val2: 8.2, val3: 6.8, val4: 6.0 },
        { name: 'Apr', val1: 8.8, val2: 7.9, val3: 7.2, val4: 5.8 },
        { name: 'May', val1: 8.6, val2: 8.3, val3: 7.5, val4: 6.2 },
        { name: 'Jun', val1: 9.0, val2: 8.5, val3: 7.8, val4: 6.5 },
    ];

    const barChartData = [
        { name: 'Design', score: 380, prev: 280 },
    ];

    // --- Components ---

    const MetricCard = ({ icon, label, value, subtext, trend, trendValue, iconColor, iconBg }) => (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <span className="material-symbols-rounded text-xl">{icon}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-600'}`}>
                    {trend === 'up' ? '↗' : '↘'} {trendValue}
                </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{value}</h3>
            <p className="text-xs font-bold text-slate-400 mb-2">{label}</p>
            <p className="text-xs text-slate-400 font-medium">{subtext}</p>
        </div>
    );

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-6 py-5 sticky top-0 z-30">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {onMenuClick && (
                            <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                                <span className="material-symbols-rounded text-2xl">menu</span>
                            </button>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Performance</h1>
                            <p className="text-sm text-slate-500 mt-1">A central view of open roles, candidates, and pipeline progress.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50">
                            <span className="material-symbols-rounded">notifications</span>
                        </button>
                        <div className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAorVehEOlkGaIxdayVc8KT5Ti-sQCLUIWWwWOgY7kxVJx6tibcHBX9E9m6Js6pY4JOYRzZA2y9nAMdau-sBtJNm_-uL6BWmNX7XO00GZvxu69BzvuEtH2M4s0hZmoGCRZTBVi5p8374vDeJQBKEf47ay2Du8MtVioKmeyBPTy8MrHDB26lufBcxFsnEwkvX6Xm-hGw6dfxL7slcsf6lG3qavHYlj7Lw2LHKS7abk3y64LAxYF71K1WFF2zJjYoha88brqc6dnc2wUv" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-slate-100">
                    {['Overview', 'Team'].map((tab) => (
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
                {/* ==================== OVERVIEW TAB ==================== */}
                {activeTab === 'Overview' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- Metrics Row --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard
                                icon="person"
                                iconBg="bg-rose-100"
                                iconColor="text-rose-500"
                                label="Overall Performance"
                                value={<>8.4<span className="text-lg text-slate-400 font-normal">/10</span></>}
                                subtext="Company-wide average score"
                                trend="up"
                                trendValue="12.4%"
                            />
                            <MetricCard
                                icon="checklist"
                                iconBg="bg-orange-100"
                                iconColor="text-orange-500"
                                label="Completion Rate"
                                value="87%"
                                subtext="Evaluations completed this quarter"
                                trend="down"
                                trendValue="21%"
                            />
                            <MetricCard
                                icon="person_add"
                                iconBg="bg-green-100"
                                iconColor="text-green-500"
                                label="Top Performers"
                                value="7.4"
                                subtext="Employees rated 9+ this month"
                                trend="up"
                                trendValue="12+"
                            />
                            <MetricCard
                                icon="schedule"
                                iconBg="bg-blue-100"
                                iconColor="text-blue-500"
                                label="Pending Reviews"
                                value="24"
                                subtext="Reviews awaiting manager approval"
                                trend="down"
                                trendValue="24"
                            />
                        </div>

                        {/* --- Row 2: Distribution & Alerts --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Performance Distribution (Donut) */}
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Performance Distribution</h3>
                                <p className="text-xs text-slate-400 mb-6 font-medium">Track performance distribution KPI's</p>

                                <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
                                    {/* Donut Chart */}
                                    <div className="relative w-48 h-48 shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={donutData}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {donutData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-3xl font-bold text-slate-800">127%</span>
                                            <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Monthly Score</span>
                                        </div>
                                    </div>

                                    {/* Legend / Stats */}
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full">
                                        {donutData.map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-3 h-3 rounded bg-current" style={{ color: item.color }}></div>
                                                    <span className="text-xs font-bold text-slate-500">{item.name} {i === 0 ? '(9-10)' : i === 1 ? '(7-8)' : i === 2 ? '(5-6)' : '<5'}</span>
                                                </div>
                                                <p className="text-xl font-bold text-slate-700 ml-5">{item.value}%</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Critical Alerts */}
                            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Critical Alerts</h3>
                                <p className="text-xs text-slate-400 mb-6 font-medium">Track performance distribution KPI's</p>

                                <div className="space-y-4">
                                    {[
                                        {
                                            title: '12 Underperforming Employees',
                                            sub: 'Track performance distribution KPI\'s',
                                            action: 'Need Review',
                                            icon: 'error',
                                            borderClass: 'border-rose-100',
                                            bgClass: 'bg-rose-50/30',
                                            iconBgClass: 'bg-rose-100',
                                            iconTextClass: 'text-rose-500',
                                            textClass: 'text-rose-500'
                                        },
                                        {
                                            title: '8 Overdue Evaluations',
                                            sub: 'Scores under 5.0 need immediate review',
                                            action: 'Need Review',
                                            icon: 'schedule',
                                            borderClass: 'border-orange-100',
                                            bgClass: 'bg-orange-50/30',
                                            iconBgClass: 'bg-orange-100',
                                            iconTextClass: 'text-orange-500',
                                            textClass: 'text-orange-500'
                                        },
                                        {
                                            title: 'Q2 Evaluation Cycle Starting',
                                            sub: 'Set evaluation template & notify managers',
                                            action: 'Configure',
                                            icon: 'schedule',
                                            borderClass: 'border-purple-100',
                                            bgClass: 'bg-purple-50/30',
                                            iconBgClass: 'bg-purple-100',
                                            iconTextClass: 'text-purple-500',
                                            textClass: 'text-purple-500'
                                        },
                                    ].map((alert, i) => (
                                        <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border ${alert.borderClass} ${alert.bgClass}`}>
                                            <div className={`w-8 h-8 rounded-full ${alert.iconBgClass} ${alert.iconTextClass} flex items-center justify-center shrink-0`}>
                                                <span className="material-symbols-rounded text-sm font-bold">{alert.icon}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-slate-700">{alert.title}</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">{alert.sub}</p>
                                            </div>
                                            <button className={`text-xs font-bold hover:underline ${alert.textClass}`}>
                                                {alert.action}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- Filters Row --- */}
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-4">
                            <div className="flex gap-3">
                                <div className="relative">
                                    <select className="appearance-none bg-slate-50 pl-4 pr-10 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                        <option>Q1 2025</option>
                                    </select>
                                    <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                </div>
                                <div className="relative">
                                    <select className="appearance-none bg-slate-50 pl-4 pr-10 py-2 rounded-lg text-sm font-bold text-slate-600 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                        <option>All Departments</option>
                                    </select>
                                    <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
                                <div className="bg-slate-50 p-1 rounded-lg flex border border-slate-200">
                                    <button className="px-4 py-1.5 rounded-md text-xs font-bold bg-white text-purple-600 shadow-sm">Team</button>
                                    <button className="px-4 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:text-slate-700">Individual</button>
                                    <button className="px-4 py-1.5 rounded-md text-xs font-bold text-slate-500 hover:text-slate-700">Department</button>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                                    <span className="material-symbols-rounded text-base">download</span> Export report
                                </button>
                            </div>
                        </div>

                        {/* --- Charts Row --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Performance Distribution Line Chart */}
                            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Performance Distribution</h3>
                                        <p className="text-xs text-slate-400 font-medium">Track performance distribution KPI's</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <span className="material-symbols-rounded">more_horiz</span>
                                    </button>
                                </div>

                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={lineChartData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                                dx={-10}
                                                domain={[0, 10]}
                                                ticks={[8.5, 9, 9.5, 10]} // Simplification for demo
                                            />
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Line type="monotone" dataKey="val1" stroke="#A855F7" strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="val2" stroke="#F43F5E" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                            <Line type="monotone" dataKey="val3" stroke="#F97316" strokeWidth={2} dot={false} strokeDasharray="3 3" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Fake Y-Axis labels closer to image look */}
                                <div className="absolute left-6 top-24 bottom-10 flex flex-col justify-between text-[10px] text-slate-400 font-bold pointer-events-none">
                                    <span>10</span>
                                    <span>9.5</span>
                                    <span>9</span>
                                    <span>8.5</span>
                                    <span>8</span>
                                </div>
                            </div>

                            {/* Team Performance Comparison (Bar) */}
                            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Team Performance Comparison</h3>
                                        <p className="text-xs text-slate-400 font-medium">Average scores by department</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <span className="material-symbols-rounded">more_horiz</span>
                                    </button>
                                </div>

                                <div className="h-64 flex items-end justify-center gap-8 pb-4">
                                    {/* Custom Bar Visuals since Recharts Bar is a bit complex to style exactly like mockup with just one data point visible clearly */}
                                    <div className="w-16 bg-sky-400 rounded-t-xl h-[80%] hover:opacity-90 transition-opacity relative group">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">380</div>
                                    </div>
                                    <div className="w-16 bg-rose-400 rounded-t-xl h-[45%] hover:opacity-90 transition-opacity relative group">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">220</div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 font-bold px-12">
                                    <span>200</span>
                                    <span>300</span>
                                    <span>400</span>
                                </div>
                                {/* Overlay Y Axis labels for effect */}
                                <div className="absolute left-6 top-24 bottom-16 flex flex-col justify-between text-[10px] text-slate-400 font-bold pointer-events-none">
                                    <span>400</span>
                                    <span>300</span>
                                    <span>200</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== TEAM TAB ==================== */}
                {activeTab === 'Team' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- Team Header Filters --- */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 flex flex-wrap items-center gap-2">
                                    Development Team
                                    <span className="text-xs font-normal text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                                        <span className="material-symbols-rounded text-sm text-purple-500">person</span> Team Leader: Michael Chen
                                    </span>
                                </h2>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline-block">Choose Department</span>
                                    <div className="relative flex-1 sm:flex-none">
                                        <select className="w-full sm:w-auto appearance-none bg-white text-slate-600 border border-slate-200 rounded-lg text-xs font-bold pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                            <option>Development Team</option>
                                        </select>
                                        <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-1 sm:flex-none w-full sm:w-auto">
                                    <div className="relative flex-1 sm:flex-none">
                                        <select className="w-full sm:w-auto appearance-none bg-white text-slate-600 border border-slate-200 rounded-lg text-xs font-bold pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                                            <option>Monthly</option>
                                        </select>
                                        <span className="material-symbols-rounded absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                                    </div>
                                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">
                                        Export <span className="material-symbols-rounded text-base">download</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- Team Metrics --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-xl">person</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full border border-purple-200 text-purple-600 text-[10px] font-bold">Active</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">24</h3>
                                <p className="text-xs text-slate-400">Total Members</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-xl">analytics</span>
                                    </div>
                                    <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                        <span className="material-symbols-rounded text-xs">arrow_upward</span> 21%
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">8.4<span className="text-sm text-slate-400 font-normal">/10</span></h3>
                                <p className="text-xs text-slate-400">Avg Performance Score</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-xl">checklist_rtl</span>
                                    </div>
                                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-purple-100">On Track</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">7.4</h3>
                                <p className="text-xs text-slate-400">Evaluation Completion</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center">
                                        <span className="material-symbols-rounded text-xl">calendar_month</span>
                                    </div>
                                    <span className="bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-100">Q4 2024</span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-1">Qr. 4</h3>
                                <p className="text-xs text-slate-400">Last Review Period</p>
                            </div>
                        </div>

                        {/* --- Charts --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Distribution Donut */}
                            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Performance Distribution</h3>
                                <p className="text-xs text-slate-400 mb-6 font-medium">Track performance distribution KPI's</p>

                                <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
                                    <div className="relative w-40 h-40 shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={donutData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                                                    {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-2xl font-bold text-slate-800">127%</span>
                                            <span className="text-[9px] uppercase font-bold text-slate-400 mt-1">Monthly Growth</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        {donutData.map((item, i) => (
                                            <div key={i}>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-2.5 h-2.5 rounded bg-current" style={{ color: item.color }}></div>
                                                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{item.name} {i === 0 ? '(9-10)' : i === 1 ? '(7-8)' : i === 2 ? '(5-6)' : '<5'}</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-700 ml-4.5">{item.value}%</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* KPI Trend Line Chart */}
                            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                                <div className="flex justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-1">Team KPI Trend</h3>
                                        <p className="text-xs text-slate-400 font-medium">Monthly performance overview</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600">
                                        <span className="material-symbols-rounded">more_horiz</span>
                                    </button>
                                </div>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={[
                                            { name: 'Jan', v1: 8.2, v2: 7.5 }, { name: 'Feb', v1: 8.8, v2: 7.8 }, { name: 'Mar', v1: 8.7, v2: 7.7 },
                                            { name: 'Apr', v1: 9.1, v2: 7.9 }, { name: 'Mei', v1: 8.4, v2: 7.4 }, { name: 'Jun', v1: 8.2, v2: 7.3 },
                                            { name: 'Jul', v1: 8.6, v2: 7.6 }, { name: 'Aug', v1: 9.0, v2: 7.8 }, { name: 'Sep', v1: 8.5, v2: 7.5 }
                                        ]}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} dy={10} />
                                            <YAxis hide domain={[7, 10]} />
                                            <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                                            <Line type="monotone" dataKey="v1" stroke="#A855F7" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                                            <Line type="monotone" dataKey="v2" stroke="#F472B6" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="absolute left-4 top-20 bottom-12 flex flex-col justify-between text-[10px] text-slate-400 font-bold pointer-events-none">
                                    <span>10</span>
                                    <span>9.5</span>
                                    <span>9</span>
                                    <span>8.5</span>
                                    <span>8</span>
                                    <span>7.5</span>
                                    <span>7</span>
                                </div>
                            </div>
                        </div>

                        {/* --- Lists Row --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                            {/* Top Performers */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Top Performers</h3>
                                        <p className="text-xs text-slate-400 mt-1">Latest performance reviews and rating changes</p>
                                    </div>
                                    <button className="text-xs font-bold text-[#7C3AED] hover:underline">See all</button>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2].map((_, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setView('detail')}
                                            className="flex items-center gap-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                                        >
                                            <img src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-10 h-10 rounded-lg object-cover" alt="User" />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-slate-700 group-hover:text-purple-600 transition-colors">Sophie Hana Li</h4>
                                                <p className="text-xs text-slate-400">Sr. Software Engineer</p>
                                                <div className="flex flex-wrap gap-2 mt-1.5">
                                                    <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">✓ Approved</span>
                                                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold">✓ Innovation</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-slate-800">9.6</p>
                                                <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full mt-1">
                                                    <span className="material-symbols-rounded text-xs">arrow_upward</span> 12.4%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Needs Attention */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Needs Attention</h3>
                                        <p className="text-xs text-slate-400 mt-1">Employees needing corrective action or closer monitoring</p>
                                    </div>
                                    <button className="text-xs font-bold text-[#7C3AED] hover:underline">See all</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { score: 6.4, name: 'Mark Evans', tags: ['Management', 'Quality'] },
                                        { score: 4.7, name: 'Sarah Connor', tags: ['Initiative', 'Deadlines'] }
                                    ].map((user, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setView('detail')}
                                            className="flex items-center gap-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                                        >
                                            <img src={`https://i.pravatar.cc/150?u=${i + 30}`} className="w-10 h-10 rounded-lg object-cover" alt="User" />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-slate-700">{user.name}</h4>
                                                <p className="text-xs text-slate-400">Sr. Software Engineer</p>
                                                <div className="flex flex-wrap gap-2 mt-1.5">
                                                    {user.tags.map(tag => (
                                                        <span key={tag} className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">✓ {tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-slate-800">{user.score}</p>
                                                <span className="flex items-center justify-end gap-0.5 text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full mt-1">
                                                    <span className="material-symbols-rounded text-xs">arrow_downward</span> 12.4%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Performance;
