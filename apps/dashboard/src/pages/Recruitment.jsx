import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// --- MOCK DATA ---

// Note: We will use jobs and candidates from state in the component.
// These mock constants will be phased out or used as fallback.


const PIPELINE_ROWS = [
    {
        role: 'Research and Development Officer',
        type: 'Fulltime • Jakarta',
        data: [129, 12, 45, 12, 4]
    },
    {
        role: 'Technical Product Manager',
        type: 'Fulltime • Jakarta',
        data: [631, 12, 31, 31, 0]
    },
    {
        role: 'Content Designer / UX Writer',
        type: 'Fulltime • Jakarta',
        data: [621, 41, 52, 0, 0]
    },
    {
        role: 'Automation QA Engineer',
        type: 'Fulltime • Jakarta',
        data: [423, 47, 0, 0, 0]
    }
];

const STATS_DATA = [
    { name: 'Mon', value: 150 },
    { name: 'Tue', value: 200 },
    { name: 'Wed', value: 350 },
    { name: 'Thu', value: 500 }, // Highlighted in image
    { name: 'Fri', value: 250 },
];

const SOURCE_DATA = [
    { name: 'Job boards', value: 100, color: '#8B5CF6' }, // Purple
    { name: 'Social', value: 70, color: '#FBBF24' },      // Yellow
    { name: 'Website', value: 30, color: '#EC4899' },     // Pink
    { name: 'Others', value: 10, color: '#F97316' },      // Orange
];

const CANDIDATES_DATA = [
    { id: 1, name: 'Noah Kenji Tanaka', job: 'Motion Designer', date: '10/28/12', stage: 'On Boarding', score: '70.34%', scoreColor: 'text-purple-600 bg-purple-50', email: 'kenji@mail.com', phone: '082145340512', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Dante Haru Nakamura', job: 'Software Engineer', date: '2/11/12', stage: 'Screening', score: '98.4%', scoreColor: 'text-emerald-500 bg-emerald-50', email: 'nakamura@mail.com', phone: '082109802343', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Dante Haru Nakamura', job: 'Mobile Engineer (...)', date: '5/19/12', stage: 'Interview', score: '70.34%', scoreColor: 'text-purple-600 bg-purple-50', email: 'nakamura@mail.com', phone: '082145344069', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Dante Haru Nakamura', job: 'Automation QA E...', date: '3/4/16', stage: 'Screening', score: '98.4%', scoreColor: 'text-emerald-500 bg-emerald-50', email: 'nakamura@mail.com', phone: '082154549868', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Dante Haru Nakamura', job: 'Security Engineer', date: '9/23/16', stage: 'Interview', score: '70.34%', scoreColor: 'text-purple-600 bg-purple-50', email: 'nakamura@mail.com', phone: '082109340865', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Dante Haru Nakamura', job: 'Site Reliability En...', date: '7/18/17', stage: 'Applied', score: '70.34%', scoreColor: 'text-purple-600 bg-purple-50', email: 'nakamura@mail.com', phone: '082104958246', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'Dante Haru Nakamura', job: 'Technical Produc...', date: '9/4/12', stage: 'Screening', score: '68.4%', scoreColor: 'text-amber-500 bg-amber-50', email: 'nakamura@mail.com', phone: '082158423437', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Dante Haru Nakamura', job: 'Interaction Desig...', date: '5/27/15', stage: 'Applied', score: '20.3%', scoreColor: 'text-red-500 bg-red-50', email: 'nakamura@mail.com', phone: '082109458304', avatar: 'https://i.pravatar.cc/150?u=8' },
    { id: 9, name: 'Dante Haru Nakamura', job: 'Brand Designer', date: '1/28/17', stage: 'Interview', score: '20.3%', scoreColor: 'text-red-500 bg-red-50', email: 'nakamura@mail.com', phone: '082104985234', avatar: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: 'Dante Haru Nakamura', job: 'Machine Learnin...', date: '4/4/18', stage: 'Screening', score: '68.4%', scoreColor: 'text-amber-500 bg-amber-50', email: 'nakamura@mail.com', phone: '082143513474', avatar: 'https://i.pravatar.cc/150?u=10' },
];
const SCHEDULE_DATA = [
    { id: 1, title: 'Interview - UX Engineer', time: '09:00-10:20', description: 'Scheduled interview to discuss her UX experience.', startHour: 9, date: 12 },
    { id: 2, title: 'Interview - Frontend Dev', time: '10:00-11:00', description: 'Technical assessment and live coding.', startHour: 10, date: 12 },
    { id: 3, title: 'Interview - PM', time: '11:00-12:00', description: 'Product sense and case study discussion.', startHour: 11, date: 12 },
    { id: 4, title: 'Interview - UX Writer', time: '09:00-09:45', description: 'Portfolio review.', startHour: 9, date: 12 },
    { id: 5, title: 'Interview - QA', time: '14:00-15:00', description: 'Bug hunting challenge.', startHour: 14, date: 12 },
    { id: 6, title: 'Interview - Backend', time: '12:00-13:00', description: 'System design interview.', startHour: 12, date: 12 },
    { id: 7, title: 'Interview - HR', time: '09:00-09:30', description: 'Culture fit check.', startHour: 9, date: 13 }, // Different day
    { id: 8, title: 'Interview - UX Engineer', time: '09:00-10:20', description: 'Scheduled interview to discuss her UX experience.', startHour: 9, date: 12 }, // Duplicate slot for visual stacking
    { id: 9, title: 'Interview - UX Engineer', time: '12:00-13:00', description: 'Second round.', startHour: 12, date: 12 },
    { id: 10, title: 'Interview - Designer', time: '15:00-16:00', description: 'Final round.', startHour: 15, date: 12 },
];

