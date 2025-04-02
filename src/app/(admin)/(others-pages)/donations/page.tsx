"use client";  // 👈 Required for React hooks like useState

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DonationTable from "@/components/tables/DonationTable";
import { fetchDonations } from "@/utils/api";
import { useEffect, useState } from "react";

// Define User interface
type Donation = {
  id: number;
  amount: number;
  donorName: string;
  donationDate: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
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
