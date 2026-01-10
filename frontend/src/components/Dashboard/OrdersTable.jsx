import { useEffect } from "react"
import { useState } from "react"
import { Check, X } from "lucide-react"
import {toast, Toaster} from "react-hot-toast"

export default function OrdersTable({ fetchOrders, orders, filterStatus, searchQuery }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRemove, setSelectedRemove] = useState(null)
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

  const getAction = (status) =>{
    if(status == "completed" || status == "cancelled"){
      return "hidden"
    }
  }

  const handleClick = async(condition, order_id) =>{
    if(condition === "approve" || condition === "disapprove"){
      try {
          const res = await fetch("http://localhost:5001/dashboard/setorderstatus",{
              method: "POST",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({order_id, condition})
          })
          
          const data = await res.json()
          if(!res.ok){
              toast.error(data.message)
          }else{
            toast.success(data.message)
            fetchOrders()
          } 
      } catch (error) {
          toast.error(`Error : ${error}`)
      }
    }else if(condition === "remove"){
      try {
        const res = await fetch("http://localhost:5001/dashboard/removeorder",{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({order_id})
        })
          setSelectedRemove(null)
          
          const data = await res.json()
          if(!res.ok){
              toast.error(data.message)
          }else{
            toast.success(data.message)
            fetchOrders()
          } 
        } catch (error) {
            toast.error(`Error : ${error}`)
        }
    }
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <Toaster position="top-center"></Toaster>
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
                Service ID
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
                <td className="px-6 py-5 text-sm capitalize">
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
                    <div className={`flex gap-2 items-center ${getAction(order.status)}`}>
                      <button onClick={() => handleClick("approve", order.id)}  className="cursor-pointer">
                      <Check className="w-5 h-5 text-green-500 hover:text-green-600"/>
                      </button>
                      <button onClick={() => handleClick("disapprove", order.id)} className="cursor-pointer">
                        <X className="w-5 h-5 text-red-500 hover:text-red-600"/>
                      </button>
                    </div>
                    <button onClick={() => setSelectedRemove(order.id)} className="hover:underline font-semibold cursor-pointer text-red-500">Delete</button>
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

  {/* Order Detail Modal */}
  {selectedRemove && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 flex flex-col gap-5 items-center">
          <h2 className="text-xl font-bold text-slate-900">
            Hapus Order 
          </h2>
          <p className="text-sm text-slate-600 mt-1 text-center">
            Tindakan ini <span className="font-semibold text-red-600">tidak dapat dibatalkan</span>.
            Apakah Anda yakin ingin menghapus pesanan ini?
          </p>
        </div>
        <button
          onClick={() => setSelectedRemove(null)}
          className="text-slate-400 hover:text-slate-600 text-xl cursor-pointer"
        >
          ×
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setSelectedRemove(null)}
          className="w-full cursor-pointer px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition font-medium"
        >
          Cancel
        </button>

        <button
          onClick={() => handleClick("remove", selectedRemove)}
          className="w-full cursor-pointer px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-bold"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  )
}
