import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import StatisticsCharts from "../../components/Dashboard/StatisticsCharts"
import RevenueTrends from "../../components/Dashboard/RevenueTrends"
import { useNavigate } from "react-router-dom"

export default function StatisticsPage() {
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
        <div className="flex h-screen bg-slate-950">
        <DashboardSidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Statistics & Analytics</h1>
                <StatisticsCharts />
                <RevenueTrends />
            </div>
            </main>
        </div>
        </div>
    )
}
