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
