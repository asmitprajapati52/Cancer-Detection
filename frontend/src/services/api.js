const BASE_URL = 'http://localhost:5000/api';

// Helper to get auth headers automatically
const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

export const apiService = {
  // 🔬 Scan & Predict API Call
  uploadScan: async (imageFile, notes = '') => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('notes', notes);

      const response = await fetch(`${BASE_URL}/scan/upload`, {
        method: 'POST',
        headers: getAuthHeaders(true), // true passed for multipart/form-data
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Scan prediction failed!');
      return data;
    } catch (error) {
      console.error('❌ API Service Error:', error.message);
      throw error;
    }
  }
};