const JOBS_VIEW_DATA = [
    {
        id: 1,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'LinkedIn',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
    {
        id: 2,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'Indeed',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
    {
        id: 3,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'Glassdoor',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
    // Duplicating for grid effect
    {
        id: 4,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'Glassdoor',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
    {
        id: 5,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'LinkedIn',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
    {
        id: 6,
        status: 'Open',
        department: 'Development',
        role: 'Full Stack React Developer',
        platform: 'Indeed',
        date: '28 Nov, 2025',
        salary: '$230k - 260k annually',
        applied: 20,
        interviewed: 18,
        tags: ['Onsite', 'Full Time', '2 Years exp', '2 Position'],
    },
];

const ScheduleView = () => {
    const [selectedDate, setSelectedDate] = useState(12);
    const [viewMonth, setViewMonth] = useState('December 2025');

    // Generate dates for the specific view (e.g., Dec 1 - Dec 21 based on image)
    const dates = Array.from({ length: 21 }, (_, i) => {
        const d = i + 1;
        const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        // Mocking day name alignment for Dec 2025 (Dec 1 2025 is Monday, but let's just match the mocked visual "sun 01" for simplicity/robustness if user wants exact visual match)
        // Image shows "sun 01". Let's stick to the image.
        const dayIndex = (i) % 7;
        return { date: d, day: dayNames[dayIndex] };
    });

    const timeSlots = [9, 10, 11, 12, 13, 14, 15]; // Hours

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
            {/* Controls */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                    <span className="material-symbols-rounded">chevron_left</span> Previous
                </button>
                <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span className="material-symbols-rounded text-slate-400">calendar_month</span> {viewMonth}
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                    Next <span className="material-symbols-rounded">chevron_right</span>
                </button>
            </div>

            {/* Date Strip */}
            <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                {dates.map((item) => (
                    <button
                        key={item.date}
                        onClick={() => setSelectedDate(item.date)}
                        className={`flex-1 min-w-[70px] py-4 flex flex-col items-center gap-1 border-r border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group relative ${selectedDate === item.date ? 'bg-purple-50/50' : ''}`}
                    >
                        <span className={`text-xs font-bold uppercase ${selectedDate === item.date ? 'text-[#7C3AED]' : 'text-slate-400 group-hover:text-slate-600'}`}>{item.day}</span>
                        <span className={`text-lg font-black ${selectedDate === item.date ? 'text-[#7C3AED]' : 'text-slate-700'}`}>{item.date.toString().padStart(2, '0')}</span>
                        {selectedDate === item.date && (
                            <div className="absolute bottom-0 w-full h-1 bg-[#7C3AED]"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="overflow-x-auto p-6 wfm-scroll flex-1">
                <div className="min-w-[1000px] grid grid-cols-7 gap-6">
                    {/* Headers */}
                    {timeSlots.map((hour) => (
                        <div key={hour} className="text-center space-y-4">
                            <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${hour === 12 ? 'bg-[#7C3AED] text-white' : 'text-slate-500'}`}>
                                {hour.toString().padStart(2, '0')}:00
                            </span>

                            {/* Slots */}
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((slotIndex) => {
                                    // Find event for this hour, date, and "slot index" (simple mocking: just distribute events)
                                    // For simplicity, we just filter events for this hour/date and pick one by index
                                    const eventsAtThisTime = SCHEDULE_DATA.filter(e => e.startHour === hour && e.date === selectedDate);
                                    const event = eventsAtThisTime[slotIndex - 1]; // map slot 1 to index 0

                                    if (event) {
                                        return (
                                            <div key={event.id} className="bg-pink-50 rounded-xl p-3 border-l-4 border-pink-400 hover:shadow-md transition-shadow cursor-pointer text-left h-[120px] flex flex-col justify-between">
                                                <div>
                                                    <div className="flex gap-1 mb-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                                                        <div className="w-1.5 h-1.5 rounded-full bg-pink-300"></div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[10px] text-pink-500 font-bold mb-1">
                                                        <span className="material-symbols-rounded text-[10px]">schedule</span> {event.time}
                                                    </div>
                                                    <h5 className="font-bold text-slate-800 text-xs leading-snug">{event.title}</h5>
                                                </div>
                                                <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed opacity-80">{event.description}</p>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={`empty-${hour}-${slotIndex}`} className="bg-slate-50 rounded-xl p-3 h-[120px] flex items-center justify-center border border-slate-100/50">
                                                <div className="flex gap-1 opacity-20">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const CANDIDATE_DETAIL_DATA = {
    id: 1,
    name: 'Rose Nakamura',
    role: 'Senior UX Engineer',
    status: 'Waiting Interview',
    match: 98,
    exp: '6 years',
    appliedDate: 'November 12, 2025',
    source: 'LinkedIn',
    avatar: 'https://i.pravatar.cc/300?u=rose',
    gender: 'Female',
    dob: 'Feb 21, 2004',
    email: 'rose.nakamura@mail.com',
    phone: '+62 892 - 2342 - 3241',
    address: 'Senopati Suites Jakarta 12190',
    overview: 'A senior UX Engineer with extensive experience in designing, prototyping, and delivering user-centered digital products. She blends strong technical understanding with deep UX principles, enabling her to translate complex requirements into intuitive, scalable interfaces. Her expertise includes design systems, interaction design, front-end collaboration, and cross-functional product development.',
    experiences: [
        {
            company: 'VSCodium',
            role: 'Senior UX Engineer',
            date: 'January 2021 – Present',
            color: 'bg-pink-500',
            description: [
                'Led UX engineering for web/mobile with scalable design system integration.',
                'Built high-fidelity prototypes and refined user flows with product & engineering teams.',
                'Improved design-dev handoff efficiency, cutting integration time by 30%.'
            ]
        },
        {
            company: 'Anthropic',
            role: 'UX Engineer',
            date: 'Jul 2017 - Dec 2020',
            color: 'bg-purple-500',
            description: [
                'Crafted interactive prototypes and behavior specs for multi-team development.',
                'Conducted usability iterations that boosted task success by 20%.',
                'Designed micro-interactions to improve clarity and engagement.'
            ]
        }
    ],
    education: [
        {
            school: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Master of Science in Human-Computer Interaction',
            date: '2019 – 2021',
            color: 'bg-indigo-500',
            description: [
                'Specialized in Interaction Design and Cognitive Systems.',
                'Thesis explored UX Engineering integration within Agile workflows.'
            ]
        },
        {
            school: 'University of California, Berkeley',
            degree: 'Bachelor of Science in Computer Science & Design',
            date: '2013 – 2017',
            color: 'bg-violet-500',
            description: []
        }
    ]
};

const JOB_DETAIL_DATA = {
    id: 1,
    title: 'UX Engineer',
    postedAt: '28 November 2025',
    closedAt: '12 December 2025',
    daysToGo: 6,
    description: 'Responsible for translating product ideas into intuitive, high-performing interfaces. This role bridges design and engineering—crafting seamless user experiences, building interactive prototypes, and ensuring every flow feels effortless and human-centered',
    responsibilities: [
        'Develop intuitive and scalable user interfaces by combining strong technical skills with user-centered design principles.',
        'Collaborate closely with designers, product managers, and engineers to refine user flows, interactions, and overall usability.',
        'Build high-fidelity interactive prototypes to validate concepts, explore solutions, and support development handoff.',
        'Ensure design quality through continuous testing, iteration, and performance optimization across platforms.',
        'Ensure design quality through continuous testing, iteration, and performance optimization across platforms.'
    ],
    details: {
        role: 'Research and development',
        placement: 'On Site',
        type: 'Fulltime',
        experience: '5-6 Years',
        salary: '$2,887.75 - $3,369.04',
        location: 'West Jakarta'
    },
    stats: [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 52 },
        { name: 'Wed', value: 49 },
        { name: 'Thu', value: 62 },
        { name: 'Fri', value: 58 },
        { name: 'Sat', value: 64 },
        { name: 'Sun', value: 68 },
    ]
};

const JobDetail = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-1">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{JOB_DETAIL_DATA.title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pl-12">
                    <span>Recruitment</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span>Jobs</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span className="text-slate-800">Jobs details</span>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 max-w-[1600px] mx-auto w-full">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Hiring Period */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className="material-symbols-rounded text-orange-500">calendar_today</span> Hiring Period
                            </h4>
                            <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                                <span className="material-symbols-rounded text-base">edit</span> Edit
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-4 text-sm">
                            <div className="w-full sm:w-auto">
                                <div className="text-slate-400 text-xs mb-1">Posted at</div>
                                <div className="font-bold text-slate-800">{JOB_DETAIL_DATA.postedAt}</div>
                            </div>
                            <div className="hidden sm:flex px-8 text-slate-300">
                                <span className="material-symbols-rounded">arrow_forward</span>
                            </div>
                            <div className="w-full sm:w-auto">
                                <div className="text-slate-400 text-xs mb-1">Closed at</div>
                                <div className="font-bold text-slate-800">{JOB_DETAIL_DATA.closedAt}</div>
                            </div>
                            <div className="w-full sm:flex-1 text-right flex justify-end items-center gap-2 font-bold text-purple-600">
                                <div className="w-5 h-5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                                {JOB_DETAIL_DATA.daysToGo} Days to go
                            </div>
                        </div>
                    </div>

                    {/* About this job */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className="material-symbols-rounded text-purple-500">work</span> About this job
                            </h4>
                            <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                                <span className="material-symbols-rounded text-base">edit</span> Edit
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {JOB_DETAIL_DATA.description} <span className="text-purple-600 font-bold cursor-pointer hover:underline">read more.</span>
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                            <span className="material-symbols-rounded text-blue-500">person</span> Responsibilities
                        </h4>
                        <div className="space-y-3">
                            {JOB_DETAIL_DATA.responsibilities.map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow group bg-slate-50/50">
                                    <span className="material-symbols-rounded text-slate-300 cursor-move">drag_indicator</span>
                                    <p className="text-sm text-slate-600 flex-1 leading-relaxed">{item}</p>
                                    <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                                        <button className="text-slate-400 hover:text-blue-500"><span className="material-symbols-rounded text-lg">edit</span></button>
                                        <button className="text-slate-400 hover:text-red-500"><span className="material-symbols-rounded text-lg">close</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Hiring Details */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-slate-800">Hiring Details</h4>
                            <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50">
                                <span className="material-symbols-rounded text-base">edit</span> Edit
                            </button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { icon: 'work', label: 'Job Role', val: JOB_DETAIL_DATA.details.role },
                                { icon: 'domain', label: 'Job Placement', val: JOB_DETAIL_DATA.details.placement },
                                { icon: 'schedule', label: 'Type', val: JOB_DETAIL_DATA.details.type },
                                { icon: 'history', label: 'Experience', val: JOB_DETAIL_DATA.details.experience },
                                { icon: 'payments', label: 'Salary', val: JOB_DETAIL_DATA.details.salary },
                                { icon: 'location_on', label: 'Location', val: JOB_DETAIL_DATA.details.location },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <span className="material-symbols-rounded text-slate-400 text-lg mt-0.5">{item.icon}</span>
                                    <div>
                                        <div className="text-xs text-slate-400 font-medium mb-0.5">{item.label}</div>
                                        <div className="text-sm font-bold text-slate-700">{item.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Job Statistic */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-slate-800">Job Statistic</h4>
                            <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-lg px-2 py-1 hover:bg-slate-50">
                                Weekly <span className="material-symbols-rounded text-sm">expand_more</span>
                            </button>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={JOB_DETAIL_DATA.stats}>
                                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        hide={false}
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        tickFormatter={(val) => `${val}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8B5CF6"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0, fill: '#8B5CF6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CandidateDetail = ({ onBack }) => {
    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-1">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Candidate details</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pl-12">
                    <span>Recruitment</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span>Candidate</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span className="text-slate-800">Candidate details</span>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 xl:grid-cols-[320px_1fr_300px] gap-6 max-w-[1600px] mx-auto w-full">
                {/* Left Sidebar - Profile */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                        <div className="w-24 h-24 rounded-full p-1 bg-white border border-slate-100 shadow-sm mb-4 relative">
                            <img src={CANDIDATE_DETAIL_DATA.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{CANDIDATE_DETAIL_DATA.name}</h3>
                        <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-600 text-xs font-bold rounded-full mt-2 mb-4">
                            {CANDIDATE_DETAIL_DATA.status}
                        </span>

                        <div className="grid grid-cols-2 gap-4 w-full mb-4">
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span className="material-symbols-rounded text-purple-500 text-lg">person_search</span>
                                <div className="text-sm font-bold text-slate-700">{CANDIDATE_DETAIL_DATA.match} matched</div>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span className="material-symbols-rounded text-blue-500 text-lg">work_history</span>
                                <div className="text-sm font-bold text-slate-700">{CANDIDATE_DETAIL_DATA.exp}</div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 mb-6">
                            Applied on {CANDIDATE_DETAIL_DATA.appliedDate}<br />via {CANDIDATE_DETAIL_DATA.source}
                        </p>

                        <div className="flex items-center gap-2 w-full">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-rounded">more_vert</span>
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-rounded">mail</span>
                            </button>
                            <button className="flex-1 h-10 bg-purple-100 text-purple-700 text-sm font-bold rounded-xl hover:bg-purple-200 transition-colors">
                                Scheduled
                            </button>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Personal Info</h4>
                        <div className="space-y-4">
                            {[
                                { icon: 'female', label: 'Gender', val: CANDIDATE_DETAIL_DATA.gender },
                                { icon: 'cake', label: 'Date of Birth', val: CANDIDATE_DETAIL_DATA.dob },
                                { icon: 'mail', label: 'Email', val: CANDIDATE_DETAIL_DATA.email },
                                { icon: 'call', label: 'Phone', val: CANDIDATE_DETAIL_DATA.phone },
                                { icon: 'home', label: 'Address', val: CANDIDATE_DETAIL_DATA.address },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                        <span className="material-symbols-rounded text-lg">{item.icon}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                                        <p className="text-sm font-bold text-slate-700 truncate">{item.val}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Social Links</h4>
                        <div className="flex gap-3">
                            {['language', 'code', 'photo_camera'].map((icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors">
                                    <span className="material-symbols-rounded">{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Hiring Process */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Hiring Process</h4>
                        <div className="grid grid-cols-4 gap-1 h-10">
                            <div className="bg-[#3B82F6] text-white flex items-center justify-center text-xs font-bold rounded-l-full relative" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}>Reviewed</div>
                            <div className="bg-[#FBBF24] text-white flex items-center justify-center text-xs font-bold relative -ml-2 pl-2" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)' }}>Screening</div>
                            <div className="bg-[#F97316] text-white flex items-center justify-center text-xs font-bold relative -ml-2 pl-2" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)' }}>Interview</div>
                            <div className="bg-slate-100 flex items-center justify-center text-xs font-bold rounded-r-full relative -ml-2 pl-2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%)' }}> - </div>
                        </div>
                    </div>

                    {/* Overview */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-3">Overview</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {CANDIDATE_DETAIL_DATA.overview}
                        </p>
                    </div>

                    {/* Experience */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-6">Experience</h4>
                        <div className="relative pl-6 border-l border-slate-200 space-y-8">
                            {CANDIDATE_DETAIL_DATA.experiences.map((exp, i) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[29px] w-4 h-4 rounded-full ${exp.color} ring-4 ring-white`}></div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-bold text-slate-800">{exp.company}</h5>
                                    </div>
                                    <p className="text-xs text-slate-500 font-semibold mb-3">{exp.role} • {exp.date}</p>
                                    <ul className="list-disc list-outside ml-4 text-xs text-slate-500 space-y-1">
                                        {exp.description.map((desc, d) => (
                                            <li key={d}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-6">Education</h4>
                        <div className="relative pl-6 border-l border-slate-200 space-y-8">
                            {CANDIDATE_DETAIL_DATA.education.map((edu, i) => (
                                <div key={i} className="relative">
                                    <div className={`absolute -left-[29px] w-4 h-4 rounded-full ${edu.color} ring-4 ring-white`}></div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-bold text-slate-800">{edu.school}</h5>
                                    </div>
                                    <p className="text-xs text-slate-500 font-semibold mb-3">{edu.degree} • {edu.date}</p>
                                    <ul className="list-disc list-outside ml-4 text-xs text-slate-500 space-y-1">
                                        {edu.description.map((desc, d) => (
                                            <li key={d}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Widgets */}
                <div className="space-y-6">
                    {/* Score */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Score</h4>
                        <div className="bg-slate-50 rounded-xl p-4 text-center mb-6">
                            <div className="text-xs text-slate-400 font-bold uppercase mb-1">Overall Score</div>
                            <div className="text-3xl font-black text-slate-800">96% <span className="text-xs font-semibold text-slate-400 ml-1">Matched</span></div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: 'Application Completeness', val: '10/10', pct: '100%', color: 'bg-purple-500' },
                                { label: 'Skill Match', val: '20/24', pct: '85%', color: 'bg-blue-500' },
                                { label: 'Culture Fit', val: '19/24', pct: '80%', color: 'bg-pink-500' },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                                        <span>{item.label}</span>
                                        <span>{item.val}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Schedule */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Upcoming Schedule</h4>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <h5 className="font-bold text-slate-800 text-sm mb-3">Technical Interview</h5>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-slate-400 font-medium">Date and Time</div>
                                    <div className="text-slate-700 font-bold">rose.nakamura@mail.com</div> {/* As per image text, looks odd but matching it */}
                                </div>
                                <div>
                                    <div className="text-slate-400 font-medium">Platform</div>
                                    <div className="text-slate-700 font-bold">Google Meet</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-medium mb-1">Participants</div>
                                    <div className="flex -space-x-2">
                                        <img src="https://i.pravatar.cc/100?u=hr" className="w-6 h-6 rounded-full border border-white" />
                                        <img src="https://i.pravatar.cc/100?u=mgr" className="w-6 h-6 rounded-full border border-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Applied */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Job Applied</h4>
                        <div className="border border-slate-100 rounded-xl p-4">
                            <div className="flex gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-rounded">code</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-800 text-sm">UX Engineer</h5>
                                    <p className="text-xs text-slate-400">IT</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">Fulltime</span>
                                <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">On-Site</span>
                            </div>
                            <div className="space-y-2 text-xs text-slate-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded text-base">bar_chart</span> Senior Level
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-rounded text-base">work_history</span> 6 Years Experience
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const CreateJob = ({ onBack }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [jobData, setJobData] = useState({
        title: '',
        category: 'Design',
        type: 'Fulltime',
        quota: 12,
        period: '12 Nov - 8 Dec',
        experience: '2-3 Years',
        salary: '',
        location: 'Jakarta',
        skills: ['UIX Design', 'Research', 'Creative'],
    });

    const [requirements, setRequirements] = useState([
        'Ensure design quality through continuous testing, iteration, and performance optimization across platforms.',
        'Develop intuitive and scalable user interfaces by combining strong technical skills with user-centered design principles.',
        'Collaborate closely with designers, product managers, and engineers to refine user flows, interactions, and overall usability.',
        'Build high-fidelity interactive prototypes to validate concepts, explore solutions, and support development handoff.'
    ]);
    const [isAddingReq, setIsAddingReq] = useState(false);
    const [newReqText, setNewReqText] = useState('');
    const [editingReqIndex, setEditingReqIndex] = useState(-1);
    const [editReqText, setEditReqText] = useState('');

    const handleNext = () => {
        if (currentStep === 3) {
            console.log('Final Job Submission:', { ...jobData, requirements });
        }
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        else onBack();
    };

    const addRequirement = () => {
        if (newReqText.trim()) {
            setRequirements([newReqText, ...requirements]);
            setNewReqText('');
            setIsAddingReq(false);
        }
    };

    const saveEditing = () => {
        if (editReqText.trim()) {
            const newReqs = [...requirements];
            newReqs[editingReqIndex] = editReqText;
            setRequirements(newReqs);
            setEditingReqIndex(-1);
            setEditReqText('');
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-1">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-rounded">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Create Job</h2>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pl-12">
                    <span>Recruitment</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span>Jobs</span>
                    <span className="material-symbols-rounded text-[10px]">chevron_right</span>
                    <span className="text-slate-800">Create job</span>
                </div>
            </div>

            <div className="p-6 w-full">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-8 px-4 md:px-12 relative">
                    {/* Line */}
                    <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10"></div>
                    {/* Active Line Progress */}
                    <div
                        className="absolute left-12 top-1/2 -translate-y-1/2 h-0.5 bg-purple-500 -z-10 transition-all duration-300"
                        style={{ right: currentStep === 1 ? 'calc(100% - 48px)' : currentStep === 2 ? '50%' : '48px' }}
                    ></div>

                    {/* Step 1 */}
                    <div className={`flex items-center gap-2 pr-4 bg-slate-50 transition-colors`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${currentStep >= 1 ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-500'}`}>01</div>
                        <span className={`font-bold text-sm ${currentStep >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Job Details</span>
                    </div>
                    {/* Step 2 */}
                    <div className={`flex items-center gap-2 px-4 bg-slate-50 transition-colors`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${currentStep >= 2 ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-500'}`}>02</div>
                        <span className={`font-bold text-sm ${currentStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>Job Requirements</span>
                    </div>
                    {/* Step 3 */}
                    <div className={`flex items-center gap-2 pl-4 bg-slate-50 transition-colors`}>
                        <div className={`w-8 h-8 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm transition-colors ${currentStep >= 3 ? 'bg-purple-100 text-purple-600' : 'bg-slate-200 text-slate-500'}`}>03</div>
                        <span className={`font-bold text-sm ${currentStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Summary</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    {currentStep === 1 && (
                        <>
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Job Details</h3>

                            {/* Cover Image */}
                            <div className="h-32 md:h-40 bg-gradient-to-r from-orange-100 via-pink-100 to-rose-100 rounded-xl mb-8 relative overflow-hidden group">
                                <img src="https://img.freepik.com/free-photo/abstract-textured-backgound_125540-1033.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" alt="cover" />
                                <button className="absolute bottom-4 right-4 bg-white text-slate-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                    Change cover <span className="material-symbols-rounded text-lg">image</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Job Title */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior UX Designer"
                                        value={jobData.title}
                                        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Row 1 */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Category / Department</label>
                                        <div className="relative">
                                            <select
                                                value={jobData.category}
                                                onChange={(e) => setJobData({ ...jobData, category: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none text-slate-600"
                                            >
                                                <option>Design</option>
                                                <option>Engineering</option>
                                                <option>Product</option>
                                                <option>Marketing</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Job Type</label>
                                        <div className="relative">
                                            <select
                                                value={jobData.type}
                                                onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none text-slate-600"
                                            >
                                                <option>Fulltime</option>
                                                <option>Contract</option>
                                                <option>Freelance</option>
                                                <option>Internship</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Recruitment Quota</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={jobData.quota}
                                                onChange={(e) => setJobData({ ...jobData, quota: parseInt(e.target.value) || 0 })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-600"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                                                <button onClick={() => setJobData(prev => ({ ...prev, quota: prev.quota + 1 }))} className="text-slate-400 hover:text-purple-500"><span className="material-symbols-rounded text-sm">expand_less</span></button>
                                                <button onClick={() => setJobData(prev => ({ ...prev, quota: Math.max(0, prev.quota - 1) }))} className="text-slate-400 hover:text-purple-500"><span className="material-symbols-rounded text-sm">expand_more</span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Recruitment Period</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={jobData.period}
                                                onChange={(e) => setJobData({ ...jobData, period: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-600"
                                            />
                                            <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">calendar_month</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-3">Experience Level</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['No needed', '< 1 Year', '2-3 Years', '4-5 Years', '5-7 Years', '8 Years+'].map((level, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setJobData({ ...jobData, experience: level })}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${jobData.experience === level ? 'bg-purple-100 text-purple-700 border-purple-200 ring-2 ring-purple-500/20' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                                            >
                                                {jobData.experience === level && <span className="material-symbols-rounded text-sm mr-1 align-middle">check_circle</span>}
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Expected Salary</label>
                                        <div className="flex gap-2">
                                            <div className="relative w-24 shrink-0">
                                                <div className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm flex items-center gap-2">
                                                    <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" className="w-5 h-3.5 rounded-sm object-cover" />
                                                    <span className="font-bold text-slate-700">USD</span>
                                                    <span className="material-symbols-rounded text-slate-400 text-sm ml-auto">expand_more</span>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Enter amount"
                                                value={jobData.salary}
                                                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-2">Location</label>
                                        <div className="relative">
                                            <select
                                                value={jobData.location}
                                                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none text-slate-600"
                                            >
                                                <option>Jakarta</option>
                                                <option>New York</option>
                                                <option>London</option>
                                                <option>Remote</option>
                                            </select>
                                            <span className="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skill Sets */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Skill Sets</label>
                                    <div className="w-full min-h-[48px] px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-2">
                                        {jobData.skills.map((skill, i) => (
                                            <div key={i} className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                                                {skill}
                                                <button
                                                    onClick={() => setJobData({ ...jobData, skills: jobData.skills.filter((_, idx) => idx !== i) })}
                                                    className="hover:text-purple-900 flex items-center"
                                                >
                                                    <span className="material-symbols-rounded text-sm">close</span>
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            className="bg-transparent border-none focus:ring-0 text-sm p-1.5 placeholder:text-slate-400 min-w-[100px]"
                                            placeholder="Add skill..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    setJobData({ ...jobData, skills: [...jobData.skills, e.target.value.trim()] });
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Job Description (Mock Editor) */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2">Job Description</label>
                                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                                        {/* Toolbar */}
                                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1 overflow-x-auto">
                                            {/* Text Size */}
                                            <button className="flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold text-slate-600 mr-2">
                                                16px <span className="material-symbols-rounded text-sm">expand_more</span>
                                            </button>
                                            <button className="flex items-center gap-1 px-2 py-1 hover:bg-slate-200 rounded text-xs font-bold text-slate-600 mr-2 border-r border-slate-300 pr-3">
                                                Hierarchy <span className="material-symbols-rounded text-sm">expand_more</span>
                                            </button>

                                            {['format_bold', 'format_italic', 'format_underlined', 'format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify', 'format_quote', 'image', 'link'].map((icon, i) => (
                                                <button key={i} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition-colors">
                                                    <span className="material-symbols-rounded text-lg">{icon}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {/* Editor Area */}
                                        <div
                                            className="p-4 min-h-[150px] bg-white text-sm text-slate-600 focus-within:outline-none"
                                            contentEditable
                                            onInput={(e) => setJobData({ ...jobData, description: e.currentTarget.innerHTML })}
                                            dangerouslySetInnerHTML={{ __html: jobData.description }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </>
                    )}

                    {/* --- STEP 2: JOB REQUIREMENTS --- */}
                    {currentStep === 2 && (
                        <>
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Job Requirements</h3>

                            <div className="space-y-6">
                                {/* Add Requirement Button */}
                                <div>
                                    <button
                                        onClick={() => setIsAddingReq(true)}
                                        className="flex items-center gap-3 text-slate-700 font-bold text-sm hover:text-purple-700 transition-colors group"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm group-hover:bg-purple-700 transition-colors">
                                            <span className="material-symbols-rounded text-lg">add</span>
                                        </div>
                                        Add New Requirements
                                    </button>
                                </div>

                                {isAddingReq && (
                                    <div className="flex gap-4 items-start animate-in fade-in slide-in-from-top-2">
                                        <div className="pt-3 text-purple-300">
                                            <span className="material-symbols-rounded cursor-move">drag_indicator</span>
                                        </div>
                                        <div className="flex-1 p-4 border border-purple-200 rounded-xl shadow-sm bg-purple-50/10 ring-1 ring-purple-500/20">
                                            <textarea
                                                autoFocus
                                                value={newReqText}
                                                onChange={(e) => setNewReqText(e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-700 p-0 resize-none font-medium placeholder:text-slate-400"
                                                placeholder="Type requirement here..."
                                                rows={2}
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button onClick={() => setIsAddingReq(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                                                <button onClick={addRequirement} className="bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-purple-700 transition-colors">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {requirements.map((req, i) => (
                                        <div key={i} className="flex gap-4 items-start group">
                                            {/* Drag Handle */}
                                            <div className={`pt-3 cursor-move ${i === 0 ? 'text-purple-300' : 'text-slate-300 hover:text-slate-400'}`}>
                                                <span className="material-symbols-rounded">drag_indicator</span>
                                            </div>

                                            {/* Content Item */}
                                            {editingReqIndex === i ? (
                                                <div className="flex-1 p-4 border border-blue-500 ring-1 ring-blue-500/20 rounded-xl bg-blue-50/10 shadow-sm animate-in fade-in zoom-in-95">
                                                    <textarea
                                                        autoFocus
                                                        value={editReqText}
                                                        onChange={(e) => setEditReqText(e.target.value)}
                                                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-700 p-0 resize-none font-medium placeholder:text-slate-400"
                                                        rows={2}
                                                    />
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button onClick={() => setEditingReqIndex(-1)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                                                        <button onClick={saveEditing} className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 shadow-sm transition-all">Save</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`flex-1 px-4 py-3.5 border rounded-xl flex justify-between items-start gap-4 transition-all 
                                                    ${i === 0 ? 'border-purple-300 ring-2 ring-purple-100 bg-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}>

                                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{req}</p>

                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => { setEditingReqIndex(i); setEditReqText(req); }}
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                                                        >
                                                            <span className="material-symbols-rounded text-lg">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}
                                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors"
                                                        >
                                                            <span className="material-symbols-rounded text-lg">close</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- STEP 3: SUMMARY --- */}
                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Summary</h3>

                            <div className="space-y-6">
                                {/* Hiring Period */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2 text-slate-800 font-bold">
                                            <span className="material-symbols-rounded text-orange-500">calendar_month</span>
                                            Hiring Period
                                        </div>
                                        <button onClick={() => setCurrentStep(1)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purple-600 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-lg transition-colors">
                                            <span className="material-symbols-rounded text-sm">edit</span> Edit
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-8 pl-8">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-1">Posted at</p>
                                            <p className="text-sm font-bold text-slate-700">28 November 2025</p>
                                        </div>
                                        <div className="text-slate-300">
                                            <span className="material-symbols-rounded">arrow_right_alt</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 mb-1">Closed at</p>
                                            <p className="text-sm font-bold text-slate-700">12 December 2025</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hiring Details */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="font-bold text-slate-800">Hiring Details</h4>
                                        <button onClick={() => setCurrentStep(1)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purple-600 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-lg transition-colors">
                                            <span className="material-symbols-rounded text-sm">edit</span> Edit
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">work</span> Job Role
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{jobData.title || jobData.category}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">business</span> Job Placement
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">On Site</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">description</span> Type
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{jobData.type}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">schedule</span> Experience
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{jobData.experience}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">payments</span> Salary
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{jobData.salary ? `$${jobData.salary}` : '-'}</p>
                                        </div>
                                        <div className="md:col-span-1">
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
                                                <span className="material-symbols-rounded text-sm">location_on</span> Location
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{jobData.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* About this job */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2 text-slate-800 font-bold">
                                            <span className="material-symbols-rounded text-purple-500">work</span>
                                            About this job
                                        </div>
                                        <button onClick={() => setCurrentStep(1)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purple-600 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-lg transition-colors">
                                            <span className="material-symbols-rounded text-sm">edit</span> Edit
                                        </button>
                                    </div>
                                    <div
                                        className="text-sm text-slate-600 leading-relaxed pl-8"
                                        dangerouslySetInnerHTML={{ __html: jobData.description || 'No description provided.' }}
                                    ></div>
                                </div>

                                {/* Responsibilities */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2 text-slate-800 font-bold">
                                            <span className="material-symbols-rounded text-blue-500">person</span>
                                            Responsibilities
                                        </div>
                                        <button onClick={() => setCurrentStep(2)} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-purple-600 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-lg transition-colors">
                                            <span className="material-symbols-rounded text-sm">edit</span> Edit
                                        </button>
                                    </div>
                                    <div className="space-y-3 pl-8">
                                        {requirements.length > 0 ? requirements.map((req, i) => (
                                            <div key={i} className="flex gap-4 items-start border border-slate-100 rounded-xl p-3 bg-slate-50/50">
                                                <span className="material-symbols-rounded text-slate-300 pt-0.5 text-lg">drag_indicator</span>
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">{req}</p>
                                            </div>
                                        )) : (
                                            <p className="text-sm text-slate-400 italic">No requirements added.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STEP 4: SUCCESS --- */}
                    {currentStep === 4 && (
                        <div className="text-center py-20 animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-rounded text-4xl">check_circle</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Job Created Successfully!</h3>
                            <p className="text-slate-500 mb-8 max-w-md mx-auto">Your new job posting has been created and is now live. Candidates can start applying immediately.</p>
                            <button onClick={onBack} className="bg-[#7C3AED] text-white px-8 py-3 rounded-xl font-bold shadow-sm hover:bg-purple-700 transition-all">
                                Back to Jobs
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {currentStep < 4 && (
                        <div className="flex justify-end gap-3 pt-8 border-t border-slate-50 mt-8">
                            <button onClick={handleBack} className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors flex items-center gap-2">
                                {currentStep === 1 ? 'Cancel' : <><span className="material-symbols-rounded text-lg">arrow_back</span> Back</>}
                            </button>
                            <button
                                onClick={handleNext}
                                className={`${currentStep === 3 ? 'bg-green-600 hover:bg-green-700' : 'bg-[#7C3AED] hover:bg-purple-700'} text-white px-8 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2`}
                            >
                                {currentStep === 3 ? 'Publish Job' : 'Next'}
                                {currentStep !== 3 && <span className="material-symbols-rounded text-lg">arrow_forward</span>}
                                {currentStep === 3 && <span className="material-symbols-rounded text-lg">check</span>}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import { getJobs, getCandidates } from '../services/recruitment';
import { getDashboardSummary } from '../services/dashboard';

const Recruitment = ({ onMenuClick }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isCreatingJob, setIsCreatingJob] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsData, candidatesData, summaryData] = await Promise.all([
                    getJobs(),
                    getCandidates(),
                    getDashboardSummary()
                ]);

                setJobs(jobsData);
                setCandidates(candidatesData);
                setSummary(summaryData);
            } catch (err) {
                console.error('Failed to fetch recruitment data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // If candidate selected, show detail view
    if (selectedCandidate) {
        return <CandidateDetail candidateId={selectedCandidate.id} onBack={() => setSelectedCandidate(null)} />;
    }

    // If job selected, show detail view
    if (selectedJob) {
        return <JobDetail jobId={selectedJob.id} onBack={() => setSelectedJob(null)} />;
    }

    // If creating job, show create view
    if (isCreatingJob) {
        return <CreateJob onBack={() => setIsCreatingJob(false)} onCreated={() => {
            setIsCreatingJob(false);
            // Refresh jobs
            getJobs().then(setJobs);
        }} />;
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark h-screen">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-sans text-slate-700 h-screen">
            {/* --- HEADER --- */}
            <header className="p-4 md:p-8 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    {onMenuClick && (
                        <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-slate-700">
                            <span className="material-symbols-rounded text-2xl">menu</span>
                        </button>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Recruitment</h1>
                        <p className="text-sm text-slate-500 mt-1">A central view of open roles, candidates, and pipeline progress.</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsCreatingJob(true)}
                    className="flex items-center gap-2 bg-[#7C3AED] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-purple-700 transition-all"
                >
                    {activeTab === 'Schedule' ? 'New Schedule' : 'New Job'} <span className="material-symbols-rounded text-lg">add</span>
                </button>
            </header>

            {/* --- TABS --- */}
            <nav className="bg-white px-3 sm:px-4 md:px-8 flex gap-4 sm:gap-6 md:gap-8 border-b border-slate-200 overflow-x-auto no-scrollbar whitespace-nowrap sticky top-[73px] z-20">
                {[
                    { id: 'Overview', label: 'Overview', icon: 'dashboard' },
                    { id: 'Candidates', label: 'Candidates', icon: 'group' },
                    { id: 'Schedule', label: 'Schedule', icon: 'calendar_month' },
                    { id: 'Jobs', label: 'Jobs', icon: 'work' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 md:pb-4 text-xs sm:text-sm font-semibold transition-all relative ${activeTab === tab.id ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <span className="flex items-center gap-2">
                            {/* Only showing icons if desired, but sticking to text-only based on the mockup image logic which didn't show icons. 
                                However, user asked to "samakan settingan" which implies structure. 
                                Workforce has icons. Recruitment mockup does NOT have icons.
                                User said "samakan settingan nav-tabsnya".
                                Usually this means spacing, fonts, underline effect, background.
                                I will Add icons to be safe as "settingan" might imply the whole styling including icons.
                             */}
                            {/* Actually, looking at the Recruitment Image provided by user: tabs are text only.
                                "Overview Candidates Schedule Jobs"
                                But user said "samakan settingan nav-tabsnya seperti di sidebar workforce management".
                                Workforce Management has icons.
                                I will PROPOSE the version with icons to be "same settings".
                                If it looks too different from mockup, user will complain, but they explicitly asked to match Workforce Management settings.
                             */}
                            {/* Let's double check if I can just use text.
                                Workforce Management: 
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-rounded text-base sm:text-lg">{tab.icon}</span>
                                    {tab.label}
                                </span>
                                
                                I will follow this pattern.
                             */}
                            {/* Wait, the Recruitment image above clearly has NO icons in tabs.
                                "samakan settingan" might just mean the container styling (sticky, padding, border, scroll).
                                Providing icons might deviate from the specific recruitment design.
                                However, "nav-tabsnya calender button tambahnya... sedangkan di schedule..." was previous prompt.
                                Current prompt: "samakan settingan nav-tabsnya seperti di sidebar workforce management".
                                
                                I will match the CSS classes for proper spacing and the underline effect, but I will keep it text-only if I find the image strongly suggests text-only.
                                The image shows: "Overview Candidates Schedule Jobs" (Just text).
                                Workforce Management has icons.
                                
                                Compromise: I will use the Exact CSS classes from Workforce Management but omit the icon span if I want to strictly follow the image, OR include icons if I want to strictly follow "like Workforce Management".
                                usually "settingan" refers to the look and feel (active state, spacing, font weight).
                                
                                I'll add the icons as it's safer to interpret "like Workforce Management" as "make it look like that component".
                            */}
                            {/* Actually, I will remove the icons to stay true to the visual design but keep the exact spacing/font/underline of Workforce Management. */}
                            {/* <span className="material-symbols-rounded text-base sm:text-lg">{tab.icon}</span> */}
                            {tab.label}
                        </span>
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#7C3AED] rounded-t-full" />}
                    </button>
                ))}
            </nav>

            <div className="p-4 md:p-8 space-y-6">

                {/* --- JOB CARDS ROW --- */}
                {activeTab === 'Overview' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(jobs.slice(0, 3).length > 0 ? jobs.slice(0, 3) : []).map(job => (
                                <div key={job.id} onClick={() => setSelectedJob(job)} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                                <span className="material-symbols-rounded">work</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-sm truncate max-w-[120px]">{job.title}</h3>
                                                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                                    <span>{job.department_name}</span>
                                                    <span className="material-symbols-rounded text-[14px] text-purple-500">verified</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {new Date(job.posted_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                                        <span className="material-symbols-rounded text-base text-slate-400">location_on</span>
                                        {job.location}
                                    </div>

                                    <div className="flex gap-2 mb-6">
                                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-pink-50 text-pink-500">
                                            {job.employment_type}
                                        </span>
                                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-purple-50 text-purple-600">
                                            {job.experience_level}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <span className="text-sm font-bold text-slate-700">{job.applicant_count || 0} Applicant</span>
                                        <button className="text-xs font-bold text-slate-400 hover:text-[#7C3AED] underline decoration-slate-300 hover:decoration-[#7C3AED] transition-all">Show detail</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* --- HIRING PIPELINE --- */}
                            <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-slate-800">Hiring Pipeline</h3>
                                    <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-[#7C3AED]">
                                        View all <span className="material-symbols-rounded">arrow_forward</span>
                                    </button>
                                </div>

                                {/* Pipeline Headers */}
                                <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-2 mb-4 text-xs font-bold text-slate-400 text-center">
                                    <div className="text-left flex items-center gap-1 cursor-pointer hover:text-slate-600">Design Jobs <span className="material-symbols-rounded text-sm">expand_more</span></div>
                                    <div>Apply..</div>
                                    <div>Screening</div>
                                    <div>Interviews</div>
                                    <div>Tech..</div>
                                    <div>Onboard..</div>
                                </div>

                                {/* Pipeline Rows */}
                                <div className="space-y-6">
                                    {jobs.slice(0, 4).map((job, idx) => (
                                        <div key={job.id} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-2 items-center">
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate pr-2">{job.title}</h4>
                                                <p className="text-[10px] text-slate-400 mt-1">{job.employment_type} • {job.location}</p>
                                            </div>
                                            {[
                                                summary?.recruitment_pipeline?.['Applied'] || 0,
                                                summary?.recruitment_pipeline?.['Screening'] || 0,
                                                summary?.recruitment_pipeline?.['Interview'] || 0,
                                                summary?.recruitment_pipeline?.['Technical Test'] || 0,
                                                summary?.recruitment_pipeline?.['Offered'] || summary?.recruitment_pipeline?.['Hired'] || 0
                                            ].map((val, i) => (
                                                <div key={i} className="relative h-8 flex items-center justify-center">
                                                    <div
                                                        className={`absolute inset-0 flex items-center justify-center text-white text-xs font-bold
                                                    ${val === 0 ? 'bg-slate-100 text-slate-300' :
                                                                i === 0 ? 'bg-blue-400' :
                                                                    i === 1 ? 'bg-yellow-400' :
                                                                        i === 2 ? 'bg-orange-400' :
                                                                            i === 3 ? 'bg-pink-400' : 'bg-purple-500'
                                                            }`}
                                                        style={{ clipPath: 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)' }}
                                                    >
                                                        {val}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* --- STATS & SOURCES --- */}
                            <div className="space-y-6">
                                {/* Stats Box */}
                                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-lg text-slate-800">Stats</h3>
                                        <button className="flex items-center gap-1 text-xs font-bold text-slate-500 border border-slate-200 rounded-lg px-2 py-1">
                                            This Month <span className="material-symbols-rounded text-sm">expand_more</span>
                                        </button>
                                    </div>

                                    <div className="h-[150px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={STATS_DATA}>
                                                <Bar dataKey="value" fill="#E2E8F0" radius={[4, 4, 4, 4]} barSize={24} />
                                                <Tooltip
                                                    cursor={{ fill: 'transparent' }}
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                            234 applicants this month—up by 45.<br />
                                            52 active job postings—3 newly added.
                                        </p>
                                        <div className="flex gap-6">
                                            <div>
                                                <h4 className="text-2xl font-black text-slate-800">874 <span className="text-[10px] font-bold text-slate-400">Applicant</span></h4>
                                                <p className="text-[10px] font-bold text-emerald-500 mt-1">+23 than last month</p>
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-slate-800">12 <span className="text-[10px] font-bold text-slate-400">Jobs Posting</span></h4>
                                                <p className="text-[10px] font-bold text-emerald-500 mt-1">+4 than last month</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Candidate Sources */}
                                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-slate-800">Candidate Sources</h3>
                                        <span className="material-symbols-rounded text-slate-400 text-sm">info</span>
                                    </div>

                                    <div className="h-[180px] relative flex items-center justify-center">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={SOURCE_DATA}
                                                    cx="50%"
                                                    cy="85%"
                                                    startAngle={180}
                                                    endAngle={0}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                    cornerRadius={4}
                                                >
                                                    {SOURCE_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute bottom-6 flex flex-col items-center">
                                            <span className="text-2xl font-black text-slate-800">198</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Jobs</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-2">
                                        {SOURCE_DATA.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-xs text-slate-500 font-medium">{item.value} {item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'Schedule' && (
                    <ScheduleView />
                )}

                {activeTab === 'Jobs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                        {jobs.map(job => (
                            <div key={job.id} onClick={() => setSelectedJob(job)} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${job.status === 'Open' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-red-50 text-red-500 border-red-100'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'Open' ? 'bg-emerald-500' : 'bg-red-500'}`}></div> {job.status}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">| {job.department_name}</span>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                                        <span className="material-symbols-rounded text-lg">more_vert</span>
                                    </button>
                                </div>

                                {/* Title Row */}
                                <div className="flex items-start gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                        <span className="material-symbols-rounded">work</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm truncate max-w-[150px]">{job.title}</h3>
                                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-medium">
                                            <span className="text-slate-500">{job.department_name}</span>
                                            <span className="material-symbols-rounded text-[12px] text-blue-500">verified</span>
                                            <span>| {new Date(job.posted_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <span className="material-symbols-rounded text-base text-slate-400">payments</span>
                                            Salary Ref
                                        </div>
                                        <div className="font-bold text-slate-700">{job.salary_range || 'N/A'}</div>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <span className="material-symbols-rounded text-base text-slate-400">group</span>
                                            Candidate Applied
                                        </div>
                                        <div className="font-bold text-slate-700">{job.applicant_count || 0}</div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-pink-50 text-pink-500 border-pink-100">
                                        {job.employment_type}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-purple-50 text-purple-600 border-purple-100">
                                        {job.experience_level}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border bg-yellow-50 text-yellow-600 border-yellow-100">
                                        {job.location}
                                    </span>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end pt-2">
                                    <button
                                        className="text-xs font-bold text-[#7C3AED] hover:underline flex items-center gap-0.5"
                                    >
                                        Show detail <span className="material-symbols-rounded text-sm">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Candidates' && (
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col p-6">
                        {/* Filter Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="relative flex-1 w-full md:max-w-md">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-rounded text-xl">search</span>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    <span className="p-1 bg-slate-100 rounded text-[10px] text-slate-500 font-bold">⌘</span>
                                    <span className="p-1 bg-slate-100 rounded text-[10px] text-slate-500 font-bold">/</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by Name or ID..."
                                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-100 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm flex-1 md:flex-none justify-center">
                                    Filter <span className="material-symbols-rounded text-lg">filter_list</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm flex-1 md:flex-none justify-center">
                                    Sort by <span className="material-symbols-rounded text-lg">swap_vert</span>
                                </button>
                            </div>
                        </div>

                        {/* Stage Tabs */}
                        <div className="flex gap-6 border-b border-slate-100 mb-6 overflow-x-auto no-scrollbar">
                            {['All', 'Screening', 'Interviews', 'Test', 'On-Board', 'Rejected'].map((tab, i) => (
                                <button
                                    key={tab}
                                    className={`pb-3 text-sm font-bold whitespace-nowrap relative ${i === 0 ? 'text-[#7C3AED]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {tab}
                                    {i === 0 && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-t-full"></span>}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto wfm-scroll">
                            {/* Candidates Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                                            <th className="pb-4 pr-4">Candidate Name</th>
                                            <th className="pb-4 px-4">Job Title</th>
                                            <th className="pb-4 px-4">Applied Date</th>
                                            <th className="pb-4 px-4">Stage</th>
                                            <th className="pb-4 px-4">Match Score</th>
                                            <th className="pb-4 px-4">Contact</th>
                                            <th className="pb-4 pl-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {candidates.map((can) => (
                                            <tr key={can.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 pr-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={`https://i.pravatar.cc/150?u=${can.id}`} className="w-8 h-8 rounded-lg object-cover" />
                                                        <div>
                                                            <div className="text-sm font-bold text-slate-800">{can.first_name} {can.last_name}</div>
                                                            <div className="text-[10px] text-slate-400 font-medium">ID: {can.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-xs font-bold text-slate-600 truncate max-w-[120px]">{can.job_title}</td>
                                                <td className="py-4 px-4 text-xs font-medium text-slate-500">{new Date(can.applied_at).toLocaleDateString()}</td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${can.pipeline_stage === 'Hired' ? 'bg-emerald-50 text-emerald-600' :
                                                        can.pipeline_stage === 'Interview' ? 'bg-orange-50 text-orange-600' :
                                                            'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        {can.pipeline_stage}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black text-purple-600 bg-purple-50`}>
                                                        {Math.floor(Math.random() * 20) + 80}%
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-white transition-all shadow-sm">
                                                            <span className="material-symbols-rounded text-base">mail</span>
                                                        </button>
                                                        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-white transition-all shadow-sm">
                                                            <span className="material-symbols-rounded text-base">call</span>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4 pl-4 text-right">
                                                    <button
                                                        onClick={() => setSelectedCandidate(can)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <span className="material-symbols-rounded">visibility</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recruitment;
