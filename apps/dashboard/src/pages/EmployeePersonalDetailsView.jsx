import React, { useState } from 'react';

export default function EmployeePersonalDetailsView({ employee, onBack, onTabChange }) {

    // Mock Data based on the image
    const personalInfo = {
        fullName: employee.name,
        gender: 'Female',
        maritalStatus: 'Single',
        religion: 'Moslem',
        placeOfBirth: 'Bandung',
        dateOfBirth: '21 February 2001',
        age: '24 Years Old',
        bloodType: 'A-B'
    };

    const contactInfo = {
        phone: '+62-856-3421-2001',
        email: 'sophiarose@mail.com'
    };

    const employmentInfo = {
        joinDate: '2019-Current (6 Years)',
        jobRole: employee.position,
        jobLevel: 'Senior / Lead',
        employmentStatus: 'Fulltime'
    };

    const positionHistory = [
        { year: '2021 - Current', role: 'Assistant UX Researcher', status: 'Fulltime', current: true },
        { year: '2020 - 2021', role: 'Jr. UX Researcher', status: 'Intern', current: false },
        { year: '2019 - 2020', role: 'UX Researcher Intern', status: 'Intern', current: false },
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-slate-900 overflow-y-auto">
            {/* Header Section (Reused layout for consistency) */}
            <div className="mb-6 p-6 pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Employee Details</h1>
                    <div className="flex gap-6 text-sm mt-4 border-b border-border-light dark:border-border-dark">
                        <button onClick={() => onTabChange('overview')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Overview</button>
                        <button onClick={() => onTabChange('activity')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Activity</button>
                        <button className="pb-3 border-b-2 border-primary text-primary font-medium">Personal Details</button>
                        <button onClick={() => onTabChange('attendance')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Attendance</button>
                        <button onClick={() => onTabChange('payroll')} className="pb-3 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light transition-colors">Payroll</button>
                    </div>
                </div>

                {/* Top Profile Card */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark mb-6">
                    <div className="flex items-center gap-4 mb-6 border-b border-border-light dark:border-border-dark pb-6">
                        <img src={employee.avatar.replace('150', '300')} alt={employee.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{employee.name}</h2>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{employee.position}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Check in</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">20 Minutes ago</div>
                        </div>
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Check out</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">-</div>
                        </div>
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Employee ID</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">{employee.id}</div>
                        </div>
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Status</div>
                            <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span> Active
                            </span>
                        </div>
                        <div>
                            <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Monthly Salary</div>
                            <div className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">$5,000</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column (Personal Details & Address) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Personal Details Card */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-2 mb-6 text-purple-600">
                                <span className="material-symbols-rounded">person</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base">Personal Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Full Name</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.fullName}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Gender</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.gender}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Martial Status</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.maritalStatus}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Religion</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.religion}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Place of Birth</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.placeOfBirth}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Birth of Date</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.dateOfBirth}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Age</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.age}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Blood Type</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{personalInfo.bloodType}</div>
                                </div>
                            </div>
                        </div>

                        {/* Address Information Card */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-2 mb-6 text-pink-500">
                                <span className="material-symbols-rounded">location_on</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base">Address Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Residential Address</div>
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-medium text-text-main-light dark:text-text-main-dark leading-relaxed max-w-md">
                                            Jl. Cihampelas Walk No. 160, Tamansari, Bandung Wetan, Bandung, West Java 40116, Indonesia
                                        </div>
                                        <button className="text-xs font-semibold text-text-main-light dark:text-text-main-dark border-b border-text-main-light dark:border-text-main-dark flex items-center">
                                            View on Map <span className="material-symbols-rounded text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Notes</div>
                                    <button className="text-xs font-semibold text-text-main-light dark:text-text-main-dark border-b border-text-main-light dark:border-text-main-dark">Add Notes</button>
                                </div>
                                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Citizen ID Address</div>
                                    <div className="text-sm font-medium text-text-main-light dark:text-text-main-dark leading-relaxed">
                                        Cluster Edelweiss B5 No. 12, Crystal Lotus Avenue, Podomoro Park Bandung,
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Contact, Employment, Position) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Contact Information */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-2 mb-6 text-blue-500">
                                <span className="material-symbols-rounded">contact_mail</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base">Contact Information</h3>
                            </div>

                            <div className="mb-4">
                                <div className="font-semibold text-sm text-text-main-light dark:text-text-main-dark mb-3">Personal Contact</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Phone Number</div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300">
                                            {contactInfo.phone}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Email</div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 truncate">
                                            {contactInfo.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="font-semibold text-sm text-text-main-light dark:text-text-main-dark mb-2">Other Contact</div>
                                <div className="text-xs text-text-muted-light dark:text-text-muted-dark">Not Provided</div>
                            </div>
                        </div>

                        {/* Employment Overview */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-2 mb-6 text-orange-500">
                                <span className="material-symbols-rounded">badge</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base">Employment Overview</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-y-6">
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Join Date</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{employmentInfo.joinDate}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Job Role</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{employmentInfo.jobRole}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Job Level</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{employmentInfo.jobLevel}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark mb-1">Employment Status</div>
                                    <div className="font-medium text-text-main-light dark:text-text-main-dark text-sm">{employmentInfo.employmentStatus}</div>
                                </div>
                            </div>
                        </div>

                        {/* Position History */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
                            <div className="flex items-center gap-2 mb-6 text-pink-600">
                                <span className="material-symbols-rounded">history_edu</span>
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark text-base">Position History</h3>
                            </div>

                            <div className="space-y-6 relative pl-2">
                                {/* Vertical Line */}
                                <div className="absolute left-[13px] top-2 bottom-4 w-[1px] border-l border-dashed border-gray-300 dark:border-gray-700"></div>

                                {positionHistory.map((pos, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-sm flex items-center justify-center z-10 ${pos.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400 dark:bg-slate-800'}`}>
                                            <span className="w-2.5 h-2.5 bg-current rounded-sm"></span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-text-main-light dark:text-text-main-dark mb-0.5">{pos.year}</div>
                                            <div className="font-bold text-text-main-light dark:text-text-main-dark text-sm">{pos.role}</div>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark">Job Status:</span>
                                                <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-text-muted-light dark:text-text-muted-dark">{pos.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
