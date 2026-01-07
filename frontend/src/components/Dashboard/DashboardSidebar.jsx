import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"

import {ChartNoAxesGantt, ChartNoAxesCombined, ListOrdered, Users, LogOut} from "lucide-react"

const menuItems = [
  { id: "overview", label: "Overview", icon: <ChartNoAxesGantt />, href: "/dashboard" },
  { id: "orders", label: "Orders", icon: <ListOrdered />, href: "/dashboard/orders" },
  { id: "stats", label: "Statistics", icon: <ChartNoAxesCombined />, href: "/dashboard/statistics" },
  { id: "customers", label: "Customers", icon: <Users />, href: "/dashboard/customers" },
]

export default function DashboardSidebar({ open }) {
  const [activeMenu, setActiveMenu] = useState("overview")
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('role')

    navigate('/')
  }

  return (
    <aside
      className={`${open ? "w-64" : "w-20"} bg-white border-r border-blue-500 transition-all duration-300 flex flex-col`}
    >
      <div className="p-6 border-b  border-blue-500">
        <h2 className="font-bold text-blue-500 text-lg">{open?"ALL IN LAUNDRY":""}</h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              activeMenu === item.id ? "bg-blue-500 text-white font-semibold" : "text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
            className={`flex w-full cursor-pointer items-center gap-3 p-3 rounded-lg transition-colors text-blue-500 hover:bg-blue-500 hover:text-white
            `}
          >
            <span className="text-xl">
              <LogOut />
            </span>
            {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
