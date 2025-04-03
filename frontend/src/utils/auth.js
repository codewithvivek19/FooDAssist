/**
 * Authentication utility functions for handling tokens
 */

/**
 * Decodes a JWT token without verification
 * @param {string} token - The JWT token to decode
 * @returns {Object|null} - The decoded token payload or null if invalid
 */
export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }
    
    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Checks if a token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if expired or invalid, false otherwise
 */
export const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) {
    return true;
  }
  
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  return Date.now() >= expirationTime;
};

/**
 * Validates a token by checking if it exists and is not expired
 * @param {string} token - The JWT token to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidToken = (token) => {
  if (!token) return false;
  return !isTokenExpired(token);
};

/**
 * Gets the current user token from localStorage
 * @returns {string|null} - The token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Gets the current user data from localStorage
 * @returns {Object|null} - The user data or null if not found
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
};

/**
 * Logs out the user by removing authentication data
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Handles authentication errors by logging out and redirecting
 * @param {Function} navigate - React Router's navigate function
 * @param {string} redirectPath - Path to redirect to after logout
 * @param {string} message - Message to display on the login page
 */
export const handleAuthError = (navigate, redirectPath = '/login', message = 'Please login to continue') => {
  logout();
  navigate(redirectPath, { 
    state: { 
      from: window.location.pathname,
      message 
    } 
  });
}; 