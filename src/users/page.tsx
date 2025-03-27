import { useEffect, useState } from "react";
import { fetchUsers } from "@/utils/api";
import UserTable from "@/components/UserTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {loading ? <p>Loading...</p> : <UserTable users={users} />}
    </div>
  );
}