import React, { useState } from 'react';

const UserManagement = ({ onMenuClick }) => {
    // --- Mock Data ---
    const [users, setUsers] = useState([
        { id: 1, name: 'Kristin Watson', email: 'Ester123@gmail.com', role: 'Project Manager', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Wade Warren', email: 'Ester123@gmail.com', role: 'Business Analysis', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Eleanor Pena', email: 'Savannahbag@yahoo.com', role: 'HR Specialist', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Marvin McKinney', email: 'Fisherman12@gmail.com', role: 'HR Management', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Marvin McKinney', email: 'Fisherman12@gmail.com', role: 'HR Management', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Marvin McKinney', email: 'Fisherman12@gmail.com', role: 'HR Management', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'Darlene Robertson', email: 'Joneshighman@gmail.com', role: 'HR Supervisor', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Ronald Richards', email: 'Janecooper@gmail.com', role: 'Chief People Offi...', status: 'Inactive', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=8' },
        { id: 9, name: 'Jenny Wilson', email: 'Fisherman12@gmail.com', role: 'Chief People Offi...', status: 'Inactive', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=9' },
        { id: 10, name: 'Arlene McCoy', email: 'Fisherman12@gmail.com', role: 'VP Human Resou...', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=10' },
        { id: 11, name: 'Darrell Steward', email: 'Fisherman12@gmail.com', role: 'HR Manager', status: 'Active', joined: '17 Oct 2025, 12:34 pm', twoFactor: 'Enabled', avatar: 'https://i.pravatar.cc/150?u=11' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // --- Helper Functions ---
    const getStatusStyle = (status) => {
        return status === 'Active'
            ? 'bg-green-50 text-green-600'
            : 'bg-red-50 text-red-600';
    };

    const getStatusDot = (status) => {
        return status === 'Active' ? 'bg-green-500' : 'bg-red-500';
    }

    const get2FAuthStyle = (status) => {
        return status === 'Enabled'
            ? 'bg-yellow-50 text-yellow-600'
            : 'bg-slate-50 text-slate-500';
    }


    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 h-screen font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your team member and their account permission here.</p>
                    </div>
                </div>
                <div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-bold hover:bg-[#6D28D9] shadow-lg shadow-purple-200 transition-all active:scale-95">
                        Add User <span className="material-symbols-rounded text-lg">person_add</span>
                    </button>
                </div>
            </header>

            <main className="p-8 max-w-[1600px] mx-auto space-y-6">

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {/* All Status */}
                            <div className="relative min-w-[120px]">
                                <select className="appearance-none w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2.5 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                            </div>

                            {/* All Roles */}
                            <div className="relative min-w-[120px]">
                                <select className="appearance-none w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2.5 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors">
                                    <option>All Roles</option>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Employee</option>
                                </select>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">expand_more</span>
                            </div>

                            {/* Date Range (Mock) */}
                            <div className="relative min-w-[200px]">
                                <button className="w-full bg-slate-50 border border-slate-200 pl-4 pr-10 py-2.5 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer transition-colors text-left flex items-center justify-between">
                                    <span>01 October - 31 October 2024</span>
                                </button>
                                <span className="material-symbols-rounded absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-base">calendar_today</span>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">search</span>
                            <input
                                type="text"
                                placeholder="Search User..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 placeholder:text-slate-300 transition-all"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F8F9FB] border-b border-border-light text-left text-slate-400">
                                    <th className="px-6 py-4 text-[11px] font-bold">Full Name</th>
                                    <th className="px-6 py-4 text-[11px] font-bold"><span className="flex items-center gap-1">@ Email</span></th>
                                    <th className="px-6 py-4 text-[11px] font-bold"><span className="flex items-center gap-1"><span className="material-symbols-rounded text-sm">account_circle</span> Role</span></th>
                                    <th className="px-6 py-4 text-[11px] font-bold"><span className="flex items-center gap-1"><span className="material-symbols-rounded text-sm">check_circle</span> Status</span></th>
                                    <th className="px-6 py-4 text-[11px] font-bold"><span className="flex items-center gap-1"><span className="material-symbols-rounded text-sm">calendar_today</span> Joined Date</span></th>
                                    <th className="px-6 py-4 text-[11px] font-bold"><span className="flex items-center gap-1"><span className="material-symbols-rounded text-sm">security</span> 2F Auth</span></th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-all border-b border-dashed border-slate-200 last:border-0 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover bg-slate-200" />
                                                <span className="text-xs font-bold text-slate-700">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`mailto:${user.email}`} className="text-xs font-bold text-slate-500 hover:text-purple-600 underline decoration-slate-300 underline-offset-2 transition-colors">
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(user.status)}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(user.status)}`}></div>
                                                {user.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{user.joined}</td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${get2FAuthStyle(user.twoFactor)}`}>
                                                {user.twoFactor}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors">
                                                <span className="material-symbols-rounded text-lg">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end items-center gap-2 mt-6">
                        <button className="px-4 py-2 bg-slate-100/50 text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1">
                            <span className="material-symbols-rounded text-sm">arrow_back</span> Prev
                        </button>

                        <button className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 text-xs font-bold rounded-lg border border-purple-200">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50">2</button>
                        <button className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50">3</button>
                        <button className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50">4</button>
                        <span className="text-slate-400 text-xs">...</span>
                        <button className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50">127</button>

                        <button className="px-4 py-2 bg-[#7C3AED] text-white text-xs font-bold rounded-lg hover:bg-[#6D28D9] transition-colors flex items-center gap-1 shadow-lg shadow-purple-200">
                            Next <span className="material-symbols-rounded text-sm">arrow_forward</span>
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default UserManagement;
