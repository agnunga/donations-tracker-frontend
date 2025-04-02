"use client";  // 👈 Required for React hooks like useState

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BeneficiariesTable from "@/components/tables/BeneficiariesTable";
import { fetchBeneficiaries } from "@/utils/api";
import { useEffect, useState } from "react";


// Define User interface
type Beneficiary = {
  id: number;
  name: string;
  contactInfo: string;
  needs: string;
  totalAmount: number;
  disbursedAmount: number;
}

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeneficiaries()
      .then(setBeneficiaries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Beneficiaries" />
      <div className="space-y-6">
        <ComponentCard title="All Beneficiaries">
          {loading ? <p>Loading...</p> : <BeneficiariesTable beneficiaries={beneficiaries} />}
        </ComponentCard>
      </div>
    </div>
  );
}
