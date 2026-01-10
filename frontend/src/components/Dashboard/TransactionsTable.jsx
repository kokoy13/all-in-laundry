import { useState, useEffect } from "react"
import { Check, X } from "lucide-react" 
import {toast, Toaster} from "react-hot-toast"

export default function TransactionsTable({fetchTransaction, transactions, searchQuery }) {
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5

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

    const getStatusColor = (status) => {
        switch (status) {
        case "completed":
            return "bg-green-50 text-green-600 border-green-600"
        case "progress":
            return "bg-blue-50 text-blue-600 border-blue-600"
        case "cancelled":
            return "bg-red-50 text-red-600 border-red-600"
        default:
            return "bg-slate-700/20 text-slate-300"
        }
    }

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
        transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.status.includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage)
    const startIndex = (currentPage - 1) * recordsPerPage
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + recordsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const getAction = (status) =>{
        if(status == "completed" || status == "cancelled"){
        return "hidden"
        }
    }

    const handleClick = async(condition, transaction_id) =>{
        if(condition === "approve" || condition === "disapprove"){
        try {
            const res = await fetch("http://localhost:5001/dashboard/settransactionstatus",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({transaction_id, condition})
            })
            
            const data = await res.json()
            if(!res.ok){
                toast.error(data.message)
            }else{
                toast.success(data.message)
                fetchTransaction()
            } 
        } catch (error) {
            toast.error(`Error : ${error}`)
        }
        }else if(condition === "update"){
            try {
                const res = await fetch("http://localhost:5001/dashboard/removetransaction",{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({transaction_id})
                })
                
                const data = await res.json()
                if(!res.ok){
                    toast.error(data.message)
                }else{
                    toast.success(data.message)
                    fetchTransaction()
                } 
            } catch (error) {
                toast.error(`Error : ${error}`)
            }
        }
    }
    
    return (
        <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <Toaster position="top-center"></Toaster>
        <div className="overflow-x-auto">
            <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-100">
                <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Transaction Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Note</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-900 uppercase">Created At</th>
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
                        <div className="text-sm font-medium text-neutral-900">{new Date(transaction.transaction_date).toLocaleDateString("id-ID", {
                            dateStyle: "medium"
                        })}</div>
                    </td>
                    <td className="px-6 py-4 text-sm truncate max-w-48">
                        {transaction.notes?.trim() ? transaction.notes : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm capitalize">
                        <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            getStatusColor(transaction.status)
                            }`}
                        >
                            <span className="text-xs">{getStatusIcon(transaction.status)}</span>
                            {getStatusLabel(transaction.status)}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium text-neutral-900">{new Date(transaction.created_at).toLocaleDateString("id-ID", {
                            dateStyle: "medium",
                        })}</div>
                    </td>
                    <td className="px-6 flex gap-2 items-center py-5 text-sm">
                        <div className={`flex gap-2 items-center ${getAction(transaction.status)}`}>
                            <button onClick={() => handleClick("approve", transaction.id)}  className="cursor-pointer">
                            <Check className="w-5 h-5 text-green-500 hover:text-green-600"/>
                            </button>
                            <button onClick={() => handleClick("disapprove", transaction.id)} className="cursor-pointer">
                            <X className="w-5 h-5 text-red-500 hover:text-red-600"/>
                            </button>
                        </div>
                        <button onClick={() => handleClick("edit", transaction.id)} className="hover:underline font-semibold cursor-pointer text-blue-500">Edit</button>
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
