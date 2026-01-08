import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import OrdersTable from "../../components/Dashboard/OrdersTable"
import OrderFilters from "../../components/Dashboard/OrderFilters"
import { useNavigate } from "react-router-dom"

export default function OrdersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [filterStatus, setFilterStatus] = useState("all")
    const [activeMenu, setActiveMenu] = useState("orders")
    const [searchQuery, setSearchQuery] = useState("")
    const [orders, setOrders] = useState([])
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
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5001/dashboard/getallorder`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setOrders(data.orders)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchOrders()
    }, [])

    return (
        <div className="flex h-screen">
        <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">Orders Management</h1>
                </div>
                <div className="shadow-sm border border-gray-200 rounded-lg">
                    <OrderFilters
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <OrdersTable orders={orders} filterStatus={filterStatus} searchQuery={searchQuery} />
                </div>
            </div>
            </main>
        </div>
        </div>
    )
}
