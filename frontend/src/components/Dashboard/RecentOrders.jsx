export default function RecentOrders({ recentOrders }) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Order Terbaru</h2>
        <p className="text-sm text-gray-500 mt-1">Order Terbaru Pelanggan Laundry</p>
      </div>

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
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
                      order.status === "completed"
                        ? "bg-gray-100 text-gray-700"
                        : order.status === "progress"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-xs">{getStatusIcon(order.status)}</span>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
