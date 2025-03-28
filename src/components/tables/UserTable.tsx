import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import AppHeader from "@/layout/AppHeader";

// Define User interface
type User = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  status: "Active" | "Pending" | "Inactive";
}

interface UserTableProps {
    users: User[];
  }

  export default function UserTable({ users }: UserTableProps) {
    return (
    <div className="p-6">
      {/* Page Header */}
      {/* <AppHeader title="User Management" subtitle="Manage registered users" /> */}

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-md">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                  Full Name
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Username
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Email
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <TableCell className="px-5 py-4 sm:px-6 text-start flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-300">
                          {user.avatar ? (
                            <Image
                              width={40}
                              height={40}
                              src={user.avatar}
                              alt={user.fullname}
                              className="object-cover"
                            />
                          ) : (
                            <Image
                              width={40}
                              height={40}
                              src="/default-avatar.png" // Replace with an actual default avatar path
                              alt="Default Avatar"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="block font-medium text-gray-800 dark:text-white">
                          {user.fullname}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {user.username}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {user.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            user.status === "Active"
                              ? "success"
                              : user.status === "Pending"
                              ? "warning"
                              : "error"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <td colSpan={4} className="px-5 py-4 text-center text-gray-500">
                            No users found.
                        </td>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
