"use client";  // 👈 Required for React hooks like useState

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DonationTable from "@/components/users/DonationTable";
import UserTable from "@/components/users/UserTable";
import { fetchDonations } from "@/utils/api";
import { useEffect, useState } from "react";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations()
      .then(setDonations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Donations" />
      <div className="space-y-6">
        <ComponentCard title="All Donations">
          {loading ? <p>Loading...</p> : <DonationTable donations={donations} />}
        </ComponentCard>
      </div>
    </div>
  );
}
