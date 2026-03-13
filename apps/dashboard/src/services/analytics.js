import apiClient from '../api/client';

export const getDashboardAnalytics = async () => {
    const response = await apiClient.get('analytics/dashboard/');
    return response.data;
};
