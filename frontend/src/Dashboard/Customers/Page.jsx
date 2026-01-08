import { useEffect, useState } from "react"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import CustomersTable from "../../components/Dashboard/CustomersTable"
import { useNavigate } from "react-router-dom"

export default function CustomersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState("customers")
    const [searchQuery, setSearchQuery] = useState("")
    const [customers, setCustomers] = useState([])
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
        const fetchCustomers = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5001/dashboard/getallcustomer`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setCustomers(data.customers)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchCustomers()
    }, [])

    return (
        <div className="flex h-screen">
        <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-enutral-900">Customer Management</h1>
                </div>

                <div className="border border-gray-200 w-1/2 shadow-sm rounded-lg p-6 mb-6">
                    <div className="flex w-full">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search customers by name or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full shadow-sm px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <CustomersTable searchQuery={searchQuery} customers={customers}/>
            </div>
            </main>
        </div>
        </div>
    )
}
