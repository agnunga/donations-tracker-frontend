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
type Beneficiary = {
  id: number;
  name: string;
  contactInfo: string;
  needs: string;
  totalAmount: number;
  disbursedAmount: number;
}

interface BeneficiariesTableProps {
  beneficiaries: Beneficiary[];
  }

  export default function BeneficiariesTable({ beneficiaries }: BeneficiariesTableProps) {
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
                    Beneficiary Name
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Contact Info
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Needs
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                  Total Amount
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                  Disbursed Amount
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {beneficiaries.length > 0 ? (
                  beneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <TableCell className="px-4 py-3 sm:px-6 text-start  text-sm flex items-center gap-3">
                        {beneficiary.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {beneficiary.contactInfo}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {beneficiary.needs}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {beneficiary.totalAmount}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {beneficiary.disbursedAmount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <td colSpan={4} className="px-5 py-4 text-center text-gray-500">
                            No Beneficiaries found.
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
