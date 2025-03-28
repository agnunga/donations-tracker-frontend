"use client";  // 👈 Required for React hooks like useState

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BeneficiariesTable from "@/components/tables/BeneficiariesTable";
import { fetchBeneficiaries } from "@/utils/api";
import { useEffect, useState } from "react";

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
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
