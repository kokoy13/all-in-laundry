import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ChartNoAxesGantt,  ListOrdered, LogOut, ArrowDownUp} from "lucide-react"

import user from "/img/user.png"

export default function Header() {

  const [isLogin, setIsLogin] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("id")
  const role = localStorage.getItem("role")

  useEffect(() => {
    if(token && userId && role){
      setIsLogin(true)
      if(role == 'admin'){
        setIsAdmin(true)
      }
    }else{
      setIsLogin(false)
    }
  }, [token, userId, role])

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('role')

    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a href='/' className="text-2xl font-bold text-blue-600">All In Laundry</a>
        </div>

        {
          isLogin ?
          (
            <></>
          ):(
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600">
                Layanan
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">
                Tentang
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                Harga
              </a>
            </div>
          )
        }

        {
          isLogin ? (
            <>
              <div className='relative'>
                <button
                  onClick={handleDropdownToggle}
                  className=" text-white px-6 py-2 cursor-pointer rounded-lg font-semibold flex items-center space-x-2"
                >
                  <img src={user} className='h-7 rounded-full' alt="" />
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-black transition-transform duration-200 bi bi-chevron-down ${isDropdownOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 text-sm mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {
                      isAdmin && (
                        <Link
                          to="/dashboard"
                          className=" flex items-center gap-2 px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 transition"
                        >
                          <ChartNoAxesGantt width="16"></ChartNoAxesGantt>
                          <span>Dashboard</span>
                        </Link>
                      )
                    }
                    <Link
                      to="/check-order"
                      className=" flex items-center gap-2 px-4 py-3 w-full text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 transition"
                    >
                      <ListOrdered width="16"></ListOrdered>
                      <span>Check Order</span>
                    </Link>
                    <Link
                      to='/reservation'
                      className=" flex items-center gap-2 text-left w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-100 transition"
                    >
                      <ArrowDownUp width="16"/>
                      <span>Reservation</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-left px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 transition font-semibold"
                    >
                      <LogOut width="16"></LogOut>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ):
          (
            <>
              <Link
                to='/login'
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </>
          )
        }
      </nav>
    </header>
  )
}
