import api from '../api/axios';

const AUTH_KEYS = [
  'access_token',
  'token',
  'user',
  'current_route',
  'userCourseId',
  'userModulId',
  'userKuisId',
  'postTestResult',
  'adminKomunitasCourseId',
  'filterKomunitasId',
  'reviewCourseId',
  'reviewCourseData'
];

/**
 * Mengambil token autentikasi yang tersimpan
 */
export const getToken = () => {
  return localStorage.getItem('access_token') || localStorage.getItem('token') || null;
};

/**
 * Mengambil data objek user yang sedang login
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
};

/**
 * Mengambil peran (role) dari user yang sedang login
 */
export const getUserRole = () => {
  const user = getUser();
  return user?.peran || null;
};

/**
 * Cek apakah user sedang login dan memiliki token valid
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Simpan data autentikasi baru saat login berhasil
 */
export const setAuth = (token, user) => {
  if (token) localStorage.setItem('access_token', token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Membersihkan semua data auth dan session di localStorage
 */
export const clearAuth = () => {
  AUTH_KEYS.forEach(key => localStorage.removeItem(key));
};

/**
 * Log out user secara menyeluruh (Single Source of Truth)
 * @param {Function} [navigateCallback] - fungsi navigasi (opsional)
 */
export const logout = (navigateCallback) => {
  // Opsional: Beritahu backend untuk revoke token secara fire-and-forget
  try {
    api.post('/logout').catch(() => {});
  } catch (e) {}

  // Bersihkan seluruh penyimpanan lokal
  clearAuth();

  // Reset URL browser ke root
  window.history.pushState({}, '', '/');

  // Trigger navigasi ke landing
  if (typeof navigateCallback === 'function') {
    navigateCallback('landing');
  } else {
    window.location.href = '/';
  }
};
