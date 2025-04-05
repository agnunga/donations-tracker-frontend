"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
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

interface CreateDonorFormProps {
  closeModal: () => void;
  loadUsers: () => void; // Add this
  user?: UserFormData | null; // Accepts an optional user object
}

// const baseUrl = process.env.NEXT_LOCAL_BASE_URL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const API_URL = `${ baseUrl }/api/`;

export default function CreateDonorForm({ closeModal, user, loadUsers }: CreateDonorFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    email: "",
    status: "ACTIVE",
    role: "OPERATIONS",
  });

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

    <ComponentCard title={user ? "Edit Donor" : "Create Donor"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label>Full Name</Label>
          <Input type="text" name="fullname" defaultValue={formData.fullname} onChange={handleChange}/>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" defaultValue={formData.email} onChange={handleChange} />
        </div>
        
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
            {loading ? (user ? "Updating..." : "Creating...") : user ? "Update Donor" : "Create Donor"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
