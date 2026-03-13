import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import EmployeeDetailView from './EmployeeDetailView';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employee';
import { getDashboardSummary } from '../services/dashboard';
import { getDepartments } from '../services/department';

export default function EmployeeManagement({ onMenuClick }) {
    const [employees, setEmployees] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPosition, setFilterPosition] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [statusFilter, setStatusFilter] = useState('All');
    const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' or 'list'
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [activeActionMenu, setActiveActionMenu] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [empData, summaryData, deptData] = await Promise.all([
                    getEmployees(),
                    getDashboardSummary(),
                    getDepartments()
                ]);

                setDepartments(Array.isArray(deptData) ? deptData : (deptData?.results || []));
                // Map backend data to frontend format
                const rawEmps = Array.isArray(empData) ? empData : (empData?.results || []);
                const mappedEmps = rawEmps.map(emp => {
                    if (!emp) return null;
                    const safeUser = emp.user || {};
                    const joinDate = emp.join_date || new Date().toISOString().split('T')[0];
                    let displayJoinDate = 'N/A';
                    try {
                        displayJoinDate = new Date(joinDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                    } catch (e) {
                        console.warn('Invalid date:', joinDate);
                    }

                    return {
                        id: emp.id,
                        emp_id: emp.employee_id || 'N/A',
                        name: safeUser.first_name ? `${safeUser.first_name} ${safeUser.last_name || ''}` : 'N/A',
                        first_name: safeUser.first_name || '',
                        last_name: safeUser.last_name || '',
                        email: safeUser.email || '',
                        role: safeUser.role || 'Employee',
                        position: emp.position || 'N/A',
                        department: emp.department || '',
                        department_name: emp.department_name || 'N/A',
                        type: emp.employment_type || 'Full-time',
                        status: emp.status || 'Active',
                        statusColor: emp.status === 'Active'
                            ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
                        joinDate: joinDate,
                        displayJoinDate: displayJoinDate,
                        contact: safeUser.email || 'N/A',
                        phone: emp.phone || '',
                        address: emp.address || '',
                        avatar: `https://i.pravatar.cc/150?u=${emp.employee_id || emp.id}`
                    };
                }).filter(Boolean);
                setEmployees(mappedEmps);
                setSummary(summaryData);
            } catch (err) {
                console.error('Failed to fetch data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const reloadData = async (search = '') => {
        try {
            const empData = await getEmployees(search);
            const rawEmps = Array.isArray(empData) ? empData : (empData?.results || []);
            const mappedEmps = rawEmps.map(emp => {
                if (!emp) return null;
                const safeUser = emp.user || {};
                const joinDate = emp.join_date || new Date().toISOString().split('T')[0];
                let displayJoinDate = 'N/A';
                try {
                    displayJoinDate = new Date(joinDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                } catch (e) {
                    console.warn('Invalid date:', joinDate);
                }

                return {
                    id: emp.id,
                    emp_id: emp.employee_id || 'N/A',
                    name: safeUser.first_name ? `${safeUser.first_name} ${safeUser.last_name || ''}` : 'N/A',
                    first_name: safeUser.first_name || '',
                    last_name: safeUser.last_name || '',
                    email: safeUser.email || '',
                    role: safeUser.role || 'Employee',
                    position: emp.position || 'N/A',
                    department: emp.department || '',
                    department_name: emp.department_name || 'N/A',
                    type: emp.employment_type || 'Full-time',
                    status: emp.status || 'Active',
                    statusColor: emp.status === 'Active'
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
                    joinDate: joinDate,
                    displayJoinDate: displayJoinDate,
                    contact: safeUser.email || 'N/A',
                    phone: emp.phone || '',
                    address: emp.address || '',
                    avatar: `https://i.pravatar.cc/150?u=${emp.employee_id || emp.id}`
                };
            }).filter(Boolean);
            setEmployees(mappedEmps);
        } catch (err) {
            console.error('Failed to reload employees', err);
        }
    };

    // Effect for searching
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== undefined) {
                reloadData(searchTerm);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleAdd = () => {
        setModalMode('add');
        setCurrentEmployee(null);
        setIsModalOpen(true);
    };

    const handleEdit = (employee) => {
        setModalMode('edit');
        setCurrentEmployee(employee);
        setIsModalOpen(true);
        setActiveActionMenu(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp.id !== id));
                alert('Employee deleted successfully');
            } catch (err) {
                alert('Failed to delete employee');
            }
        }
    };

    const toggleActionMenu = (id, e) => {
        e.stopPropagation();
        setActiveActionMenu(activeActionMenu === id ? null : id);
    };

    const handleViewDetails = (employee) => {
        setSelectedEmployee(employee);
        setActiveActionMenu(null);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveActionMenu(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (selectedEmployee) {
        return <EmployeeDetailView employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    // Chart Data for Department Active
    const deptStats = summary?.department_stats || {};
    const totalEmps = summary?.total_employees || 1;

    const colors = ['bg-purple-500', 'bg-yellow-400', 'bg-pink-500', 'bg-sky-400', 'bg-emerald-400'];
    const departmentData = Object.entries(deptStats).map(([name, count], idx) => {
        const val = Math.round((count / totalEmps) * 100);
        return {
            name,
            value: isNaN(val) ? 0 : val,
            color: colors[idx % colors.length],
            count
        };
    });

    // Performance Gauge Data (Hardcoded for now as we don't have aggregated performance yet)
    const performanceScore = 89.2;
    const gaugeData = [
        { name: 'Score', value: performanceScore },
        { name: 'Remaining', value: 100 - performanceScore }
    ];

    // Filter Logic
    const filteredEmployees = employees.filter((emp) => {
        if (!emp) return false;
        const name = (emp.name || '').toLowerCase();
        const id = (emp.id || '').toString();
        const matchesSearch = name.includes(searchTerm.toLowerCase()) || id.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Sort Logic
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Display Logic: Show only 5 in dashboard mode, all in list mode
    const displayedEmployees = viewMode === 'dashboard' ? sortedEmployees.slice(0, 5) : sortedEmployees;

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const toggleStatusFilter = () => {
        setStatusFilter(prev => prev === 'All' ? 'Active' : prev === 'Active' ? 'On Leave' : 'All');
    };

    const toggleViewMode = () => {
        if (viewMode === 'dashboard') {
            setViewMode('list');
            setSearchTerm('');
            setStatusFilter('All');
            setSortConfig({ key: null, direction: 'ascending' });
        } else {
            setViewMode('dashboard');
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8 flex flex-col">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary transition-colors">
                        <span className="material-symbols-rounded text-2xl">menu</span>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Employee</h1>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Access and update employee information efficiently.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        Export
                        <span className="material-symbols-rounded text-lg">download</span>
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-purple-500/30"
                    >
                        Add New +
                    </button>
                </div>
            </header>

            {/* Top Dashboard Grid - Only visible in dashboard mode */}
            {viewMode === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 transition-all duration-300 flex-shrink-0">
                    {/* Department Active - Takes up larger space */}
                    <div className="lg:col-span-5 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark">domain</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Department Active</h3>
                                <span className="material-symbols-rounded text-xs text-text-muted-light dark:text-text-muted-dark cursor-help">info</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs text-text-muted-light dark:text-text-muted-dark border border-border-light dark:border-border-dark rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-slate-700">
                                Monthly View
                                <span className="material-symbols-rounded text-base">expand_more</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Highest Department</div>
                                <div className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">
                                    {departmentData.length > 0 ? `${Math.max(...departmentData.map(d => d.value))}%` : '0%'}
                                </div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
                                    {departmentData.sort((a, b) => b.value - a.value)[0]?.name || 'No Data'}
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">
                                    {summary?.total_employees || 0} <span className="text-sm font-normal text-text-muted-light">Employee</span>
                                </div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">Total overall employee</div>
                            </div>
                        </div>

                        {/* Custom Bar Visualization (Data Driven) */}
                        <div className="flex gap-0.5 h-8 w-full rounded-md overflow-hidden mb-6 bg-gray-100 dark:bg-slate-700/30">
                            {departmentData.map((dept, idx) => {
                                const barWidth = Math.max(0, Math.min(100, dept.value || 0));
                                if (barWidth <= 0) return null;
                                return (
                                    <div
                                        key={`${dept.name}-${idx}`}
                                        className={`${dept.color}`}
                                        style={{ width: `${barWidth}%` }}
                                    ></div>
                                );
                            })}
                        </div>

                        {/* Legend List */}
                        <div className="space-y-3">
                            {departmentData.map((dept, idx) => (
                                <div key={idx} className={`flex items-center justify-between text-sm ${idx === 1 ? 'bg-gray-50 dark:bg-slate-800/50 p-1 rounded' : ''}`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1 h-4 rounded-full ${dept.color.replace('bg-', 'bg-')}`}></div>
                                        <span className="font-medium text-text-main-light dark:text-text-main-dark">{dept.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-text-muted-light dark:text-text-muted-dark text-xs">
                                        <span className="font-bold text-text-main-light dark:text-text-main-dark">{dept.count} Employee</span>
                                        ({dept.value}%)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column: Attendance + Hours */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        {/* Attendance Card */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark font-medium">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Employee Attendance
                                </div>
                                <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-rounded">more_horiz</span></button>
                            </div>

                            <div>
                                <div className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">
                                    {summary?.present_employees || 0} <span className="text-sm font-normal text-text-muted-light">/ {summary?.total_employees || 0} People</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-text-muted-light">Present Today</span>
                                    <span className="text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded-full flex items-center">
                                        Live
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Total Logged Hours Card */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark font-medium">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                    Total Logged Hours
                                </div>
                                <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-rounded">more_horiz</span></button>
                            </div>

                            <div>
                                <div className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">
                                    234h 12m 23s
                                </div>
                                <div className="text-xs text-purple-500 mt-2">
                                    Avg per Employee: <span className="font-medium">7h 05m / day</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Score */}
                    <div className="lg:col-span-4 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-rounded text-text-muted-light dark:text-text-muted-dark">check_circle</span>
                            <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Performance Score</h3>
                            <span className="material-symbols-rounded text-xs text-text-muted-light dark:text-text-muted-dark cursor-help">info</span>
                        </div>

                        <div className="flex gap-2 overflow-x-auto text-xs pb-2 mb-2 no-scrollbar">
                            <span className="px-3 py-1 bg-gray-100/50 dark:bg-slate-700/50 text-text-muted-light rounded cursor-pointer whitespace-nowrap">Developer</span>
                            <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-medium rounded cursor-pointer whitespace-nowrap">Marketing</span>
                            <span className="px-3 py-1 bg-gray-100/50 dark:bg-slate-700/50 text-text-muted-light rounded cursor-pointer whitespace-nowrap">Creative</span>
                            <span className="px-3 py-1 bg-gray-100/50 dark:bg-slate-700/50 text-text-muted-light rounded cursor-pointer whitespace-nowrap">HR</span>
                            <span className="px-3 py-1 bg-gray-100/50 dark:bg-slate-700/50 text-text-muted-light rounded cursor-pointer whitespace-nowrap">Finan...</span>
                        </div>

                        {/* Recharts Gauge */}
                        <div className="relative h-[180px] w-full flex justify-center items-center">
                            <ResponsiveContainer width={300} height="100%">
                                <PieChart>
                                    <Pie
                                        data={gaugeData}
                                        cx="50%"
                                        cy="70%"
                                        startAngle={180}
                                        endAngle={0}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {gaugeData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={index === 0 ? '#a855f7' : (document.documentElement.classList.contains('dark') ? '#334155' : '#f3f4f6')}
                                                cornerRadius={index === 0 ? 10 : 0}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            <div className="absolute bottom-6 text-center z-10">
                                <div className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">{performanceScore}%</div>
                                <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark px-1">Steady performance this week.</div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-border-light dark:border-border-dark">
                            <div>
                                <div className="text-text-muted-light mb-1">Performance Score</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark">86%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-text-muted-light mb-1">Working Hours Logged</div>
                                <div className="font-bold text-text-main-light dark:text-text-main-dark">38h 15m / 42h</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Staff Directory */}
            {/* Staff Directory Header & Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                <div>
                    <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Staff Directory</h2>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Centralized data for tracking roles, status, and employee details.</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
                    <div className="relative flex-grow lg:flex-grow-0 lg:w-40">
                        <span className="absolute left-3 top-2.5 text-text-muted-light dark:text-text-muted-dark material-symbols-rounded text-lg">search</span>
                        <input
                            className="w-full bg-surface-light dark:bg-surface-dark border-none rounded-lg py-2 pl-10 pr-10 text-[12px] focus:ring-2 focus:ring-primary/50 dark:text-white placeholder-gray-400 shadow-soft"
                            placeholder="Search by Name or ID..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={toggleStatusFilter}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors shadow-soft ${statusFilter !== 'All' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-light dark:bg-surface-dark border-transparent text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                    >
                        Filter {statusFilter !== 'All' ? `(${statusFilter})` : ''} <span className="material-symbols-rounded text-sm">filter_list</span>
                    </button>
                    <button
                        onClick={() => requestSort('name')}
                        className="px-3 py-2 rounded-lg border border-transparent text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-1 bg-surface-light dark:bg-surface-dark transition-colors shadow-soft"
                    >
                        Sort by <span className="material-symbols-rounded text-sm">sort</span>
                    </button>
                    <button
                        onClick={toggleViewMode}
                        className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors shadow-soft ${viewMode === 'list' ? 'bg-primary text-white border-primary' : 'bg-surface-light dark:bg-surface-dark border-transparent text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                    >
                        {viewMode === 'list' ? 'Back' : 'View All'} <span className="material-symbols-rounded text-sm">{viewMode === 'list' ? 'arrow_back' : 'arrow_forward'}</span>
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className={`bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex flex-col ${viewMode === 'list' ? 'flex-1 min-h-0' : ''}`}>
                {/* Table */}
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-background-light dark:bg-slate-800/50 text-[10px] font-semibold text-text-muted-light dark:text-text-muted-dark border-b border-border-light dark:border-border-dark">
                                <th onClick={() => requestSort('name')} className="p-4 pl-6 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Employee Name</th>
                                <th onClick={() => requestSort('position')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Position</th>
                                <th onClick={() => requestSort('department')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Department</th>
                                <th onClick={() => requestSort('type')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Type</th>
                                <th onClick={() => requestSort('status')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Status</th>
                                <th onClick={() => requestSort('joinDate')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Join Date</th>
                                <th onClick={() => requestSort('contact')} className="p-4 font-medium whitespace-nowrap cursor-pointer hover:text-primary transition-colors">Contact</th>
                                <th className="p-4 font-medium text-right pr-6 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark text-[8px]">
                            {sortedEmployees.length > 0 ? (
                                sortedEmployees.map((emp, i) => (
                                    <tr key={i} className="hover:bg-background-light/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="p-4 pl-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0 bg-gray-200 dark:bg-gray-700" />
                                                <div>
                                                    <div className="font-semibold text-text-main-light dark:text-text-main-dark text-[12px]">{emp.name}</div>
                                                    <div className="text-[10px] text-text-muted-light dark:text-text-muted-dark">ID: {emp.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap font-medium text-[12px]">{emp.position}</td>
                                        <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap text-[12px]">{emp.department}</td>
                                        <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap text-[12px]">{emp.type}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap ${emp.statusColor}`}>
                                                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap text-[12px]">{emp.joinDate}</td>
                                        <td className="p-4 text-text-main-light dark:text-text-main-dark align-middle whitespace-nowrap text-[12px]">{emp.contact}</td>
                                        <td className="p-4 text-right pr-6 align-middle relative">
                                            <button
                                                onClick={(e) => toggleActionMenu(emp.id, e)}
                                                className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ${activeActionMenu === emp.id ? 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-200' : ''}`}
                                            >
                                                <span className="material-symbols-rounded text-lg">more_vert</span>
                                            </button>
                                            {activeActionMenu === emp.id && (
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-border-light dark:border-border-dark z-[50] py-1 overflow-hidden">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleViewDetails(emp); }}
                                                        className="w-full text-left px-4 py-2 text-[11px] hover:bg-gray-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-rounded text-sm">visibility</span> Details
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEdit(emp); }}
                                                        className="w-full text-left px-4 py-2 text-[11px] hover:bg-gray-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-rounded text-sm">edit</span> Edit
                                                    </button>
                                                    <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(emp.id); }}
                                                        className="w-full text-left px-4 py-2 text-[11px] hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-rounded text-sm">delete</span> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-8 text-center text-text-muted-light dark:text-text-muted-dark">
                                        No employees found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark w-full sm:w-auto text-center sm:text-left">
                        {/* Empty or "Showing X items" if needed in future */}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-center sm:justify-end no-scrollbar">
                        <button className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1">
                            <span className="material-symbols-rounded text-sm">arrow_back</span> Prev
                        </button>

                        <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center">1</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-medium text-text-muted-light dark:text-text-muted-dark transition-colors flex items-center justify-center">2</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-medium text-text-muted-light dark:text-text-muted-dark transition-colors flex items-center justify-center">3</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-medium text-text-muted-light dark:text-text-muted-dark transition-colors flex items-center justify-center">4</button>

                        <span className="text-text-muted-light dark:text-text-muted-dark text-xs px-1">...</span>

                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-medium text-text-muted-light dark:text-text-muted-dark transition-colors flex items-center justify-center">127</button>

                        <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center gap-1 shadow-lg shadow-purple-500/30">
                            Next <span className="material-symbols-rounded text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Employee Side Drawer */}
            {isModalOpen && (
                <EmployeeSideDrawer
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mode={modalMode}
                    employee={currentEmployee}
                    departments={departments}
                    onSuccess={reloadData}
                />
            )}
        </main>
    );
}

function EmployeeSideDrawer({ isOpen, onClose, mode, employee, departments, onSuccess }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: 'Employee',
        employee_id: '',
        department: '',
        position: '',
        employment_type: 'Full-time',
        status: 'Active',
        join_date: new Date().toISOString().split('T')[0],
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && employee) {
            setFormData({
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                role: employee.role,
                employee_id: employee.emp_id,
                department: employee.department || '',
                position: employee.position,
                employment_type: employee.type,
                status: employee.status,
                join_date: employee.joinDate,
                phone: employee.phone || '',
                address: employee.address || ''
            });
        }
    }, [mode, employee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            user: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                role: formData.role,
                status: 'Active'
            },
            employee_id: formData.employee_id,
            department: formData.department || null,
            position: formData.position,
            employment_type: formData.employment_type,
            status: formData.status,
            join_date: formData.join_date,
            phone: formData.phone,
            address: formData.address
        };

        try {
            if (mode === 'add') {
                await createEmployee(payload);
            } else {
                await updateEmployee(employee.id, payload);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error('CRUD Error:', err.response?.data);
            alert('Operation failed: ' + (JSON.stringify(err.response?.data) || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />

            {/* Drawer */}
            <div className="relative w-full max-w-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl h-full shadow-2xl animate-drawer-in flex flex-col border-l border-white/20 dark:border-white/10 overflow-hidden">
                {/* Floating Header with Glassmorphism */}
                <div className="sticky top-0 z-10 p-6 border-b border-border-light/50 dark:border-border-dark/50 flex justify-between items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group transition-all hover:bg-primary hover:text-white">
                            <span className="material-symbols-rounded text-2xl">{mode === 'add' ? 'person_add' : 'edit_square'}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                                {mode === 'add' ? 'Create New Employee' : 'Edit Professional Profile'}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                                {mode === 'add' ? 'Fill in the details to onboard a new member.' : `Updating details for ID: ${employee?.emp_id}`}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* section: Basic Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Personal Information</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">First Name</label>
                                <input
                                    required
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="e.g. John"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Last Name</label>
                                <input
                                    required
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="e.g. Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Email Address</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                placeholder="john.doe@humanizen.com"
                            />
                        </div>
                    </div>

                    {/* section: Employment */}
                    <div className="space-y-4 pt-4 border-t border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            <span className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Employment Details</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Employee ID</label>
                                <input
                                    required
                                    value={formData.employee_id}
                                    onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white font-mono"
                                    placeholder="EMP-XXX"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Role Authority</label>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                >
                                    <option value="Employee">Employee</option>
                                    <option value="Manager">Manager</option>
                                    <option value="HR Manager">HR Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Department</label>
                                <select
                                    required
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Position</label>
                                <input
                                    required
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="e.g. Lead Designer"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Employment Type</label>
                                <select
                                    required
                                    value={formData.employment_type}
                                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-500">Work Status</label>
                                <select
                                    required
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="On Leave">On Leave</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500">Joining Date</label>
                            <input
                                required
                                type="date"
                                value={formData.join_date}
                                onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>
                </form>

                <div className="sticky bottom-0 p-6 border-t border-border-light/50 dark:border-border-dark/50 flex gap-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                    >
                        Discard Changes
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] px-4 py-3.5 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span className="material-symbols-rounded text-xl">{mode === 'add' ? 'rocket_launch' : 'verified_user'}</span>
                        )}
                        {mode === 'add' ? 'Onboard Employee' : 'Confirm Updates'}
                    </button>
                </div>
            </div>
        </div>
    );
}
