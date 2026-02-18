import Header from '../components/Header';
import EmployeeStatistic from '../components/EmployeeStatistic';
import JobsOverview from '../components/JobsOverview';
import ProjectPerformance from '../components/ProjectPerformance';
import AttendanceLog from '../components/AttendanceLog';

export default function Dashboard({ onMenuClick }) {
    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 md:p-8">
            <Header onMenuClick={onMenuClick} />

            {/* Row 1: Employee & Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-6 h-full">
                    <EmployeeStatistic />
                </div>
                <div className="lg:col-span-6 h-full">
                    <JobsOverview />
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
