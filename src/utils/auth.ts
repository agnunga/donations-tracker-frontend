import Cookies from 'js-cookie';

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

// Get Auth Header (for protected requests)
export const getAuthHeader = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true' } : {};
};
