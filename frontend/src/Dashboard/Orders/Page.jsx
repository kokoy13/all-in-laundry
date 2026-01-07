import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import OrdersTable from "../../components/Dashboard/OrdersTable"
import OrderFilters from "../../components/Dashboard/OrderFilters"
import { useNavigate } from "react-router-dom"

export default function OrdersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [filterStatus, setFilterStatus] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token && !userId){
            navigate('/login')
        }
    })

    return (
        <div className="flex h-screen bg-slate-950">
        <DashboardSidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Orders Management</h1>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-2 px-6 rounded-lg transition-colors">
                    + New Order
                </button>
                </div>

                <OrderFilters
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                />
                <OrdersTable filterStatus={filterStatus} searchQuery={searchQuery} />
            </div>
            </main>
        </div>
        </div>
    )
}
