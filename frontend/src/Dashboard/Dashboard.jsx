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
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token && !userId){
            navigate('/login')
        }
    })

    return (
        <div className="flex h-screen bg-white">
            <DashboardSidebar open={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto bg-white p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-8">Dashboard</h1>
                    <OverviewStats />
                    <RecentOrders />
                </div>
                </main>
            </div>
        </div>
    )
}
