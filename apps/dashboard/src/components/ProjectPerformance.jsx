import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function ProjectPerformance() {
    // Data: each object represents a row. 'start' is the offset (transparent), 'duration' is the visible bar.
    // Normalized to 12 months.
    const projectData = [
        { id: 1, start: 0.5, duration: 1.5, name: 'Project Alpha' },
        { id: 2, start: 1.5, duration: 1.2, name: 'Project Beta' },
        { id: 3, start: 3, duration: 1.5, name: 'Project Gamma' },
        { id: 4, start: 4, duration: 1.0, name: 'Project Delta' },
        { id: 5, start: 5, duration: 1.8, name: 'Project Epsilon' },
        { id: 6, start: 6.5, duration: 1.2, name: 'Project Zeta' },
        { id: 7, start: 7.5, duration: 1.5, name: 'Project Eta' },
        { id: 8, start: 9, duration: 1.2, name: 'Project Theta' },
        { id: 9, start: 10, duration: 1.8, name: 'Project Iota' },
        { id: 10, start: 2, duration: 1.2, name: 'Project Kappa' },
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[1].payload; // The second bar (visible one) contains the full payload
            return (
                <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg shadow-lg border border-border-light dark:border-border-dark text-xs">
                    <div className="font-bold text-text-main-light dark:text-text-main-dark mb-1">{data.name}</div>
                    <div className="text-text-muted-light dark:text-text-muted-dark">
                        Duration: {data.duration} months
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-primary font-medium">In Progress</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Project Performance</h3>
                    <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark text-sm cursor-help">info</span>
                </div>
                <div className="flex gap-2">
                    <button className="border border-border-light dark:border-border-dark rounded-lg px-2 py-1 text-xs font-medium text-text-main-light dark:text-text-main-dark flex items-center gap-1 hover:bg-background-light dark:hover:bg-slate-700">
                        Monthly View
                        <span className="material-symbols-rounded text-sm">expand_more</span>
                    </button>
                    <button className="border border-border-light dark:border-border-dark rounded-lg w-7 h-7 flex items-center justify-center hover:bg-background-light dark:hover:bg-slate-700 text-text-muted-light dark:text-text-muted-dark">
                        <span className="material-symbols-rounded text-sm">more_horiz</span>
                    </button>
                </div>
            </div>

            {/* Gantt Chart via Recharts */}
            <div className="relative h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={projectData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        barSize={12}
                    >
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            type="number"
                            domain={[0, 12]}
                            ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                            tickFormatter={(val) => months[val] || ''}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis type="category" dataKey="id" hide />
                        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                        <Bar dataKey="start" stackId="a" fill="transparent" />
                        <Bar dataKey="duration" stackId="a" radius={[4, 4, 4, 4]}>
                            {projectData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#a855f7" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
