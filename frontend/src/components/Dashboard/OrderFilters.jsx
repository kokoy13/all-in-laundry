export default function OrderFilters({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
  const statuses = [
    { value: "all", label: "All Orders" },
    { value: "progress", label: "Proses" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancel" },
  ]

  return (
    <div className="rounded-lg p-6 m-6 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by customer name, order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors text-white whitespace-nowrap ${
                filterStatus === status.value
                  ? "bg-blue-500"
                  : "bg-neutral-900 hover:bg-blue-500"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
