import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fullstack-intern-task-api.onrender.com';
console.log('Current API_BASE_URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  email: string;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  created_at: string;
  updated_at: string;
  favorited_at?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface FavoriteResponse {
  message: string;
  isFavorited: boolean;
}

export const authAPI = {
  register: (email: string, password: string) =>
    api.post<AuthResponse>('/api/register', { email, password }),
  
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/api/login', { email, password }),
};

export const templatesAPI = {
  getAll: (category?: string, search?: string) =>
    api.get<Template[]>('/api/templates', { params: { category, search } }),
  
  getById: (id: number) =>
    api.get<Template>(`/api/templates/${id}`),
  
  getCategories: () =>
    api.get<string[]>('/api/categories'),
};

export const favoritesAPI = {
  toggleFavorite: (templateId: number) =>
    api.post<FavoriteResponse>(`/api/favorites/${templateId}`),
  
  getFavorites: () =>
    api.get<Template[]>('/api/favorites'),
  
  checkFavorite: (templateId: number) =>
    api.get<{ isFavorited: boolean }>(`/api/favorites/check/${templateId}`),
};

export default api;
