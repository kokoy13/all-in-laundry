import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './Home'
import Dashboard from './Dashboard/Dashboard'
import CustomersPage from './Dashboard/Customers/Page'
import OrdersPage from './Dashboard/Orders/Page'
import StatisticsPage from './Dashboard/Statistics/Page'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Reservation from './Reservation'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/customers",
    element: <CustomersPage />
  },
  {
    path: "/dashboard/orders",
    element: <OrdersPage />
  },
  {
    path: "/dashboard/statistics",
    element: <StatisticsPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/reservation",
    element: <Reservation/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)