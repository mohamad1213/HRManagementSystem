import React from 'react';

export default function EmployeeStatistic({ data, loading }) {
    if (loading || !data) {
        return (
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark flex items-center justify-center h-full min-h-[300px]">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const { total_employees, employment_types } = data;

    const stats = [
        {
            label: 'Total Full time',
            count: employment_types['Full-time'] || 0,
            color: 'bg-primary',
            textColor: 'text-primary',
            percent: total_employees ? `${Math.round((employment_types['Full-time'] || 0) / total_employees * 100)}%` : '0%',
            trend: 2.5,
            isTrendUp: true,
            id: 1
        },
        {
            label: 'Total Internship',
            count: employment_types['Internship'] || 0,
            color: 'bg-amber-400',
            textColor: 'text-amber-500',
            percent: total_employees ? `${Math.round((employment_types['Internship'] || 0) / total_employees * 100)}%` : '0%',
            trend: 5.0,
            isTrendUp: true,
            id: 2
        },
        {
            label: 'Total Freelance',
            count: employment_types['Contract'] || 0,
            color: 'bg-sky-400',
            textColor: 'text-sky-500',
            percent: total_employees ? `${Math.round((employment_types['Contract'] || 0) / total_employees * 100)}%` : '0%',
            trend: 1.2,
            isTrendUp: true,
            id: 3
        },
        {
            label: 'Total Part-time',
            count: employment_types['Part-time'] || 0,
            color: 'bg-pink-500',
            textColor: 'text-pink-500',
            percent: total_employees ? `${Math.round((employment_types['Part-time'] || 0) / total_employees * 100)}%` : '0%',
            trend: 0.5,
            isTrendUp: false,
            id: 4
        }
    ];

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Employee Statistic</h3>
                    <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark text-sm cursor-help">info</span>
                </div>
                <div className="flex gap-2">
                    <button className="border border-border-light dark:border-border-dark rounded-lg px-3 py-1.5 text-xs font-medium text-text-main-light dark:text-text-main-dark flex items-center gap-1 hover:bg-background-light dark:hover:bg-slate-700 bg-transparent">
                        Current View
                        <span className="material-symbols-rounded text-sm">expand_more</span>
                    </button>
                    <button className="border border-border-light dark:border-border-dark rounded-lg w-8 h-8 flex items-center justify-center hover:bg-background-light dark:hover:bg-slate-700 text-text-muted-light dark:text-text-muted-dark bg-transparent">
                        <span className="material-symbols-rounded text-sm">more_horiz</span>
                    </button>
                </div>
            </div>

            {/* Total Count */}
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-text-main-light dark:text-text-main-dark">{total_employees}</span>
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Employee and Staff</span>
            </div>

            {/* Custom Bar/Chart */}
            <div className="flex items-end gap-1 h-12 w-full mb-2">
                {stats.map((stat) => (
                    <div key={stat.id} className="flex items-end gap-[3px] flex-1 h-full">
                        <div className="relative flex flex-col justify-end items-start h-full w-1.5">
                            <span className="absolute -top-6 left-0 text-xs font-bold text-text-main-light dark:text-text-main-dark whitespace-nowrap">
                                {stat.percent}
                            </span>
                            <div
                                className={`w-full ${stat.color} rounded-full transition-all duration-500`}
                                style={{ height: stat.percent }}
                            ></div>
                        </div>

                        {/* Filler Bars */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 rounded-full ${stat.color} ${i % 2 === 0 ? 'h-[20%]' : 'h-[30%]'} opacity-30`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-sm ${stat.color}`}></div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">{stat.label}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">{stat.count}</span>
                                <span className="text-xs text-text-muted-light dark:text-text-muted-dark">People</span>
                            </div>

                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${stat.isTrendUp
                                    ? 'border-green-400 text-green-500 bg-green-50 dark:bg-green-900/10'
                                    : 'border-pink-300 text-pink-500 bg-pink-50 dark:bg-pink-900/10'
                                    }`}
                            >
                                {stat.trend}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
