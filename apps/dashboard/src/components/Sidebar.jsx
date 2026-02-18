import { useState } from 'react';

// Nav Item Component
const NavItem = ({ icon, label, active, isCollapsed, onClick }) => (
    <li>
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick();
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group relative ${active
                ? 'bg-purple-50 dark:bg-primary/10 text-primary font-medium'
                : 'text-text-muted-light dark:text-text-muted-dark hover:bg-background-light dark:hover:bg-slate-800 hover:text-text-main-light dark:hover:text-text-main-dark'
                } ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : ''}`}
            title={isCollapsed ? label : ''}
        >
            <span className="material-symbols-rounded text-xl flex-shrink-0">{icon}</span>

            {/* Label (Hidden when collapsed) */}
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>}

            {/* Tooltip on hover when collapsed */}
            {isCollapsed && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    {label}
                </div>
            )}
        </a>
    </li>
);

// Nav Group Component
const NavGroup = ({ title, items, isCollapsed, activePage, onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={isCollapsed ? 'mb-4 border-t border-border-light dark:border-border-dark pt-4 first:border-none first:pt-0' : 'mb-6'}>
            {!isCollapsed && (
                <div
                    className="px-4 mb-2 text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider flex justify-between items-center cursor-pointer hover:text-primary transition-colors select-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {title}
                    <span
                        className={`material-symbols-rounded text-base transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                        expand_more
                    </span>
                </div>
            )}
            <ul
                className={`space-y-1 px-3 transition-all duration-300 ease-in-out overflow-hidden ${!isCollapsed && !isExpanded ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'
                    }`}
            >
                {items.map((item) => (
                    <NavItem
                        key={item.label}
                        {...item}
                        isCollapsed={isCollapsed}
                        active={activePage === (item.path || item.label)}
                        onClick={() => onNavigate && onNavigate(item.path || item.label)}
                    />
                ))}
            </ul>
        </div>
    );
};

/**
 * Sidebar Navigation Component
 * 
 * Renders the main application sidebar with collapsible functionality and responsive design.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the sidebar is open on mobile
 * @param {Function} props.onClose - Callback to close the sidebar on mobile
 * @param {string} props.activePage - Current active page path
 * @param {Function} props.onNavigate - Callback function to handle navigation
 */
