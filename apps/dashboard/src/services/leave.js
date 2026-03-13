import apiClient from '../api/client';

export const getLeaveRequests = async () => {
    const response = await apiClient.get('leaves/');
    return response.data;
};

export const updateLeaveStatus = async (id, status) => {
    const response = await apiClient.patch(`leaves/${id}/`, { status });
    return response.data;
};

export const getLeaveBalances = async () => {
    const response = await apiClient.get('leave-balances/');
    return response.data;
};
