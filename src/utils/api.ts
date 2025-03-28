export async function fetchUsers() {
    const res = await fetch("http://localhost:9090/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
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
  