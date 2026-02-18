import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HRAnalytics from './pages/HRAnalytics';
import DocumentCenter from './pages/DocumentCenter';
import EventAnnouncement from './pages/EventAnnouncement';
import EmployeeManagement from './pages/EmployeeManagement';
import WorkforceManagement from './pages/WorkforceManagement';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import Payroll from './pages/Payroll';
import MyAttendance from './pages/MyAttendance';
import MyTimeOff from './pages/MyTimeOff';
import PaySlip from './pages/PaySlip';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activePage={location.pathname}
        onNavigate={(path) => {
          navigate(path);
          setSidebarOpen(false);
        }}
      />

      <Routes>
        <Route path="/" element={<Dashboard onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/hr-analytics" element={<HRAnalytics onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/doc-center" element={<DocumentCenter onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/event-announcement" element={<EventAnnouncement onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/employee-management" element={<EmployeeManagement onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/workforce-management" element={<WorkforceManagement onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/recruitment" element={<Recruitment onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/performance" element={<Performance onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/payroll" element={<Payroll onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/my-attendance" element={<MyAttendance onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/my-time-off" element={<MyTimeOff onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/pay-slip" element={<PaySlip onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/user-management" element={<UserManagement onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/settings" element={<Settings onMenuClick={() => setSidebarOpen(true)} />} />
        <Route path="/help-center" element={<HelpCenter onMenuClick={() => setSidebarOpen(true)} />} />
        {/* Fallback routes */}
        <Route path="*" element={<Dashboard onMenuClick={() => setSidebarOpen(true)} />} />
      </Routes>
    </div>
  );
}

export default App;
