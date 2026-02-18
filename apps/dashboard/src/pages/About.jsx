import React from 'react';

const About = ({ onMenuClick }) => {
    return (
        <div className="flex-1 h-screen overflow-y-auto bg-slate-50 font-sans text-slate-600">
            {/* --- Header --- */}
            <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">About Project</h1>
                        <p className="text-sm text-slate-500 mt-1">Project documentation and system overview.</p>
                    </div>
                </div>
            </header>

            <main className="p-4 md:p-8 max-w-[1000px] mx-auto space-y-8">

                {/* Project Header Card */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h2 className="text-3xl font-extrabold mb-2">HR Management System</h2>
                            <p className="text-slate-300 text-lg">ReikPlus</p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-sm border border-white/20">v1.0.0</span>
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-sm border border-white/20">React + Vite</span>
                                <a href="https://hr.reikplus.id" target="_blank" rel="noreferrer" className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-lg text-sm border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                                    hr.reikplus.id
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <span className="material-symbols-rounded text-[80px] text-white/10">verified</span>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-slate-300 leading-relaxed max-w-3xl">
                            Aplikasi ini dibuat untuk membantu perusahaan dalam mengelola sumber daya manusia secara digital, terstruktur, dan terintegrasi.
                        </p>
                    </div>
                </div>

                {/* Objectives */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-rounded text-purple-600">track_changes</span> Objectives
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Digitalisasi proses HR',
                            'Monitoring karyawan secara real-time',
                            'Otomatisasi payroll dan absensi',
                            'Manajemen dokumen dan approval workflow'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="material-symbols-rounded text-green-500 text-sm">check_circle</span>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Architecture & Stack */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-rounded text-blue-600">architecture</span> System Architecture
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Frontend</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <span className="material-symbols-rounded">code</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">React</p>
                                    <p className="text-xs text-slate-500">Vite, Tailwind CSS</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Backend</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                    <span className="material-symbols-rounded">dns</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">Node.js / Laravel</p>
                                    <p className="text-xs text-slate-500">REST API</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database</h4>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                                    <span className="material-symbols-rounded">database</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">PostgreSQL</p>
                                    <p className="text-xs text-slate-500">MySQL / MongoDB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Features */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-rounded text-amber-500">stars</span> Core Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Employee Management', icon: 'group', desc: 'Manage profiles, contracts, and documents.' },
                            { title: 'Attendance', icon: 'schedule', desc: 'Real-time check-in/out and location tracking.' },
                            { title: 'Leave Management', icon: 'event_busy', desc: 'Request, approval workflow, and history.' },
                            { title: 'Payroll System', icon: 'payments', desc: 'Automated salary calculation and slip generation.' },
                            { title: 'Document Center', icon: 'folder', desc: 'Cloud storage for contracts and policies.' },
                            { title: 'Role Based Access', icon: 'admin_panel_settings', desc: 'Secure access for Admins, HR, and Staff.' },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                                <span className="material-symbols-rounded text-slate-400 mb-3 text-2xl">{feature.icon}</span>
                                <h4 className="font-bold text-slate-800 mb-1">{feature.title}</h4>
                                <p className="text-xs text-slate-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Workflow & Security */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="material-symbols-rounded text-indigo-600">account_tree</span> Workflow
                        </h3>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-slate-600">Leave Request Process</h4>
                            <div className="flex flex-col gap-2">
                                {['Employee submit request', 'Manager review', 'HR approval', 'Status update (Approved/Rejected)', 'Notification sent'].map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-500">
                                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">{i + 1}</span>
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="material-symbols-rounded text-red-500">security</span> Security
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'BCrypt Password Encryption',
                                'Role-Based Access Control (RBAC)',
                                'JWT Token Authentication',
                                'Input Validation & Sanitization',
                                'CSRF Protection'
                            ].map((sec, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-rounded text-slate-400 text-lg">lock</span>
                                    {sec}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Footer / Future Plan */}
                <section className="bg-slate-100 rounded-2xl p-6 md:p-8 text-center border border-slate-200 border-dashed">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Future Development Plan</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Mobile App', 'Face Recognition Attendance', 'BPJS Integration', 'Tax (PPH21) Integration', 'Accounting Module'].map((plan, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold">
                                {plan}
                            </span>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default About;
