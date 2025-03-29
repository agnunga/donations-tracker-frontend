export async function fetchUsers() {
  const res = await fetch("http://localhost:9090/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}



export async function createUser(userId: string, formData : FormData) {
  const method = userId ? "PUT" : "POST"; // Update if user exists
  const url = userId ? `http://localhost:9090/api/users/${user.id}` : "http://localhost:9090/api/users";
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData}),
  });
}


export async function deleteUser(userId: string) {
  const res = await fetch(`http://localhost:9090/api/users/${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
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
  