import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from "axios";
import { getAuthHeader } from "./auth";
import Cookies from 'js-cookie';

type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  role: string;
}

type Beneficiary = {
  id: number;
  name: string;
  contactInfo: string;
  needs: string;
  totalAmount: number;
  disbursedAmount: number;
}

// const baseUrl = process.env.NEXT_LOCAL_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = `${ baseUrl }/api/`;
const AUTH_URL = `${ baseUrl }/api/`;
const apiClient: AxiosInstance = axios.create();

// Fix: Correct typing for request interceptor
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // alert("interceptors.request called here");

  const token = Cookies.get('token');
  const refreshtoken = Cookies.get('refreshtoken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // alert("interceptors.response called here");

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    alert("interceptors.response called here:::status === 401 " + error)

    if (error.response?.status === 401 || error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      alert("interceptors.response called here:::status === 401");
      try {
        const refreshResponse = await axios.post(`${AUTH_URL}refresh`, null, { withCredentials: true });
        const newAccessToken = refreshResponse.data.token;

        Cookies.set('token', newAccessToken, { secure: true });
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export async function fetchUsers(): Promise<User[]> {
  const url = `${ API_URL }users`;
  try {
    const users = await fetchWithAuth<User[]>(url);
    return users;
  } catch (error) {
    console.error("Error encountered:", error);
    throw new Error("Error encountered. Contact Support.");
  }
}

export async function fetchWithAuth<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const token = Cookies.get("token");
  // if (!token) {
  //   throw new Error('No authentication token found');
  // }
  try {
    const response = await apiClient.get<T>(url, {
      ...options,
      headers: {
        ...getAuthHeader(),
        ...(options?.headers || {})
      }
    } as AxiosRequestConfig);
    console.log("Response status:", response.status); // Log status code
    alert("response.data ::: " + response.data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error to handle it in a higher-level catch block if necessary
  }
}

export async function deleteUser(userId: number) {
  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid user ID format");
  }

  console.log("Deleting user with ID:", userId); // Debugging log

  try {
    const response = await apiClient.delete(`${ API_URL }users/${userId}`, { headers: getAuthHeader() }); // Use apiClient here
  
    // Axios automatically throws an error for non-2xx responses, so no need to check response.ok
  
    // Check if response has data before parsing JSON
    if (response.data) {
      return response.data;
    } else {
      return { message: "User deleted successfully!" }; // Return a success message
    }
  } catch {
      return { message: "An unexpected error occurred." };
    }
  }

export async function fetchDonations() {
  const res = await apiClient.get(`${ API_URL }donations`, { // Use apiClient here
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    }
  });
  if (!res.data) throw new Error("Failed to fetch donations");
  return res.data; // Use data from the response directly
}

export async function fetchBeneficiaries(): Promise<Beneficiary[]> {
  const url = `${ API_URL }beneficiaries`;
  try{
    const response = await apiClient.get<Beneficiary[]>(url, { // Use apiClient here
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error encountered:", error);
    throw new Error("Error encountered. Contact Support.");
  }
}
