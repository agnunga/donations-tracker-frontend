"use client";  // 👈 Required for React hooks like useState

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/users/UserTable";
import { fetchUsers } from "@/utils/api";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="User Table">
          {loading ? <p>Loading...</p> : <UserTable users={users} />}
        </ComponentCard>
      </div>
    </div>
  );
}
