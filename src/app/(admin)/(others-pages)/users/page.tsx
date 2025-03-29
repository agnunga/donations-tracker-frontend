"use client";

import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/tables/UserTable";
import { fetchUsers } from "@/utils/api";

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

      <ComponentCard title="All Users">
        {loading ? <p>Loading...</p> : <UserTable users={users} />}
      </ComponentCard>
    </div>
  );
}
