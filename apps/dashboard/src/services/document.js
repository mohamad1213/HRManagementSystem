import apiClient from '../api/client';

export const getDocuments = async (params = {}) => {
    const response = await apiClient.get('documents/', { params });
    return response.data;
};

export const uploadDocument = async (formData) => {
    const response = await apiClient.post('documents/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteDocument = async (id) => {
    const response = await apiClient.delete(`documents/${id}/`);
    return response.data;
};

export const reviewDocument = async (id, decision, notes) => {
    const response = await apiClient.patch(`documents/${id}/`, {
        status: decision === 'approve' ? 'Approved' : 'Rejected',
        review_notes: notes
    });
    return response.data;
};
