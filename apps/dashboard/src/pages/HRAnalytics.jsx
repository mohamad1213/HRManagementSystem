import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getDashboardAnalytics } from '../services/analytics';

export default function HRAnalytics({ onMenuClick }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [analyticsData, setAnalyticsData] = useState({
        metrics: [],
        movement_trend: [],
        attendance_trend: [],
        department_composition: [],
        department_progress: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getDashboardAnalytics();
                setAnalyticsData(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
                setError("Failed to load analytics data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const {
        metrics,
        movement_trend: movementData,
        attendance_trend: attendanceTrendData,
        department_composition: departmentComposition,
        department_progress: deptProgressData
    } = analyticsData;



    // --- Handlers ---

    const handleExport = () => {
        if (loading) return;

        // Prepare CSV Content
        let csvContent = "data:text/csv;charset=utf-8,";

        // 1. Employee Movement Trend
        csvContent += "Employee Movement Trend\n";
        csvContent += "Month,New Hires,Departure\n";
        movementData.forEach(item => {
            csvContent += `${item.name},${item.newHires},${item.departure}\n`;
        });
        csvContent += "\n";

        // 2. Attendance Trend
        csvContent += "Attendance Trend\n";
        csvContent += "Month,On Time,Late\n";
        attendanceTrendData.forEach(item => {
            csvContent += `${item.name},${item.onTime},${item.late}\n`;
        });
        csvContent += "\n";

        // 3. Department Composition
        csvContent += "Department Composition\n";
        csvContent += "Department,Value\n";
        departmentComposition.forEach(item => {
            csvContent += `${item.name},${item.value}\n`;
        });

        // Create download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "hr-analytics-report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Components ---


    const MetricCard = ({ label, value, icon, color }) => (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark transition-all hover:shadow-md">
            <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                    <span className="material-symbols-rounded">{icon}</span>
                </div>
                <div>
                    <div className="text-sm font-semibold text-text-muted-light dark:text-text-muted-dark">{label}</div>
                    <div className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mt-1">{value}</div>
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-success">
                <span className="material-symbols-rounded text-sm">arrow_upward</span>
                <span>+4.2%</span>
                <span className="text-text-muted-light dark:text-text-muted-dark font-normal ml-1">From last quarter</span>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-text-muted-light dark:text-text-muted-dark font-medium">Loading analytics data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-100 dark:border-red-900/30 text-center max-w-md">
                    <span className="material-symbols-rounded text-red-500 text-5xl mb-4">error</span>
                    <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Oops!</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    {/* Hamburger menu - mobile only */}
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 -ml-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-background-light dark:hover:bg-slate-800 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-rounded text-2xl">menu</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">HR Analytic</h1>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Track Access And Improve Your Performance</p>
                    </div>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-purple-500/30"
                >
                    Export
                    <span className="material-symbols-rounded text-lg">download</span>
                </button>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {metrics.map((metric, idx) => (
                    <MetricCard key={idx} {...metric} />
                ))}
            </div>

            {/* Row 2: Movement Trend + Dept List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Employee Movement Trend */}
                <div className="lg:col-span-8 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-[12px] text-text-main-light dark:text-text-main-dark">Employee Movement Trend</h3>
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                <span className="text-text-muted-light dark:text-text-muted-dark">New Hires</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                                <span className="text-text-muted-light dark:text-text-muted-dark">Departure</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={movementData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Line type="monotone" dataKey="newHires" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                                <Line type="monotone" dataKey="departure" stroke="#ec4899" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Department Composition (Bars) */}
                <div className="lg:col-span-4 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Department Composition</h3>
                        <button className="text-text-muted-light dark:text-text-muted-dark hover:text-primary">
                            <span className="material-symbols-rounded">more_horiz</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
                        {deptProgressData.map((dept, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-xs font-semibold mb-1.5">
                                    <span className="text-text-main-light dark:text-text-main-dark">{dept.name}</span>
                                    <span className="text-text-muted-light dark:text-text-muted-dark">{dept.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                    <div className={`h-2 rounded-full ${dept.color}`} style={{ width: `${dept.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 3: Donut + Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
                {/* Department Composition (Donut) */}
                <div className="lg:col-span-5 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col h-[380px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Department Composition</h3>
                        <button className="text-text-muted-light dark:text-text-muted-dark hover:text-primary">
                            <span className="material-symbols-rounded">more_horiz</span>
                        </button>
                    </div>
                    <div className="flex-1 flex flex-row items-center">
                        {/* Donut Chart */}
                        <div className="relative w-48 h-48 flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={departmentComposition}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        cornerRadius={5}
                                        input={departmentComposition}
                                    >
                                        {departmentComposition.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <div className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">04</div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">Department</div>
                            </div>
                        </div>

                        {/* Custom Legend */}
                        <div className="flex flex-col gap-3 ml-4 flex-1">
                            {departmentComposition.map((entry) => (
                                <div key={entry.name} className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                                        <span className="text-xs text-text-muted-light dark:text-text-muted-dark font-medium">{entry.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark pl-4.5">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Attendance Trend */}
                <div className="lg:col-span-7 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col h-[380px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Attendance Trend</h3>
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                <span className="text-text-muted-light dark:text-text-muted-dark">On Time</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                                <span className="text-text-muted-light dark:text-text-muted-dark">Late</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="onTime" stroke="#a855f7" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                                <Line type="monotone" dataKey="late" stroke="#ec4899" strokeWidth={3} strokeDasharray="5 5" dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </main>
    );
}
