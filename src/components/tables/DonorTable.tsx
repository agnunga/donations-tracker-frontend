import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { deleteUser } from "@/utils/api";

import { Modal } from "@/components/ui/modal";
import CreateDonorForm from "@/components/form/CreateDonor";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import Pagination from "./Pagination";

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

interface DonorTableProps {
    users: User[];
    loadUsers : () => void; // This reloads users
  }

  export default function DonorTable({ users, loadUsers }: DonorTableProps) {

      // const [loading, setLoading] = useState(true);

      const [selectedUser, setSelectedUser] = useState<User | null>(null);
      const { isOpen, openModal, closeModal } = useModal();

      //Pagination 
      const [currentPage, setCurrentPage] = useState(1);
      const usersPerPage = 5; // Adjust as needed
      const totalPages = Math.ceil(users.length / usersPerPage);
      const paginatedUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
      );

      const handleAddUser = () => {
        setSelectedUser(null); // Clear user state for adding a new user
        openModal();
      };

      const handleEdit = (user: User) => {
        console.log("Editing user:", user);
        setSelectedUser(user);
        openModal();
      };
      
      const handleDelete = async (userId: number) => {
        
        if (!userId || typeof userId !== "number") {
          alert("Invalid user ID.");
          return;
        }

        if (confirm("Are you sure you want to delete this user?")) {
          try {
            const response = await deleteUser(userId);
            alert(response?.message );
            // Refresh users list after deletion
            loadUsers();
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
        Add Donor +
      </button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[700px] p-6 lg:p-10">
        <CreateDonorForm closeModal={closeModal} user={selectedUser} loadUsers={loadUsers} />
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
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
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
                              src="/images/user/default_user3.jpg" // Replace with an actual default avatar path
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
                            No Donors found.
                        </td>
                    </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex w-full justify-end mt-6 mb-4 px-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


