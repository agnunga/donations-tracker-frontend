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
type Donation = {
  id: number;
  amount: number;
  donorName: string;
  donationDate: string;
}

interface DonationTableProps {
  donations: Donation[];
  }

  export default function DonationTable({ donations }: DonationTableProps) {
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
                    Donor Name
                  </TableCell>
                  
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Amount
                  </TableCell>
                  <TableCell className="px-5 py-3 font-semibold text-gray-600 text-start text-sm dark:text-gray-300">
                    Date
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {donations.length > 0 ? (
                  donations.map((donation) => (
                    <TableRow key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <TableCell className="px-5 py-4 sm:px-6 text-start flex items-center gap-3">
                        <span className="block font-medium text-gray-800 dark:text-white">
                          {donation.donorName}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {donation.amount}
                      </TableCell>
                      
                      <TableCell className="px-4 py-3 text-gray-600 text-start text-sm dark:text-gray-400">
                        {donation.donationDate}
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
