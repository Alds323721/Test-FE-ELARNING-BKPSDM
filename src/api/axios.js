import axios from 'axios';

// 1. Buat Instance Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json', // Sangat penting agar Laravel tahu ini API
        'Content-Type': 'application/json'
    }
});

// 2. Buat Interceptor untuk menyisipkan Token otomatis
api.interceptors.request.use((config) => {
    // Ambil token yang tersimpan di localStorage (hasil dari login)
    const token = localStorage.getItem('access_token');
    
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
        // Token tidak valid atau kadaluarsa -> paksa user logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/'; // Ke Landing Page (Login)
    }
    return Promise.reject(error);
});

export default api;
