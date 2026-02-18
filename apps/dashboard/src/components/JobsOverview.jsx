import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function JobsOverview() {
    const jobs = [
        { color: 'bg-primary', hex: '#a855f7', label: 'Active jobs', value: 100 },
        { color: 'bg-amber-300', hex: '#fcd34d', label: 'In interview jobs', value: 50 },
        { color: 'bg-secondary', hex: '#ec4899', label: 'Finish Job', value: 30 },
        { color: 'bg-orange-400', hex: '#fb923c', label: 'Failed', value: 10 },
    ];

    const totalJobs = jobs.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Jobs Overview</h3>
                    <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark text-sm cursor-help">info</span>
                </div>
                <div className="flex gap-2">
                    <button className="border border-border-light dark:border-border-dark rounded-lg px-2 py-1 text-[10px] font-medium text-text-main-light dark:text-text-main-dark flex items-center gap-1 hover:bg-background-light dark:hover:bg-slate-700">
                        Monthly
                        <span className="material-symbols-rounded text-xs">expand_more</span>
                    </button>
                    <button className="border border-border-light dark:border-border-dark rounded-lg w-6 h-6 flex items-center justify-center hover:bg-background-light dark:hover:bg-slate-700 text-text-muted-light dark:text-text-muted-dark">
                        <span className="material-symbols-rounded text-xs">more_horiz</span>
                    </button>
                </div>
            </div>

            {/* Gauge Chart (Semi-Circle) */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[180px]">
                <div className="relative w-full h-[160px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={jobs}
                                cx="50%"
                                cy="100%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={80}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="value"
                                cornerRadius={4}
                            >
                                {jobs.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.hex} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text (Adjusted position for semi-circle) */}
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-2 pointer-events-none">
                        <div className="text-3xl font-bold text-text-main-light dark:text-text-main-dark leading-none">{totalJobs}</div>
                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">Total Jobs</div>
                    </div>
                </div>

                {/* Legend */}
                <div className="w-full space-y-2 mt-4 grid grid-cols-1">
                    {jobs.map((job) => (
                        <div key={job.label} className="flex justify-between items-center text-xs group cursor-pointer hover:bg-background-light dark:hover:bg-slate-800 p-1 rounded-lg transition-colors">
                            <div className="flex items-center gap-2">
                                <div className={`w-1 h-3 rounded-full ${job.color}`}></div>
                                <span className="text-text-muted-light dark:text-text-muted-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">{job.label}</span>
                            </div>
                            <span className="font-bold text-text-main-light dark:text-text-main-dark">{job.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
