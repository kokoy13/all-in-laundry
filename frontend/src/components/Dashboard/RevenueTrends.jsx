"use client"

import { useState } from "react"

export default function RevenueTrends() {
  const [period, setPeriod] = useState("month")

  const monthlyData = [
    { month: "Jan", revenue: 12500000, orders: 245 },
    { month: "Feb", revenue: 13200000, orders: 268 },
    { month: "Mar", revenue: 14800000, orders: 295 },
    { month: "Apr", revenue: 13900000, orders: 275 },
    { month: "May", revenue: 15600000, orders: 312 },
    { month: "Jun", revenue: 16200000, orders: 324 },
    { month: "Jul", revenue: 15800000, orders: 318 },
    { month: "Aug", revenue: 17200000, orders: 345 },
    { month: "Sep", revenue: 16900000, orders: 338 },
    { month: "Oct", revenue: 18500000, orders: 370 },
    { month: "Nov", revenue: 19200000, orders: 384 },
    { month: "Dec", revenue: 20100000, orders: 402 },
  ]

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  const getMetrics = () => {
    const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0)
    const totalOrders = monthlyData.reduce((sum, d) => sum + d.orders, 0)
    const avgRevenue = totalRevenue / monthlyData.length
    const avgOrders = totalOrders / monthlyData.length

    return {
      total: totalRevenue,
      orders: totalOrders,
      avg: avgRevenue,
      avgOrders: avgOrders,
    }
  }

  const metrics = getMetrics()

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Revenue Trends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Total Revenue</p>
              <p className="text-cyan-400 font-bold text-lg">IDR {(metrics.total / 1000000).toFixed(0)}M</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Orders</p>
              <p className="text-blue-400 font-bold text-lg">{metrics.orders}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Average Daily Revenue</p>
              <p className="text-emerald-400 font-bold text-lg">IDR {(metrics.avg / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Average Orders/Day</p>
              <p className="text-purple-400 font-bold text-lg">{Math.round(metrics.avgOrders)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {["week", "month", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                period === p ? "bg-cyan-500 text-slate-950" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-between gap-2 h-64">
          {monthlyData.map((data, idx) => {
            const height = (data.revenue / maxRevenue) * 100
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer group relative"
                  style={{ height: `${height}%`, minHeight: "4px" }}
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-700 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {(data.revenue / 1000000).toFixed(1)}M
                  </div>
                </div>
                <span className="text-xs text-slate-400 text-center">{data.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span className="text-sm text-slate-300">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-sm text-slate-300">Orders Trend</span>
        </div>
      </div>
    </div>
  )
}
