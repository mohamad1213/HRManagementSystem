import apiClient from '../api/client';

export const getDepartments = async () => {
    const response = await apiClient.get('departments/');
    return response.data;
};
