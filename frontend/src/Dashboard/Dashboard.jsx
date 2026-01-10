import { useEffect, useState } from "react"
import DashboardHeader from "../components/Dashboard/DashboardHeader"
import DashboardSidebar from "../components/Dashboard/DashboardSidebar"
import OverviewStats from "../components/Dashboard/OverviewStats"
import RecentOrders from "../components/Dashboard/RecentOrders"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const role = localStorage.getItem("role")
    const [totalOrder, setTotalOrder] = useState("")
    const [revenue, setRevenue] = useState(0)
    const [completedOrder, setCompletedOrder] = useState("")
    const [progressOrder, setProgressOrder] = useState("")
    const [recentOrders, setRecentOrders] = useState([])
    const [activeMenu, setActiveMenu] = useState("overview")
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
        const fetchOverview = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5001/dashboard/getoverview`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setTotalOrder(data.totalOrder)
                setRevenue(data.revenue)
                setCompletedOrder(data.completedOrder)
                setProgressOrder(data.progressOrder)
                setRecentOrders(data.recentOrders)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchOverview()
    }, [])

    return (

        <div className="flex h-screen bg-white">
            <DashboardSidebar open={sidebarOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto bg-white p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-8">Dashboard</h1>
                    <OverviewStats totalOrder={totalOrder} revenue={revenue} completedOrder={completedOrder} progressOrder={progressOrder}/>
                    <RecentOrders recentOrders={recentOrders}/>
                </div>
                </main>
            </div>
        </div>
    )
}
