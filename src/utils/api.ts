import axios from "axios";
import { fetchWithAuth, getAuthHeader } from "./auth";

type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  role: string;
}

export async function fetchUsers(): Promise<User[]> {
  const url = "http://localhost:9090/api/users";
  try {
    const users = await fetchWithAuth<User[]>(url);
    return users;
  } catch (error) {
    console.error("Error encountered:", error);
    throw new Error("Error encountered. Contact Support.");
  }
}

export async function deleteUser(userId: number) {
  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid user ID format");
  }

  console.log("Deleting user with ID:", userId); // Debugging log

  try {
    const response = await axios.delete(`http://localhost:9090/api/users/${userId}`, { headers: getAuthHeader() });
  
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
    const res = await fetch("http://localhost:9090/api/donations");
    if (!res.ok) throw new Error("Failed to fetch donations");
    return res.json();
  }
  
  export async function fetchBeneficiaries() {
    const res = await fetch("http://localhost:9090/api/beneficiaries");
    if (!res.ok) throw new Error("Failed to fetch beneficiaries");
    return res.json();
  }
  