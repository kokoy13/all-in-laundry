"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="text-2xl font-bold mb-2">All In Laundry</div>
            <p className="text-gray-400 text-sm">
              All In Laundry adalah layanan laundry kiloan dan satuan terpercaya di Indonesia.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Harga
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="tel:085174450012" className="hover:text-white transition">
                  085174450012
                </a>
              </li>
              <li>
                <a href="tel:081188851121" className="hover:text-white transition">
                  081188851121
                </a>
              </li>
              <li>
                <a href="https://wa.me/6285174450012" className="hover:text-white transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Instagram
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p className="mb-4">Copyright © All In Laundry 2025</p>
          <p>Managed by Digital Team Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
