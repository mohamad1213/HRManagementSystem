import apiClient from '../api/client';

export const getDashboardSummary = async () => {
    const response = await apiClient.get('dashboard/summary/');
    return response.data;
};

export const getHRMetrics = async () => {
    const response = await apiClient.get('analytics/metrics/');
    return response.data;
};
