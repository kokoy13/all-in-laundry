"use client"

import { useState } from "react"

export default function RecentOrders() {
  const [orders] = useState([
    {
      id: "#001",
      customer: "Budi Santoso",
      service: "Cuci Express",
      amount: "IDR 50,000",
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: "#002",
      customer: "Siti Nurhaliza",
      service: "Cuci Biasa",
      amount: "IDR 35,000",
      status: "in-progress",
      time: "30 mins ago",
    },
    {
      id: "#003",
      customer: "Ahmad Wijaya",
      service: "Dry Clean",
      amount: "IDR 75,000",
      status: "pending",
      time: "10 mins ago",
    },
    {
      id: "#004",
      customer: "Rina Kusuma",
      service: "Cuci Express",
      amount: "IDR 50,000",
      status: "completed",
      time: "4 hours ago",
    },
    {
      id: "#005",
      customer: "Hendra Gunawan",
      service: "Cuci Biasa",
      amount: "IDR 40,000",
      status: "in-progress",
      time: "1 hour ago",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300"
      case "in-progress":
        return "bg-blue-500/20 text-blue-300"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "✓ Completed"
      case "in-progress":
        return "⟳ In Progress"
      case "pending":
        return "⏳ Pending"
      default:
        return status
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-cyan-400">{order.id}</td>
                <td className="px-6 py-4 text-sm text-white">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{order.service}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">{order.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
