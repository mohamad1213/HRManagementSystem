import { useState, useRef, useEffect } from 'react';

export default function AttendanceLog() {
    const initialEmployees = [
        {
            name: 'Noah Kenji Tanaka',
            id: '97174',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGM6FREazzyJN3zlVtuhHld6tk5ZGDAWnWPsjccjZiMIjYx8Xu84zHSYik0DfzYnKaaDkZqX8cg-cVO3K1ReyudHRpHseJvmYEZwaRSkORxNm4JE7WCqADTnIPhp3oSAis8wXXIz-WujrhyU9KLgaICyymx1rRuCojv_VGcd6l3mgzljn-uY9A321vHjuxZR3J33JK1nDYownLPXiJJXf9D-2u4HZE0MAKv41UkTObvCaCYFDBVDzI46kvNb8PpMakBGanIrmDveYL',
            department: 'Marketing',
            date: '12 June 2025',
            checkIn: '08.00',
            checkOut: '17:00',
            hours: '8h 18m',
            status: 'On-Time',
        },
        {
            name: 'Dante Haru Nakamura',
            id: '43178',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhOpXmWj43_LGDj69pGJmN5UvVkZWPUyF42C0DvPJxTP9D11QCs5_eqPntmlEVOeEHukjNldp2je0caldnp0xfIlQ-_hFiq6yATZlsJdyO6hazK74sK1jB8NL6vekG05ICWXY334TyHnkBaVBETRhZxNJTIM1Xbg1ETuoEoGLEJ5vhSwRS1A-Mk0OmysI33DUOJbqa1shpQPZ8WPKEOxG-5z1mkr24dN8IugxDZH1FpsCj_8aaYia-Mspd8rRiKMc-CbSMBjX9clXz',
            department: 'Dev Team',
            date: '12 June 2025',
            checkIn: '07.40',
            checkOut: '17:00',
            hours: '9h 07m',
            status: 'On-Time',
        },
        {
            name: 'Dante Haru Nakamura',
            id: '43179', // Changed ID to be unique for demo
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGnFrOr8CxiaNBetF4BcQmqzBJ3vhTa4-u9GxT0t5P5_5hZcvF25OBAkKGpL7xSyvG5J-_x4bqK6LB4IeGoBzRCjSK4nfyn_VlIq62BwsIjH9Os8u2g_SOXtlKHLvFbA7KkY55bXAz77Jo3y5OGfva86IJdHUrlyVLtEAbzgDtJU19fLouVzNnF3E-BN24M6Cjv20DEZuDbrse_j16Dz3qFNvQNiE1IqnrDklikYP3XdsfGgFOkAcOYnkCw0nIEf5xqy3SQm2RwCOW',
            department: 'Dev Team',
            date: '12 June 2025',
            checkIn: '07.40',
            checkOut: '17:00',
            hours: '9h 07m',
            status: 'On-Time',
        },
        {
            name: 'Kaela Mitsuko Lane',
            id: '22739',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIwpih0jRA7g72NIT5k26xp5ulu5vqOE5hFqW40fqrw-avFWv88DGNVrLm12VDjr7ktRydxS7Dt-_IUPjZrfYnYJveM3knE55j2oNLRm0D-jAlA-9gQ75UgJQy_sqoVPAme5aBXx-Iw6zscSj7n5TLIxOzXE4j2HMlEmdqiOQXYQrYD3I7QeH4RcJIA3el1RU8hq9j5cb15myQnjy8-nb6Q3laKqN8zUef8_3EMeF__rqenNDQJMPphxZRLvdvZ_zY1Zek8ro6mC_l',
            department: 'Operations',
            date: '12 June 2025',
            checkIn: '08.30',
            checkOut: '-',
            hours: '-',
            status: 'Late',
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(null); // format: { index: number } | null
    const actionDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target)) {
                setShowActionsDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Search Logic
    const filteredEmployees = initialEmployees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.id.includes(searchTerm);
        const matchesFilter = filterStatus === 'All' || emp.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Export CSV Logic
    const handleExportCSV = () => {
        const headers = ['Name', 'ID', 'Department', 'Date', 'Check In', 'Check Out', 'Hours', 'Status'];
        const csvContent = [
            headers.join(','),
            ...filteredEmployees.map(emp => [
                `"${emp.name}"`,
                `"${emp.id}"`,
                `"${emp.department}"`,
                `"${emp.date}"`,
                `"${emp.checkIn}"`,
                `"${emp.checkOut}"`,
                `"${emp.hours}"`,
                `"${emp.status}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'attendance_log.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const StatusBadge = ({ status }) => {
        const isOnTime = status === 'On-Time';
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isOnTime
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${isOnTime ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {status}
            </span>
        );
    };

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-soft border border-border-light dark:border-border-dark">
            {/* Header */}
            <div className="flex flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h4 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Attendance Log</h4>
                    <p className="text-[12px] text-text-muted-light dark:text-text-muted-dark hidden md:block">
                        Monitor check-in, check-out, and working hours at a glance.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className="relative flex-grow md:flex-grow-0">
                        <span className="absolute left-3 top-2.5 text-text-muted-light dark:text-text-muted-dark material-symbols-rounded text-lg">
                            search
                        </span>
                        <input
                            className="w-full md:w-64 bg-background-light dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-10 text-[12px] focus:ring-2 focus:ring-primary/50 dark:text-white placeholder-gray-400"
                            placeholder="Quick Search..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-2 top-2 flex items-center gap-1">
                            <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
                                ⌘
                            </span>
                            <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
                                /
                            </span>
                        </div>
                    </div>

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            className="bg-background-light dark:bg-slate-800 border-none rounded-lg px-4 py-2 flex items-center gap-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        >
                            {filterStatus === 'All' ? 'Filter by' : filterStatus}
                            <span className="material-symbols-rounded text-lg">expand_more</span>
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-border-light dark:border-border-dark z-20 overflow-hidden">
                                {['All', 'On-Time', 'Late'].map((status) => (
                                    <button
                                        key={status}
                                        className="w-full text-left px-4 py-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-background-light dark:hover:bg-slate-700 transition-colors"
                                        onClick={() => {
                                            setFilterStatus(status);
                                            setShowFilterDropdown(false);
                                        }}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Export Button */}
                    <button
                        className="bg-background-light dark:bg-slate-800 border-none rounded-lg px-4 py-2 flex items-center gap-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={handleExportCSV}
                    >
                        Export CSV
                        <span className="material-symbols-rounded text-lg">download</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-background-light dark:bg-slate-800 text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wide">
                            <th className="p-4 rounded-l-lg">Employee Name</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Check In</th>
                            <th className="p-4">Check Out</th>
                            <th className="p-4">Hours</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 rounded-r-lg text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-border-light dark:divide-border-dark">
                        {filteredEmployees.length > 0 ? filteredEmployees.map((emp, i) => (
                            <tr key={i} className="hover:bg-background-light/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img alt="Avatar" className="w-10 h-10 rounded-full object-cover" src={emp.avatar} />
                                        <div>
                                            <div className="font-bold text-[12px] text-text-main-light dark:text-text-main-dark">{emp.name}</div>
                                            <div className="text-[12px] text-text-muted-light dark:text-text-muted-dark">ID: {emp.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-[12px] text-text-main-light dark:text-text-main-dark">{emp.department}</td>
                                <td className="p-4 text-[12px] text-text-main-light dark:text-text-main-dark">{emp.date}</td>
                                <td className="p-4 text-[12px] text-text-main-light dark:text-text-main-dark">{emp.checkIn}</td>
                                <td className="p-4 text-[12px] text-text-main-light dark:text-text-main-dark">{emp.checkOut}</td>
                                <td className="p-4 text-[12px] text-text-main-light dark:text-text-main-dark">{emp.hours}</td>
                                <td className="p-4">
                                    <StatusBadge status={emp.status} />
                                </td>
                                <td className="p-4 text-right relative">
                                    <button
                                        className="text-text-muted-light dark:text-text-muted-dark hover:text-primary p-1 rounded-full hover:bg-background-light dark:hover:bg-slate-700 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowActionsDropdown(showActionsDropdown === i ? null : i);
                                        }}
                                    >
                                        <span className="material-symbols-rounded">more_vert</span>
                                    </button>

                                    {/* Action Dropdown */}
                                    {showActionsDropdown === i && (
                                        <div
                                            ref={actionDropdownRef}
                                            className="absolute right-0 top-10 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-border-light dark:border-border-dark z-50 overflow-hidden animation-fade-in"
                                        >
                                            <button className="w-full text-left px-4 py-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-background-light dark:hover:bg-slate-700 flex items-center gap-2">
                                                <span className="material-symbols-rounded text-sm">visibility</span>
                                                View
                                            </button>
                                            <button className="w-full text-left px-4 py-2 text-[12px] text-text-main-light dark:text-text-main-dark hover:bg-background-light dark:hover:bg-slate-700 flex items-center gap-2">
                                                <span className="material-symbols-rounded text-sm">edit</span>
                                                Edit
                                            </button>
                                            <div className="h-px bg-border-light dark:border-slate-700 my-0"></div>
                                            <button className="w-full text-left px-4 py-2 text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                                                <span className="material-symbols-rounded text-sm">delete</span>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="8" className="p-8 text-center text-text-muted-light dark:text-text-muted-dark italic">
                                    No records found matching your search or filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {filteredEmployees.length > 0 && (
                <div className="mt-4 flex items-center justify-between px-4">
                    <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        Showing 1 to {filteredEmployees.length} of {filteredEmployees.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg border border-border-light dark:border-border-dark flex items-center justify-center text-text-muted-light dark:text-text-muted-dark hover:bg-background-light dark:hover:bg-slate-700 disabled:opacity-50">
                            <span className="material-symbols-rounded text-sm">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-purple-500/20">
                            1
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-border-light dark:border-border-dark flex items-center justify-center text-text-muted-light dark:text-text-muted-dark hover:bg-background-light dark:hover:bg-slate-700 disabled:opacity-50">
                            <span className="material-symbols-rounded text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
