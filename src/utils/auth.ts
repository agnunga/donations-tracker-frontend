import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
// import { cookies } from 'next/headers';

// const API_URL = "http://localhost:9090/api/";

// export async function isAuthenticated() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token');
//   return !!token;
// }

// // Check if the user is logged in by checking the cookie
// export function isLoggedIn() {
//   return !!Cookies.get("token"); // Check if token exists in cookies
// }

// export function isNotLoggedIn() {
//   return !isLoggedIn(); // Returns true if the user is not logged in
// }

// Log out the user by removing the token from the cookie and redirecting to the login page
export function logout() {
  Cookies.remove("token"); // Remove token from cookies
  window.location.href = "/signin"; // Redirect to login
}

// Fetch with Authorization header, using the token from cookies
export async function fetchWithAuth<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error('No authentication token found');
  }
  const response = await axios.get<T>(url, { headers: getAuthHeader(), ...options });
  return response.data;
}

// Get Auth Header (for protected requests)
export const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
