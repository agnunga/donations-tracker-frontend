"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import axios from "axios";
import { getAuthHeader } from "@/utils/auth";

interface UserFormData {
  id: number;
  username: string;
  password?: string;
  fullname: string;
  email: string;
  status: string;
  role: string;
}

interface CreateUserFormProps {
  closeModal: () => void;
  loadUsers: () => void; // Add this
  user?: UserFormData | null; // Accepts an optional user object
}

// const API_URL = "http://localhost:9090/api/";
const API_URL = "https://040f-105-160-20-66.ngrok-free.app/api/";

export default function CreateUserForm({ closeModal, user, loadUsers }: CreateUserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    email: "",
    status: "ACTIVE",
    role: "OPERATIONS",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate form with user data if editing
  useEffect(() => {
    if (user) {
        // console.log("Create, edit user:", user);
        setFormData({ ...user, password: "" }); // Don't prepopulate password
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: keyof UserFormData) => (value: string) => {

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const method = user ? 'put' : 'post'; // Use lowercase methods for Axios
      const url = user
        ? `${ API_URL }users/${user.id}`
        : `${ API_URL }users`;
    
      const response = await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        data: { ...formData, role: formData.role },
      });
    
      if (response.status !== 200) {
        throw new Error(user ? 'Failed to update user' : 'Failed to create user');
      }
    
      setSuccess(user ? 'User updated successfully!' : 'User created successfully!');
      loadUsers();
      closeModal(); // Close modal on success
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }

  };

  return (

    <ComponentCard title={user ? "Edit User" : "Create User"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Username</Label>
          <Input type="text" name="username" defaultValue={formData.username} onChange={handleChange} disabled={!!user}/>
        </div>
        <div>
          <Label>Full Name</Label>
          <Input type="text" name="fullname" defaultValue={formData.fullname} onChange={handleChange}/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" defaultValue={formData.email} onChange={handleChange} />
        </div>
        {!user && ( // Show password field only for new users
          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
              </button>
            </div>
          </div>
        )}
        <div>
          <Label>Status</Label>
          <Select
            options={[
                { value: "PENDING", label: "Pending" }, 
                { value: "ACTIVE", label: "Active" }, 
                { value: "SUSPENDED", label: "Suspended" },
                { value: "DISABLED", label: "Disabled" }
            ]}
            defaultValue={formData.status}
            onChange={handleSelectChange("status")}
            
          />
        </div>
        <div>
          <Label>Role</Label>
          <Select
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "OPERATIONS", label: "Operations" },
              { value: "DONOR", label: "Donor" },
              { value: "BENEFICIARY", label: "Beneficiary" },
              { value: "AUDITOR", label: "Auditor" }
            ]}
            defaultValue={formData.role}
            onChange={handleSelectChange("role")}
            
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-50 dark:border-gray-700"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? (user ? "Updating..." : "Creating...") : user ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
