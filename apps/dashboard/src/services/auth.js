import apiClient from '../api/client';

export const login = async (email, password) => {
    // Backend explicitly requires 'email' key based on error message
    const response = await apiClient.post('auth/login/', { email: email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('users/me/');
    return response.data;
};

export const changePassword = async (old_password, new_password) => {
    const response = await apiClient.post('users/change_password/', { old_password, new_password });
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await apiClient.patch('users/me/', profileData);
    return response.data;
};
