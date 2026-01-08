import { useState, useEffect } from "react"

export default function TransactionsTable({transactions, searchQuery }) {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
        transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.orderId.includes(searchQuery) ||
        transaction.referenceNumber.includes(searchQuery.toUpperCase())
        return matchesSearch
    })

    const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage)
    const startIndex = (currentPage - 1) * recordsPerPage
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + recordsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])
    
    return (
        <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-100">
                <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Transaction Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Note</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-100 border-gray-200 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-neutral-900">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-neutral-900">{transaction.order_id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                        + Rp {transaction.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium text-neutral-900">{transaction.transaction_date}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                        <span
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border`}
                        >
                            {transaction.notes}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-500">
                        <button className="hover:underline font-semibold cursor-pointer text-sm">Edit</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
            <p className="text-neutral-900 text-lg">No transactions found</p>
            </div>
        )}

        {filteredTransactions.length > 0 && (
            <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-neutral-900">
                Showing {startIndex + 1}-{Math.min(startIndex + recordsPerPage, filteredTransactions.length)} of{" "}
                {filteredTransactions.length} customers
            </div>

            <div className="flex gap-2">
                <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-neutral-900 hover:border-blue-600 text-neutral-900 text-sm font-medium hover:bg-blue-500 hover:text-white cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                Previous
                </button>

                <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === page
                        ? "bg-blue-500 text-white border border-blue-600"
                        : "border border-neutral-900 text-neutral-900 hover:text-white hover:border-blue-600 hover:bg-blue-500"
                    }`}
                    >
                    {page}
                    </button>
                ))}
                </div>

                <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-neutral-900 hover:border-blue-600 text-neutral-900 text-sm font-medium hover:bg-blue-500 hover:text-white cursor-pointer duration-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                Next
                </button>
            </div>
            </div>
        )}
        </div>
    )
}
