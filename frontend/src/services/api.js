import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchSales = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE}/user/search?${params}`);
  return response.data;
};

export const rateSale = async (sale_id, stars, token) => {
  return axios.post(
    `${API_BASE}/user/rate`,
    { sale_id, stars },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// This provides:    fetchSales({ name, category })   rateSale(sale_id, stars, token)