export function isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  
  export function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");
  
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }