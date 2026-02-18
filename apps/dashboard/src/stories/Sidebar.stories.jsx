import Sidebar from '../components/Sidebar';
import { fn } from '@storybook/test';

export default {
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        onClose: fn(),
        onNavigate: fn(),
    },
};

export const DesktopExpanded = {
    args: {
        isOpen: true,
        activePage: '/',
    },
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
    },
};

export const MobileOpen = {
    args: {
        isOpen: true,
        activePage: '/employee-management',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const MobileClosed = {
    args: {
        isOpen: false,
        activePage: '/',
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

export const WithLayout = {
    args: {
        isOpen: true,
        activePage: '/',
    },
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'desktop',
        },
    },
    render: (args) => (
        <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
            <Sidebar {...args} />
            <div className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Main Content Area</h1>
                    <p className="text-gray-500 mt-2">This is how the Sidebar looks next to content.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center">
                            <span className="text-gray-400 font-medium">Content Block {i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};
