export async function fetchUsers() {
  const res = await fetch("http://localhost:9090/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function deleteUser(userId: number) {
  if (!userId || typeof userId !== "number") {
    throw new Error("Invalid user ID format");
  }

  console.log("Deleting user with ID:", userId); // Debugging log

  const res = await fetch(`http://localhost:9090/api/users/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorText = await res.text(); // Capture server response
    console.log("Failed", errorText)
    return { message: "User deletion failed, contact support!" };
  }

  // Check if response has a body before parsing JSON
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    return { message: "User deleted successfully!" }; // Return a success message
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
  