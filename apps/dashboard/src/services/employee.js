import apiClient from '../api/client';

export const getEmployees = async (search = '') => {
    const response = await apiClient.get(`employees/?search=${search}`);
    return response.data;
};

export const getEmployeeDetails = async (id) => {
    const response = await apiClient.get(`employees/${id}/`);
    return response.data;
};

export const createEmployee = async (data) => {
    const response = await apiClient.post('employees/', data);
    return response.data;
};

export const updateEmployee = async (id, data) => {
    const response = await apiClient.put(`employees/${id}/`, data);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await apiClient.delete(`employees/${id}/`);
    return response.data;
};
