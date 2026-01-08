export default function TransactionFilters({
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by order ID, customer name, or reference number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:border-blue-500 outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
