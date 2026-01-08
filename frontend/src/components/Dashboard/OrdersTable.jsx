import { useEffect } from "react"
import { useState } from "react"
import { Check, X } from "lucide-react"

export default function OrdersTable({ orders, filterStatus, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓"
      case "progress":
        return "⟳"
      default:
        return "○"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "progress":
        return "In Progress"
      default:
        return status
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesSearch =
      order.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalPages = Math.ceil(filteredOrders.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + recordsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filterStatus, searchQuery])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-600 border-green-600"
      case "progress":
        return "bg-blue-50 text-blue-600 border-blue-600"
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-600"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const handleClick = async(condition) =>{
    if(condition === "approve"){
      console.log("setuju")
    }else if(condition === "disapprove"){
      console.log("ndak setuju")
    }else if(condition === "remove"){
      console.log("hapus")
    }
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Service
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Quantity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-5 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-5 text-sm text-gray-700">{order.name}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{order.service_id}</td>
                <td className="px-6 py-5 text-sm font-medium text-gray-900">{order.quantity} Kg</td>
                <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                  Rp {order.total_amount.toLocaleString()}
                </td>
                <td className="px-6 py-5 text-sm">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(order.status)
                    }`}
                  >
                    <span className="text-xs">{getStatusIcon(order.status)}</span>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 flex gap-2 items-center py-5 text-sm">
                    <button onClick={handleClick("approve")}  className="cursor-pointer">
                      <Check className="w-5 h-5 text-green-500 hover:text-green-600"/>
                    </button>
                    <button onClick={handleClick("disapprove")} className="cursor-pointer">
                      <X className="w-5 h-5 text-red-500 hover:text-red-600"/>
                    </button>
                    <button onClick={handleClick("remove")} className="hover:underline font-semibold cursor-pointer text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 text-lg">No orders found</p>
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-neutral-900">
            Showing {startIndex + 1}-{Math.min(startIndex + recordsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
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
