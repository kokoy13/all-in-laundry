import { Link, useNavigate } from "react-router-dom"

import {
  ChartNoAxesGantt,
  Wrench,
  ListOrdered,
  Users,
  LogOut,
  CircleDollarSign
} from "lucide-react"

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: <ChartNoAxesGantt />,
    href: "/dashboard",
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ListOrdered />,
    href: "/dashboard/orders",
  },
  
  {
    id: "customers",
    label: "Customers",
    icon: <Users />,
    href: "/dashboard/customers",
  },
  {
    id: "services",
    label: "Services",
    icon: <Wrench />,
    href: "/dashboard/services",
  },
  {
    id: "transactions",
    label: "Transaction",
    icon: <CircleDollarSign />,
    href: "/dashboard/transaction",
  },
]


export default function DashboardSidebar({ open, activeMenu, setActiveMenu }) {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("role")
    navigate("/")
  }

  return (
    <aside
      className={`${open ? "w-64" : "w-20"} bg-blue-600/90 border-r border-blue-200 transition-all duration-300 flex flex-col`}
    >
      <div className="p-6">
        <h2 className={`font-semibold text-white text-lg ${!open && "text-center"}`}>
          {open ? "ALL IN LAUNDRY" : "AI"}
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-5">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            onClick={() => setActiveMenu(item.id)}
            className={`flex items-center gap-3 p-3 rounded-lg border-b transition-all duration-200 ${
              activeMenu === item.id
                ? "bg-slate-200 text-neutral-900 font-semibold shadow-sm"
                : "text-white hover:bg-slate-200 hover:text-neutral-900 hover:shadow-sm"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {open && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-lg text-white border-b hover:bg-slate-200 hover:text-neutral-900 hover:shadow-sm cursor-pointer transition-all duration-200">
          <LogOut></LogOut>
          {open && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
