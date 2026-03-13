import { useState, useEffect } from 'react';
import Header from '../components/Header';
import EmployeeStatistic from '../components/EmployeeStatistic';
import JobsOverview from '../components/JobsOverview';
import ProjectPerformance from '../components/ProjectPerformance';
import AttendanceLog from '../components/AttendanceLog';
import { getDashboardSummary } from '../services/dashboard';

export default function Dashboard({ onMenuClick }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getDashboardSummary();
                setSummary(data);
            } catch (err) {
                console.error('Failed to fetch summary', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8">
            <Header onMenuClick={onMenuClick} />

            {/* Row 1: Employee & Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-6 h-full">
                    <EmployeeStatistic data={summary} loading={loading} />
                </div>
                <div className="lg:col-span-6 h-full">
                    <JobsOverview data={summary} loading={loading} />
                </div>
            </div>

            {/* Row 2: Project Performance */}
            <div className="mb-8">
                <ProjectPerformance />
            </div>

            {/* Attendance Table */}
            <AttendanceLog />
        </main>
    );
}
