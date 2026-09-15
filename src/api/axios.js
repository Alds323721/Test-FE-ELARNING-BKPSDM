import axios from 'axios';
import { clearAuth } from '../utils/auth';

// 1. Buat Instance Axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json', // Sangat penting agar Laravel tahu ini API
        'Content-Type': 'application/json'
    }
});

// 2. Buat Interceptor untuk menyisipkan Token otomatis
api.interceptors.request.use((config) => {
    // Ambil token yang tersimpan di localStorage (hasil dari login)
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// 3. Interceptor untuk menangani error (misal token kadaluarsa / 401)
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Jangan redirect jika error 401 berasal dari percobaan login
        if (error.config?.url !== '/login' && !error.config?.url?.endsWith('/login')) {
            // Token tidak valid atau kadaluarsa -> paksa user logout menyeluruh
            clearAuth();
            window.location.href = '/'; // Ke Landing Page (Login)
        }
    }
    return Promise.reject(error);
});

export default api;