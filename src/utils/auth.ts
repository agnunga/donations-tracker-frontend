import axios from 'axios';
import Cookies from 'js-cookie';

// const baseUrl = process.env.NEXT_LOCAL_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = `${ baseUrl }/auth/`;

export async function logout(): Promise<boolean> {
  try {
    const response = await axios.post(`${API_URL}logout`, null, {
      withCredentials: true,
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.data?.success) {
      Cookies.remove('sub', { path: '/' });
      return true; // Logout successful
    } else {
      console.warn('Logout response was not successful:', response.data);
      return false;
    }
  } catch (error) {
    console.error('Logout error:', error);
    return false; // Logout failed
  }
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
  const url = `${API_URL}check`;
  console.log("isUserLoggedIn::: returns F||F: URL:::: " + url)

  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include', // include cookies
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    });

    // If response status is 401, return false (user is logged out)
    if (response.status === 401) {
      return false;
    }

    return response.ok; // still ok if user is logged in
  } catch {
    return false;
  }
}
