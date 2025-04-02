import axios, { AxiosRequestConfig } from "axios";
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

// const API_URL = "http://localhost:9090/api/";
const API_URL = "https://1be0-105-160-20-66.ngrok-free.app/api/";

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


// Fetch with Authorization header, using the token from cookies
export async function fetchWithAuth<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error('No authentication token found');
  }
  const response = await axios.get<T>(url, { headers: getAuthHeader(), ...options });
  return response.data;
}


export async function deleteUser(userId: number) {
  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid user ID format");
  }

  console.log("Deleting user with ID:", userId); // Debugging log

  try {
    const response = await axios.delete(`${ API_URL }users/${userId}`, { headers: getAuthHeader() });
  
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
    const res = await fetch(`${ API_URL }donations`, { headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
      }
    });
    if (!res.ok) throw new Error("Failed to fetch donations");
    return res.json();
  }
  
  export async function fetchBeneficiaries(): Promise<Beneficiary[]> {
    const url = `${ API_URL }beneficiaries`;
    try{
      const response = await axios.get<Beneficiary[]>(url, {
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
  