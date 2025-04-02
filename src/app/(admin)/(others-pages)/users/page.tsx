"use client";

import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/tables/UserTable";
import { fetchUsers } from "@/utils/api";

// Define User interface
type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const loadUsers = async () => {
    try {
      //const response = await fetch("http://localhost:9090/api/users");
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />

      <ComponentCard title="All Users">
        {loading ? <p>Loading...</p> : <UserTable users={users} loadUsers={loadUsers} />}
      </ComponentCard>
    </div>
  );
}
