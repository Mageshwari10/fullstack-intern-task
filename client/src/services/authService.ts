import axios from 'axios';



const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fullstack-intern-task-api.onrender.com';
// We will use /api prefix in the individual calls to be safe
console.log('Current API_BASE_URL:', API_BASE_URL);



const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 second timeout to allow for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(config => {
  console.log(`Sending ${config.method?.toUpperCase()} request to ${config.baseURL}${config.url}`);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});



export const authService = {

  register: async (email: string, password: string) => {

    try {

      console.log('Attempting registration with:', { email, password: '***' });

      const response = await api.post('/api/register', { email, password });

      console.log('Registration response:', response.data);

      return response.data;

    } catch (error: any) {

      console.error('Registration error:', error);

      console.error('Error response:', error.response?.data);

      console.error('Error status:', error.response?.status);

      throw error;

    }

  },



  login: async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email, url: `${API_BASE_URL}/login` });
      const response = await api.post('/api/login', { email, password });
      console.log('Login response received:', response.status);
      return response.data;
    } catch (error: any) {
      console.error('Detailed Login Error:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. The server might be slow or unreachable.');
      }
      
      if (!error.response) {
        throw new Error('Network error. Please check if the API URL is correct and the server is running.');
      }
      
      throw error;
    }
  }

};



export default authService;

