import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";

// const baseUrl = process.env.NEXT_LOCAL_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = `${ baseUrl }/auth/`;

export async function logout() {
  const url = `${API_URL}logout`;
  // alert("logout url ::: " + url );
  try {
    // Call server logout to invalidate refresh token and clear HTTP-only cookie
    await axios.post(url, null, { withCredentials: true });
  } catch (error) {
    console.warn('Logout request failed:', error);
    // Still proceed to clear client-side tokens
  }

  Cookies.remove('refreshtoken', { path: '/' });

  redirect('/signin'); // Redirect to the signinpage
}

// Get Auth Header (for protected requests)
export const getAuthHeader = () => {
  const token = Cookies.get("token");
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  };
};

export async function refreshAccessToken() {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    console.log("No refresh token found");
    window.location.href = "/signin"; // Redirect to login if refresh token is absent
    return;
  }

  try {
    const res = await axios.post(
      `${API_URL}refresh`,
      {},
      {
        headers: {
          "Refresh-Token": refreshToken,
        },
      }
    );

    const { token } = res.data; // The new access token
    // Handle the new token (store in HttpOnly cookie on the server-side)
    console.log("Access token refreshed:", token);
  } catch (err) {
    console.error("Token refresh error:", err);
    window.location.href = "/signin"; // Redirect to login if refresh fails
  }
}

// Client-side auth check
export async function isUserLoggedIn(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}check`, {
      method: 'GET',
      credentials: 'include', // include cookies
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    });

    return response.ok;
  } catch {
    return false;
  }
}