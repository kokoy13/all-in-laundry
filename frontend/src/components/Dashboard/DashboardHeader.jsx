import { Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">
      <button onClick={onMenuClick} className="text-neutral-900 hover:cursor-pointer hover:text-blue-500 transition-colors text-2xl">
        ☰
      </button>
      <Link
          to="/"
            className={`flex w-max cursor-pointer duration-200 items-center gap-2 px-3 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-white hover:text-blue-500
            `}
          >
            <span>
              <Home width="18"/>
            </span>
            <span className="text-sm">Back to Home</span>
        </Link>
    </header>
  )
}
