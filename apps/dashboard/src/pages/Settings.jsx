import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { changePassword, updateProfile } from '../services/auth';

const Settings = ({ onMenuClick }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);

    // Profile state
    const [profileForm, setProfileForm] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        bio: user?.bio || ''
    });

    // Password state
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [isSaving, setIsSaving] = useState(false);

    const handleProfileUpdate = async () => {
        setIsSaving(true);
        setStatusMsg({ type: '', text: '' });
        try {
            await updateProfile({
                first_name: profileForm.first_name,
                last_name: profileForm.last_name,
                bio: profileForm.bio
            });
            setStatusMsg({ type: 'success', text: 'Profile updated successfully' });
        } catch (err) {
            setStatusMsg({ type: 'error', text: err.response?.data?.error || 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setStatusMsg({ type: 'error', text: 'All fields are required' });
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setStatusMsg({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setIsSaving(true);
        setStatusMsg({ type: '', text: '' });
        try {
            await changePassword(passwords.current, passwords.new);
            setStatusMsg({ type: 'success', text: 'Password updated successfully' });
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (err) {
            setStatusMsg({ type: 'error', text: err.response?.data?.error || 'Failed to update password' });
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: 'person' },
        { id: 'appearance', label: 'Appearance', icon: 'palette' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'security', label: 'Security', icon: 'shield' },
        { id: 'billing', label: 'Billing', icon: 'credit_card' },
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
                        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your account preferences and workspace settings.</p>
                    </div>
                </div>
                <button
                    onClick={activeTab === 'profile' ? handleProfileUpdate : undefined}
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-sm disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </header>

            <main className="p-4 md:p-8 max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* --- Sidebar Tabs --- */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 sticky top-32">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-purple-50 text-purple-600'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                        }`}
                                >
                                    <span className="material-symbols-rounded text-xl">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- Content Area --- */}
                    <div className="flex-1 space-y-6">

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Personal Information</h2>

                                <div className="flex flex-col md:flex-row gap-8 mb-8">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative group cursor-pointer">
                                            <img
                                                src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAorVehEOlkGaIxdayVc8KT5Ti-sQCLUIWWwWOgY7kxVJx6tibcHBX9E9m6Js6pY4JOYRzZA2y9nAMdau-sBtJNm_-uL6BWmNX7XO00GZvxu69BzvuEtH2M4s0hZmoGCRZTBVi5p8374vDeJQBKEf47ay2Du8MtVioKmeyBPTy8MrHDB26lufBcxFsnEwkvX6Xm-hGw6dfxL7slcsf6lG3qavHYlj7Lw2LHKS7abk3y64LAxYF71K1WFF2zJjYoha88brqc6dnc2wUv"}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
                                            />
                                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-rounded text-white">edit</span>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-purple-600 hover:text-purple-700">Change Avatar</button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                                            <input
                                                type="text"
                                                value={profileForm.first_name}
                                                onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                                            <input
                                                type="text"
                                                value={profileForm.last_name}
                                                onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                            <div className="relative">
                                                <span className="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                                <input
                                                    type="email"
                                                    value={user?.email || ''}
                                                    disabled
                                                    className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Bio</label>
                                            <textarea
                                                rows="3"
                                                value={profileForm.bio}
                                                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === 'appearance' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Appearance Settings</h2>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">Dark Mode</h3>
                                            <p className="text-xs text-slate-500 mt-1">Adjust the appearance of the dashboard to reduce eye strain.</p>
                                        </div>
                                        <button
                                            onClick={() => setDarkMode(!darkMode)}
                                            className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-slate-200'}`}
                                        >
                                            <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800 mb-4">Theme Color</h3>
                                        <div className="flex flex-wrap gap-4">
                                            {['bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-orange-500', 'bg-pink-500', 'bg-slate-800'].map((color, idx) => (
                                                <button key={idx} className={`${color} w-10 h-10 rounded-full shadow-sm hover:scale-110 transition-transform ring-2 ring-offset-2 ring-transparent hover:ring-slate-200`}></button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Notification Preferences</h2>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                <span className="material-symbols-rounded">mail</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-800">Email Notifications</h3>
                                                <p className="text-xs text-slate-500">Receive daily summaries and important alerts.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                                                <span className="material-symbols-rounded">notifications_active</span>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-800">Push Notifications</h3>
                                                <p className="text-xs text-slate-500">Receive real-time alerts on your desktop.</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Security & Login</h2>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-bold text-slate-800">Change Password</h3>
                                            {statusMsg.text && (
                                                <span className={`text-xs font-bold ${statusMsg.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {statusMsg.text}
                                                </span>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="password"
                                                placeholder="Current Password"
                                                value={passwords.current}
                                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                            />
                                            <div className="hidden md:block"></div>
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                value={passwords.new}
                                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm New Password"
                                                value={passwords.confirm}
                                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                                            />
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={handlePasswordChange}
                                                disabled={isSaving}
                                                className="px-6 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-all disabled:opacity-50"
                                            >
                                                {isSaving ? 'Updating...' : 'Update Password'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-slate-800">Two-Factor Authentication</h3>
                                                <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded-lg hover:bg-purple-100 transition-colors">
                                                Enable 2FA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BILLING TAB */}
                        {activeTab === 'billing' && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 animate-fade-in text-center py-20">
                                <span className="material-symbols-rounded text-6xl text-slate-200 mb-4">credit_card_off</span>
                                <h3 className="text-lg font-bold text-slate-800">Billing Management</h3>
                                <p className="text-slate-400 mt-2 max-w-md mx-auto">This feature is currently available only for Workspace Admins. Please contact your administrator for billing inquiries.</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
