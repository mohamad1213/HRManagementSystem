import React from 'react';

export default function EmployeeStatistic() {
    const stats = [
        {
            label: 'Total Full time',
            count: 487,
            color: 'bg-primary', // Purple
            textColor: 'text-primary',
            percent: '25%',
            trend: 12.4,
            isTrendUp: true,
            id: 1
        },
        {
            label: 'Total Internship',
            count: 15,
            color: 'bg-amber-400', // Yellow
            textColor: 'text-amber-500',
            percent: '45%',
            trend: 12.4,
            isTrendUp: true,
            id: 2
        },
        {
            label: 'Total Freelance',
            count: 34,
            color: 'bg-sky-400', // Blue
            textColor: 'text-sky-500',
            percent: '20%',
            trend: 12.4,
            isTrendUp: true,
            id: 3
        },
        {
            label: 'Total Probationary',
            count: 12,
            color: 'bg-pink-500', // Pink
            textColor: 'text-pink-500',
            percent: '34%',
            trend: 12.4,
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
                        Monthly View
                        <span className="material-symbols-rounded text-sm">expand_more</span>
                    </button>
                    <button className="border border-border-light dark:border-border-dark rounded-lg w-8 h-8 flex items-center justify-center hover:bg-background-light dark:hover:bg-slate-700 text-text-muted-light dark:text-text-muted-dark bg-transparent">
                        <span className="material-symbols-rounded text-sm">more_horiz</span>
                    </button>
                </div>
            </div>

            {/* Total Count */}
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-text-main-light dark:text-text-main-dark">487</span>
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Employee and Staff</span>
            </div>

            {/* Custom Bar/Barcode Chart */}
            <div className="flex items-end gap-1 h-12 w-full mb-2">
                {stats.map((stat, index) => (
                    <div key={stat.id} className="flex items-end gap-[3px] flex-1 h-full">
                        {/* Section Marker (Tall Bar with Label) */}
                        <div className="relative flex flex-col justify-end items-start h-full w-1.5">
                            <span className="absolute -top-6 left-0 text-xs font-bold text-text-main-light dark:text-text-main-dark whitespace-nowrap">
                                {stat.percent}
                            </span>
                            <div className={`w-full h-full ${stat.color} rounded-full`}></div>
                        </div>

                        {/* Filler Bars (Visual effect) */}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 rounded-full ${stat.color} ${i % 2 === 0 ? 'h-[40%]' : 'h-[60%]'} opacity-80`}
                            ></div>
                        ))}
                        {/* Spacer at the end of section to separate from next color */}
                        <div className="w-2"></div>
                    </div>
                ))}
            </div>
            {/* Stats Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between">
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-sm ${stat.color}`}></div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark font-medium">{stat.label}</span>
                            </div>
                            <span className="material-symbols-rounded text-lg text-text-muted-light dark:text-text-muted-dark cursor-pointer">more_horiz</span>
                        </div>

                        {/* Card Body & Footer */}
                        <div className="flex justify-between items-end">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">{stat.count}</span>
                                <span className="text-xs text-text-muted-light dark:text-text-muted-dark">People</span>
                            </div>

                            {/* Trend Badge */}
                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${stat.isTrendUp
                                    ? 'border-green-400 text-green-500 bg-green-50 dark:bg-green-900/10'
                                    : 'border-pink-300 text-pink-500 bg-pink-50 dark:bg-pink-900/10'
                                    }`}
                            >
                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${stat.isTrendUp ? 'border-green-500' : 'border-pink-500'
                                    }`}>
                                    <span className="material-symbols-rounded text-[10px]" style={{ fontSize: '10px' }}>
                                        {stat.isTrendUp ? 'arrow_upward' : 'arrow_downward'}
                                    </span>
                                </div>
                                {stat.trend}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
