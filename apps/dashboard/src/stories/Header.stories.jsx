import Header from '../components/Header';
import { fn } from '@storybook/test';

export default {
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
    args: {
        onMenuClick: fn(),
    },
};

export const Default = {
    args: {},
};

export const Mobile = {
    args: {},
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
