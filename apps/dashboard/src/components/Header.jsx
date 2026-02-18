export default function Header({ onMenuClick }) {
    return (
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
                    <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Dashboard</h1>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Track Access And Improve Your Performance</p>
                </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-text-main-light dark:text-text-main-dark shadow-sm">
                    <span>01 October - 31 October 2024</span>
                    <span className="material-symbols-rounded text-lg text-text-muted-light dark:text-text-muted-dark">calendar_today</span>
                </div>
                <button className="bg-primary hover:bg-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-purple-500/20 transition-all">
                    Export
                    <span className="material-symbols-rounded text-lg">download</span>
                </button>
            </div>
        </header>
    );
}
