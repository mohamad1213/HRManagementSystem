import apiClient from '../api/client';

export const getJobs = async () => {
    const response = await apiClient.get('jobs/');
    return response.data;
};

export const createJob = async (data) => {
    const response = await apiClient.post('jobs/', data);
    return response.data;
};

export const getCandidates = async () => {
    const response = await apiClient.get('candidates/');
    return response.data;
};

export const updateCandidate = async (id, data) => {
    const response = await apiClient.put(`candidates/${id}/`, data);
    return response.data;
};
