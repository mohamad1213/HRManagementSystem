import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error('Login Error:', err.response?.data);
            const data = err.response?.data;
            let message = 'Failed to connect to server.';

            if (data) {
                if (data.detail) message = data.detail;
                else if (data.error) message = data.error;
                else if (typeof data === 'object') {
                    const firstKey = Object.keys(data)[0];
                    const firstValue = data[firstKey];
                    message = Array.isArray(firstValue) ? `${firstKey}: ${firstValue[0]}` : JSON.stringify(data);
                }
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-display">
            {/* Left Side - Visual/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                    alt="Modern Office"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="relative z-20 flex flex-col justify-center px-16 text-white text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 animate-float border border-white/20">
                        <span className="material-symbols-rounded text-4xl text-white">sentiment_satisfied</span>
                    </div>
                    <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                        Humani<span className="text-secondary">Zen</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-md leading-relaxed mb-12">
                        Empowering your workforce with modern HR solutions. Streamline attendance, payroll, and recruitment in one beautiful platform.
                    </p>

                    <div className="space-y-6">
                        {[
                            "Unified Workforce Management",
                            "Real-time Analytics Dashboard",
                            "Seamless Payroll Processing"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 text-slate-200 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center border border-success/30">
                                    <CheckCircle2 className="w-4 h-4 text-success" />
                                </div>
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="lg:hidden flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <span className="material-symbols-rounded">sentiment_satisfied</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">HumaniZen</h2>
                    </div>

                    <div className="mb-10">
                        <h3 className="text-3xl font-bold text-slate-900 mb-3">Sign In</h3>
                        <p className="text-slate-500 font-medium">Please enter your credentials to access your account.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-slate-800 transition-all shadow-sm font-medium"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Security Password</label>
                                <button type="button" className="text-xs font-bold text-primary hover:text-secondary transition-colors">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary text-slate-800 transition-all shadow-sm font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-5 h-5 rounded-lg border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-sm font-semibold text-slate-600 cursor-pointer">Stay signed in for 30 days</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4.5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-xl shadow-slate-200 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <span>Sign In to Workspace</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm font-semibold text-slate-500">
                            New to HumaniZen? <button className="text-primary font-bold hover:underline">Contact Administrator</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
