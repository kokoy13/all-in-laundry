import { useEffect } from "react"
import { useState } from "react"

export default function CustomersTable({ searchQuery, customers }) {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + recordsPerPage)

  useEffect(() => {
      setCurrentPage(1)
    }, [searchQuery])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300"
      case "inactive":
        return "bg-slate-500/20 text-slate-300"
      case "vip":
        return "bg-purple-500/20 text-purple-300"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getStatusLabel = (status) => {
    const labels = { active: "Active", inactive: "Inactive", vip: "⭐ VIP" }
    return labels[status] || status
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100/50 border-b border-gray-200">
            <tr className="text-neutral-900">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-200 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold">{customer.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold">{customer.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-xs w-max px-3 py-0.5 rounded-lg font-semibold capitalize ${customer.role == "admin"?"text-red-500 bg-red-100":"text-blue-500 bg-blue-100"}`}>{customer.role}</div>
                </td>
                <td className="px-6 py-4 flex gap-3 text-sm items-center">
                  <button className="hover:underline font-semibold cursor-pointer text-blue-500">Edit</button>
                  <button className="hover:underline font-semibold cursor-pointer text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedCustomers.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 text-lg">No customers found</p>
        </div>
      )}

      {filteredCustomers.length > 0 && (
        <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-neutral-900">
            Showing {startIndex + 1}-{Math.min(startIndex + recordsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-neutral-900 hover:border-blue-600 text-neutral-900 text-sm font-medium hover:bg-blue-500 hover:text-white cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-500 text-white border border-blue-600"
                      : "border border-neutral-900 text-neutral-900 hover:text-white hover:border-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-neutral-900 hover:border-blue-600 text-neutral-900 text-sm font-medium hover:bg-blue-500 hover:text-white cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
