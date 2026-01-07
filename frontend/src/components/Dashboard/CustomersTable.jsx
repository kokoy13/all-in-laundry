"use client"

import { useState } from "react"

export default function CustomersTable({ searchQuery, sortBy }) {
  const [customers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      phone: "081234567890",
      email: "budi@email.com",
      totalOrders: 12,
      totalSpent: 600000,
      lastOrder: "Dec 28, 2024",
      status: "active",
      joinDate: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      phone: "081987654321",
      email: "siti@email.com",
      totalOrders: 8,
      totalSpent: 280000,
      lastOrder: "Dec 29, 2024",
      status: "active",
      joinDate: "Feb 20, 2024",
    },
    {
      id: 3,
      name: "Ahmad Wijaya",
      phone: "082123456789",
      email: "ahmad@email.com",
      totalOrders: 15,
      totalSpent: 1125000,
      lastOrder: "Dec 30, 2024",
      status: "active",
      joinDate: "Jan 5, 2024",
    },
    {
      id: 4,
      name: "Rina Kusuma",
      phone: "082456789012",
      email: "rina@email.com",
      totalOrders: 6,
      totalSpent: 300000,
      lastOrder: "Dec 28, 2024",
      status: "active",
      joinDate: "Mar 10, 2024",
    },
    {
      id: 5,
      name: "Hendra Gunawan",
      phone: "083567890123",
      email: "hendra@email.com",
      totalOrders: 9,
      totalSpent: 360000,
      lastOrder: "Dec 29, 2024",
      status: "active",
      joinDate: "Feb 5, 2024",
    },
    {
      id: 6,
      name: "Dewi Lestari",
      phone: "083456789012",
      email: "dewi@email.com",
      totalOrders: 3,
      totalSpent: 150000,
      lastOrder: "Dec 27, 2024",
      status: "inactive",
      joinDate: "Apr 18, 2024",
    },
    {
      id: 7,
      name: "Reza Prasetya",
      phone: "085123456789",
      email: "reza@email.com",
      totalOrders: 20,
      totalSpent: 1400000,
      lastOrder: "Dec 30, 2024",
      status: "vip",
      joinDate: "Jan 1, 2024",
    },
    {
      id: 8,
      name: "Maya Indraswari",
      phone: "085987654321",
      email: "maya@email.com",
      totalOrders: 11,
      totalSpent: 550000,
      lastOrder: "Dec 26, 2024",
      status: "active",
      joinDate: "Mar 5, 2024",
    },
  ])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "frequent":
        return b.totalOrders - a.totalOrders
      case "highest":
        return b.totalSpent - a.totalSpent
      case "alphabetical":
        return a.name.localeCompare(b.name)
      case "recent":
      default:
        return new Date(b.lastOrder) - new Date(a.lastOrder)
    }
  })

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
    <div className="bg-white border border-slate-700 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Orders</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Spent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Order</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-white">{customer.name}</div>
                  <div className="text-xs text-slate-400">{customer.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-300">{customer.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-cyan-400">{customer.totalOrders}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-emerald-400">
                    IDR {(customer.totalSpent / 1000).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-400">{customer.lastOrder}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(customer.status)}`}>
                    {getStatusLabel(customer.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedCustomers.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-slate-400 text-lg">No customers found</p>
        </div>
      )}
    </div>
  )
}
