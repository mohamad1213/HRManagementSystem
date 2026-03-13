import apiClient from '../api/client';

export const getEvents = async () => {
    const response = await apiClient.get('events/');
    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await apiClient.post('events/', eventData);
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await apiClient.delete(`events/${id}/`);
    return response.data;
};
