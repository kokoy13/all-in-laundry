import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import { useNavigate } from "react-router-dom"
import TransactionFilters from "../../components/Dashboard/TransactionFilter"
import TransactionsTable from "../../components/Dashboard/TransactionsTable"

export default function TransactionsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState("transactions")
    const [searchQuery, setSearchQuery] = useState("")
    const [transactions, setTransactions] = useState([])
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token || !userId){
            navigate('/login')
            return
        }

        if(role !== 'admin'){
            navigate(-1)
            return
        }
    }, [token, userId, role, navigate])

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/dashboard/getalltransaction",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setTransactions(data.transactions)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchTransaction()
    }, [])

    return (
        <div className="flex h-screen">
        <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-8">Transaction</h1>
                </div>
                <div className="shadow-sm border border-gray-200 rounded-lg p-6">
                    <TransactionFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <TransactionsTable transactions={transactions} searchQuery={searchQuery} />
                </div>
            </main>
        </div>
        </div>
    )
}
