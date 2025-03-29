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
import { deleteUser } from "@/utils/api";

import { Modal } from "@/components/ui/modal";
import CreateUserForm from "@/components/form/CreateUser";
import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";

// Define User interface
type User = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  status: string;
  role: string;
}

interface UserTableProps {
    users: User[];
  }

  export default function UserTable({ users }: UserTableProps) {

      const [loading, setLoading] = useState(true);

      const [selectedUser, setSelectedUser] = useState<User | null>(null);
      const { isOpen, openModal, closeModal } = useModal();

      const handleAddUser = () => {
        setSelectedUser(null); // Clear user state for adding a new user
        openModal();
      };

      const handleEdit = (user: any) => {
        console.log("Editing user:", user);
        setSelectedUser(user);
        openModal();
      };
      
      const handleDelete = async (userId: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            deleteUser(userId);
            alert("User deleted successfully!");
            // Refresh users list after deletion
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        }
      };

      const handleCloseModal = () => {
        setSelectedUser(null); // Reset on close
        closeModal();
      };


    return (
    <div className="p-6">
      {/* Page Header */}
      {/* <AppHeader title="User Management" subtitle="Manage registered users" /> */}

      {/* Table Container */}
      <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add User +
      </button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[700px] p-6 lg:p-10">
        <CreateUserForm closeModal={closeModal} user={selectedUser} />
      </Modal>

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
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Action
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
                            user.status === "ACTIVE"
                              ? "success"
                              : user.status === "SUSPENDED"
                              ? "warning"
                              : "error"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400 ">
                      {/* <span>{user.id}</span> */}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="px-2 py-1 text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-2 py-1 text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
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


