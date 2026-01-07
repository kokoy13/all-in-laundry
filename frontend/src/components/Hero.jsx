import {Link} from "react-router-dom"

export default function Hero() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-blue-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">No. 1 Laundry Express di Indonesia</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur text-neutral-800">
            <div className="text-3xl font-bold mb-2">30 Menit</div>
            <div className="text-lg">Pickup dalam 30 menit</div>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur text-neutral-800">
            <div className="text-3xl font-bold mb-2">IDR 5.000</div>
            <div className="text-lg">Harga Mulai Dari</div>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur text-neutral-800">
            <div className="text-3xl font-bold mb-2">3 Jam</div>
            <div className="text-lg">Express Selesai</div>
          </div>
        </div>

        <Link
        to="/reservation"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 cursor-pointer duration-200 transition"
        >
          Reservasi Sekarang
        </Link>
      </div>
    </section>
  )
}
