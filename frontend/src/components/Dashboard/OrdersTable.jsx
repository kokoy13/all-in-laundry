"use client"

import { useState } from "react"

export default function OrdersTable({ filterStatus, searchQuery }) {
  const [orders] = useState([
    {
      id: "#001",
      customer: "Budi Santoso",
      phone: "081234567890",
      service: "Cuci Express",
      weight: "5 kg",
      amount: "IDR 50,000",
      status: "completed",
      date: "Dec 28, 2024",
      notes: "Express service - Ready for pickup",
    },
    {
      id: "#002",
      customer: "Siti Nurhaliza",
      phone: "081987654321",
      service: "Cuci Biasa",
      weight: "8 kg",
      amount: "IDR 35,000",
      status: "in-progress",
      date: "Dec 29, 2024",
      notes: "Currently washing",
    },
    {
      id: "#003",
      customer: "Ahmad Wijaya",
      phone: "082123456789",
      service: "Dry Clean",
      weight: "3 pieces",
      amount: "IDR 75,000",
      status: "pending",
      date: "Dec 30, 2024",
      notes: "Waiting for pickup",
    },
    {
      id: "#004",
      customer: "Rina Kusuma",
      phone: "082456789012",
      service: "Cuci Express",
      weight: "4 kg",
      amount: "IDR 50,000",
      status: "completed",
      date: "Dec 28, 2024",
      notes: "Delivered to customer",
    },
    {
      id: "#005",
      customer: "Hendra Gunawan",
      phone: "083567890123",
      service: "Cuci Biasa",
      weight: "6 kg",
      amount: "IDR 40,000",
      status: "in-progress",
      date: "Dec 29, 2024",
      notes: "In drying process",
    },
    {
      id: "#006",
      customer: "Dewi Lestari",
      phone: "083456789012",
      service: "Cuci Express",
      weight: "7 kg",
      amount: "IDR 50,000",
      status: "cancelled",
      date: "Dec 27, 2024",
      notes: "Customer cancelled order",
    },
  ])

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getStatusLabel = (status) => {
    const labels = {
      completed: "✓ Completed",
      "in-progress": "⟳ In Progress",
      pending: "⏳ Pending",
      cancelled: "✕ Cancelled",
    }
    return labels[status] || status
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Service</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Weight</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-cyan-400">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white font-medium">{order.customer}</div>
                  <div className="text-xs text-slate-400">{order.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{order.service}</td>
                <td className="px-6 py-4 text-sm text-white">{order.weight}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">{order.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">View</button>
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
    </div>
  )
}
