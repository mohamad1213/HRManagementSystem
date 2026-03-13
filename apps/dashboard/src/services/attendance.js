import apiClient from '../api/client';

export const getAttendanceRecords = async () => {
    const response = await apiClient.get('attendance/');
    return response.data;
};

export const clockIn = async () => {
    const response = await apiClient.post('attendance/clock_in/');
    return response.data;
};

export const clockOut = async () => {
    const response = await apiClient.post('attendance/clock_out/');
    return response.data;
};

export const startBreak = async () => {
    const response = await apiClient.post('attendance/start_break/');
    return response.data;
};

export const endBreak = async () => {
    const response = await apiClient.post('attendance/end_break/');
    return response.data;
};

export const getAttendanceMetrics = async () => {
    const response = await apiClient.get('attendance/metrics/');
    return response.data;
};
