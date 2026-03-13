import apiClient from '../api/client';

export const getPayrollRecords = async () => {
    const response = await apiClient.get('payroll/');
    return response.data;
};

export const getLatestPayslip = async () => {
    const response = await apiClient.get('payroll/my-latest-payslip/');
    return response.data;
};

export const downloadPayslip = async (id) => {
    const response = await apiClient.get(`payroll/${id}/download_payslip/`, {
        responseType: 'blob'
    });
    return response.data;
};
