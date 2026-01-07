"use client"

export default function OverviewStats() {
  const stats = [
    { label: "Total Orders", value: "248", change: "+12%", icon: "📋", color: "from-blue-500 to-cyan-500" },
    { label: "Revenue Today", value: "IDR 2.4M", change: "+8%", icon: "💰", color: "from-green-500 to-emerald-500" },
    { label: "Pending Orders", value: "12", change: "-2%", icon: "⏳", color: "from-orange-500 to-yellow-500" },
    { label: "Active Customers", value: "156", change: "+4%", icon: "👥", color: "from-purple-500 to-pink-500" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