export default function Sidebar({ isOpen, onClose, activePage, onNavigate }) {
    // Collapsed state (desktop only)
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle Function
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const mainNav = [
        { icon: 'grid_view', label: 'Dashboard', path: '/' },
        { icon: 'analytics', label: 'HR Analytics', path: '/hr-analytics' },
        { icon: 'description', label: 'Document Center', path: '/doc-center' },
        { icon: 'campaign', label: 'Event and Announcement', path: '/event-announcement' },
    ];

    const teamNav = [
        { icon: 'group', label: 'Employee', path: '/employee-management' },
        { icon: 'donut_large', label: 'Workforce Management', path: '/workforce-management' },
        { icon: 'person_add', label: 'Recruitment', path: '/recruitment' },
        { icon: 'speed', label: 'Performance', path: '/performance' },
        { icon: 'payments', label: 'Payroll', path: '/payroll' },
    ];

    const mySpaceNav = [
        { icon: 'calendar_month', label: 'My Attendance', path: '/my-attendance' },
        { icon: 'timelapse', label: 'My Time Off', path: '/my-time-off' },
        { icon: 'receipt_long', label: 'Pay Slip', path: '/pay-slip' },
    ];

    return (
        <aside
            className={`
        fixed inset-y-0 left-0 z-50
        bg-surface-light dark:bg-surface-dark
        border-r border-border-light dark:border-border-dark
        flex flex-col h-full overflow-y-auto flex-shrink-0
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-auto
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
        >
            {/* Top Header Section */}
            <div className={`p-4 flex items-center ${isCollapsed ? 'flex-col gap-4' : 'justify-between'} mb-2`}>
                {/* Logo (Icon Only when collapsed) */}
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white flex-shrink-0`}>
                        <span className="material-symbols-rounded text-xl">sentiment_satisfied</span>
                    </div>
                    {!isCollapsed && <span className="text-xl font-bold tracking-tight text-primary">HumaniZen</span>}
                </div>

                {/* Toggle / Close Buttons */}
                <div className="flex items-center gap-2">
                    {/* Close button - mobile only */}
                    <button
                        onClick={onClose}
                        className="md:hidden text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>

                    {/* Toggle Dock Button - Desktop only */}
                    <button
                        onClick={toggleCollapse}
                        className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-background-light dark:hover:bg-slate-800 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors ${isCollapsed ? 'mt-0' : ''}`}
                    >
                        <span className="material-symbols-rounded">
                            {isCollapsed ? 'dock_to_right' : 'dock_to_left'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Company Selector */}
            <div className={`px-4 mb-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <div
                    className={`p-2 border border-border-light dark:border-border-dark rounded-xl flex items-center cursor-pointer hover:bg-background-light dark:hover:bg-slate-800 transition-colors group ${isCollapsed ? 'justify-center w-10 h-10 border-0 bg-transparent p-0' : 'justify-between'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-rounded">diversity_3</span>
                        </div>
                        {!isCollapsed && (
                            <div className="whitespace-nowrap overflow-hidden">
                                <div className="text-sm font-bold">LuminaZen</div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark group-hover:text-primary">HR Management</div>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark text-lg">unfold_more</span>}
                </div>
            </div>

            {/* Search (Icon only when collapsed) */}
            <div className={`px-4 mb-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
                {isCollapsed ? (
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-background-light dark:hover:bg-slate-800 text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        <span className="material-symbols-rounded text-xl">search</span>
                    </button>
                ) : (
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-text-muted-light dark:text-text-muted-dark material-symbols-rounded text-lg">search</span>
                        <input
                            className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg py-2.5 pl-10 pr-10 text-sm focus:ring-2 focus:ring-primary/50 dark:text-white placeholder-gray-400"
                            placeholder="Quick Search..."
                            type="text"
                        />
                        <div className="absolute right-2 top-2 flex items-center gap-1">
                            <span className="text-xs text-text-muted-light dark:text-text-muted-dark border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">⌘</span>
                            <span className="text-xs text-text-muted-light dark:text-text-muted-dark border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">/</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden">
                <NavGroup title="MAIN" items={mainNav} isCollapsed={isCollapsed} activePage={activePage} onNavigate={onNavigate} />
                <NavGroup title="TEAM MANAGEMENT" items={teamNav} isCollapsed={isCollapsed} activePage={activePage} onNavigate={onNavigate} />
                <NavGroup title="MY SPACE" items={mySpaceNav} isCollapsed={isCollapsed} activePage={activePage} onNavigate={onNavigate} />
                <NavGroup title="SYSTEM MANAGEMENT" items={[
                    { icon: 'settings', label: 'Settings', path: '/settings' },
                    { icon: 'manage_accounts', label: 'User Management', path: '/user-management' },
                    { icon: 'help', label: 'Help Center', path: '/help-center' },
                ]} isCollapsed={isCollapsed} activePage={activePage} onNavigate={onNavigate} />
            </nav>

            {/* Profile */}
            <div className="p-4 mt-auto border-t border-border-light dark:border-border-dark">
                <div className={`flex items-center p-2 rounded-xl transition-colors ${isCollapsed
                    ? 'justify-center border-0 bg-transparent hover:bg-background-light dark:hover:bg-slate-800'
                    : 'justify-between border border-border-light dark:border-border-dark bg-background-light dark:bg-slate-800'
                    }`}>
                    <div className="flex items-center gap-3">
                        <img
                            alt="Profile"
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAorVehEOlkGaIxdayVc8KT5Ti-sQCLUIWWwWOgY7kxVJx6tibcHBX9E9m6Js6pY4JOYRzZA2y9nAMdau-sBtJNm_-uL6BWmNX7XO00GZvxu69BzvuEtH2M4s0hZmoGCRZTBVi5p8374vDeJQBKEf47ay2Du8MtVioKmeyBPTy8MrHDB26lufBcxFsnEwkvX6Xm-hGw6dfxL7slcsf6lG3qavHYlj7Lw2LHKS7abk3y64LAxYF71K1WFF2zJjYoha88brqc6dnc2wUv"
                        />
                        {!isCollapsed && (
                            <div className="whitespace-nowrap overflow-hidden">
                                <div className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Olivia Mei Nakamura</div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">HR. Staff</div>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <button className="text-text-muted-light dark:text-text-muted-dark hover:text-primary">
                            <span className="material-symbols-rounded">unfold_more</span>
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
