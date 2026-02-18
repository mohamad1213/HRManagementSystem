import React, { useState } from 'react';

const HelpCenter = ({ onMenuClick }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 1, title: 'Getting Started', icon: 'rocket_launch', desc: 'Learn the basics of HumaniZen.' },
        { id: 2, title: 'User Management', icon: 'manage_accounts', desc: 'Managing your team and roles.' },
        { id: 3, title: 'Payroll & Finance', icon: 'payments', desc: 'Salary, slips, and tax info.' },
        { id: 4, title: 'Time & Attendance', icon: 'schedule', desc: 'Leave requests and tracking.' },
        { id: 5, title: 'Security & Privacy', icon: 'shield', desc: 'Protecting your data.' },
        { id: 6, title: 'API & Integrations', icon: 'integration_instructions', desc: 'Developer tools and webhooks.' },
    ];

    const popularArticles = [
        { id: 1, title: 'How to reset your password', views: '2.4k' },
        { id: 2, title: 'Understanding your payslip breakdown', views: '1.8k' },
        { id: 3, title: 'Adding a new employee to the system', views: '1.5k' },
        { id: 4, title: 'Integrating with Slack for notifications', views: '1.2k' },
        { id: 5, title: 'Exporting monthly attendance reports', views: '980' },
    ];

    const faqs = [
        { q: 'How do I change my profile picture?', a: 'Go to Settings > My Profile and click on the "Change Avatar" button next to your current profile picture.' },
        { q: 'Can I export payroll data to Excel?', a: 'Yes, navigate to the Payroll section and click the "Export" button in the top right corner. You can choose CSV or Excel format.' },
        { q: 'What happens if I lose my 2FA device?', a: 'Please contact your workspace administrator immediately to reset your 2FA settings. If you are an admin, contact support.' },
    ];

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
                        <h1 className="text-2xl font-bold text-slate-800">Help Center</h1>
                        <p className="text-sm text-slate-500 mt-1">Find answers, guides, and support for your questions.</p>
                    </div>
                </div>
            </header>

            <main className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-12">

                {/* Search Hero */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-purple-200">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How can we help you today?</h2>
                    <p className="text-purple-100 mb-8 max-w-xl mx-auto">Search our knowledge base for answers to your technical questions and design implementation guides.</p>

                    <div className="relative max-w-2xl mx-auto">
                        <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">search</span>
                        <input
                            type="text"
                            placeholder="Describe your issue or search for keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-500/30 shadow-lg placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Categories Grid */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-rounded text-purple-600">category</span> Browse by Category
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <button key={cat.id} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50 transition-all text-left group">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-50 transition-all">
                                    <span className="material-symbols-rounded text-2xl">{cat.icon}</span>
                                </div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 group-hover:text-purple-700 transition-colors">{cat.title}</h4>
                                <p className="text-xs text-slate-500">{cat.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Popular Articles */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="material-symbols-rounded text-amber-500">star</span> Popular Articles
                        </h3>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                            {popularArticles.map((article) => (
                                <a key={article.id} href="#" className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="material-symbols-rounded text-slate-300 group-hover:text-purple-500 transition-colors">article</span>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-purple-700 transition-colors">{article.title}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                                        <span className="material-symbols-rounded text-sm">visibility</span> {article.views}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="material-symbols-rounded text-blue-500">support_agent</span> Need more help?
                        </h3>
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                            <h4 className="font-extrabold text-xl mb-2">Contact Support</h4>
                            <p className="text-blue-100 text-sm mb-6">Our team is available 24/7 to assist you with any issues.</p>

                            <div className="space-y-3">
                                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                    <span className="material-symbols-rounded">chat</span> Start Live Chat
                                </button>
                                <button className="w-full bg-white text-blue-600 rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
                                    <span className="material-symbols-rounded">mail</span> Email Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="material-symbols-rounded text-green-500">quiz</span> Frequently Asked Questions
                    </h3>
                    <div className="grid gap-4">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-white border border-slate-200 rounded-2xl open:shadow-md transition-all">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-slate-700 group-hover:text-purple-700 transition-colors">
                                    {faq.q}
                                    <span className="material-symbols-rounded transition-transform group-open:rotate-180 text-slate-400">expand_more</span>
                                </summary>
                                <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
};

export default HelpCenter;
