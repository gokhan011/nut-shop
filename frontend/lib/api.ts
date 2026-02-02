import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' 
  ? `http://${window.location.hostname}:8000/api`
  : 'http://localhost:8000/api');

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = () => api.get('/categories/');
export const getProducts = (params?: any) => api.get('/products/', { params });
export const getProduct = (slug: string) => api.get(`/products/${slug}/`);
export const createOrder = (data: any) => api.post('/orders/', data);
