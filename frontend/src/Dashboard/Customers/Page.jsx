import { useEffect, useState } from "react"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import CustomersTable from "../../components/Dashboard/CustomersTable"
import { useNavigate } from "react-router-dom"

export default function CustomersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState("customers")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterSort, setFilterSort] = useState("recent")
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
        <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Customer Management</h1>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-2 px-6 rounded-lg transition-colors">
                    + Add Customer
                </button>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search customers by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 text-white placeholder-slate-500 px-4 py-2 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition-colors"
                    />
                    </div>

                    <select
                    value={filterSort}
                    onChange={(e) => setFilterSort(e.target.value)}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-cyan-400 outline-none transition-colors"
                    >
                    <option value="recent">Most Recent</option>
                    <option value="frequent">Most Frequent</option>
                    <option value="highest">Highest Spend</option>
                    <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
                </div>

                <CustomersTable searchQuery={searchQuery} sortBy={filterSort} />
            </div>
            </main>
        </div>
        </div>
    )
}
