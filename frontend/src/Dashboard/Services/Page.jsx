import { useEffect, useState } from "react"
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import { useNavigate } from "react-router-dom"
import ServiceCard from "../../components/Dashboard/ServiceCard"
import { Plus } from "lucide-react"

export default function ServicesPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeMenu, setActiveMenu] = useState("services")
    const [services, setServices] = useState([])
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
        const fetchService = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/dashboard/getallservice",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setServices(data.services)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchService()
    }, [])

    return (
        <div className="flex h-screen">
        <DashboardSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} open={sidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-neutral-900 mb-8">Services</h1>
                    <button
                        className={`flex mb-8 w-max cursor-pointer duration-200 items-center gap-1 font-semibold px-3 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-400
                            `}
                        >
                            <span>
                                <Plus />
                            </span>
                            <span className="text-sm">Add Service</span>
                    </button>
                </div>
                <ServiceCard services={services}/>
            </div>
            </main>
        </div>
        </div>
    )
}
