import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">All In Laundry</div>
        </div>

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

        <Link
          to='/login'
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </nav>
    </header>
  )
}
