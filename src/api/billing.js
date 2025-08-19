import api from './axios';

export const billingAPI = {
  getBills: (params) => api.get('/bills', { params }),
  getBill: (id) => api.get(`/bills/${id}`),
  createBill: (data) => api.post('/bills', data),
  updateBill: (id, data) => api.put(`/bills/${id}`, data),
  payBill: (id, data) => api.patch(`/bills/${id}/pay`, data),
  getPatientBills: (patientId) => api.get(`/bills/patient/${patientId}`),
};