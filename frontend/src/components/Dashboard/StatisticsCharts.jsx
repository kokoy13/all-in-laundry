"use client"

export default function StatisticsCharts() {
  const serviceStats = [
    { name: "Cuci Express", orders: 85, revenue: 4250000, percentage: 35 },
    { name: "Cuci Biasa", orders: 62, revenue: 2170000, percentage: 26 },
    { name: "Dry Clean", orders: 45, revenue: 3375000, percentage: 22 },
    { name: "Other Services", orders: 56, revenue: 2240000, percentage: 17 },
  ]

  const dailyStats = [
    { day: "Mon", orders: 28, revenue: 1120000 },
    { day: "Tue", orders: 32, revenue: 1280000 },
    { day: "Wed", orders: 35, revenue: 1400000 },
    { day: "Thu", orders: 29, revenue: 1160000 },
    { day: "Fri", orders: 38, revenue: 1520000 },
    { day: "Sat", orders: 42, revenue: 1680000 },
    { day: "Sun", orders: 24, revenue: 960000 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Service Breakdown */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Service Breakdown</h2>
        <div className="space-y-4">
          {serviceStats.map((service, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-medium">{service.name}</span>
                <span className="text-cyan-400 font-bold">{service.orders} orders</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all"
                  style={{ width: `${service.percentage}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 mt-1">IDR {(service.revenue / 1000000).toFixed(1)}M</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Performance */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Daily Performance</h2>
        <div className="space-y-3">
          {dailyStats.map((day, idx) => {
            const maxRevenue = Math.max(...dailyStats.map((d) => d.revenue))
            const barWidth = (day.revenue / maxRevenue) * 100
            return (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium w-12">{day.day}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-blue-400">{day.orders} orders</span>
                    <span className="text-emerald-400 min-w-fit">IDR {(day.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-green-500 h-full rounded-full transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
