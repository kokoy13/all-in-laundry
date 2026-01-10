export default function OverviewStats({ totalOrder, revenue, completedOrder, progressOrder }) {
  const stats = [
    {
      label: "Total Orders",
      value: totalOrder,
      icon: "📋",
      unit: "orders",
      bgColor: "bg-gradient-to-br from-slate-300 to-slate-400",
    },
    {
      label: "Revenue",
      prefix: 'Rp ',
      value: revenue,
      icon: "💰",
      unit: "total",
      bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-400",
    },
    {
      label: "Completed",
      value: completedOrder,
      icon: "✓",
      unit: "completed",
      bgColor: "bg-gradient-to-br from-emerald-300 to-emerald-400",
    },
    {
      label: "In Progress",
      value: progressOrder,
      icon: "⟳",
      unit: "active",
      bgColor: "bg-gradient-to-br from-blue-300 to-blue-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {stat.prefix}
            {stat.value.toLocaleString("id-ID")}
          </p>
          <div className="text-xs text-gray-600">{stat.unit}</div>
        </div>
      ))}
    </div>
  )
}
