const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
  REQUEST_OTP: `${API_BASE_URL}/auth/request-otp`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  
  // User endpoints
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
};

export default API_ENDPOINTS; 