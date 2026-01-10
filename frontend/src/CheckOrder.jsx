import { useState, useMemo, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useNavigate } from "react-router-dom"

export default function CheckOrder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("id")
  const itemsPerPage = 6

  useEffect(() => {
      if(!token && !userId){
          navigate('/login')
      }
  }, [token, userId, navigate])

  useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5001/reservation/getorderuser?userId=${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setOrders(data.orders)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchOrders()
    }, [userId])

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm) ||
        order.id.toString().includes(searchTerm) ||
        order.address.toLowerCase().includes(searchTerm),
    )
  }, [searchTerm, orders])

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredOrders, currentPage])

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  const getStatusIcon = (status) => {
    switch (status) {
      case "progress":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "progress":
        return "from-blue-50 to-blue-50 border-blue-200"
      case "completed":
        return "from-green-50 to-green-50 border-green-200"
      case "cancelled":
        return "from-red-50 to-red-50 border-red-200"
      default:
        return "from-gray-50 to-gray-50 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "progress":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "completed":
        return "bg-green-100 text-green-700 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12 md:px-8 max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Cek Pesanan Anda
          </h1>
          <p className="text-lg text-slate-600">Pantau status pencucian laundry Anda secara real-time dengan mudah</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-400 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-300"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama, nomor telepon, ID pesanan, atau alamat..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-600">
            <span className="text-blue-600 font-bold">{paginatedOrders.length}</span> dari{" "}
            <span className="text-slate-900 font-bold">{filteredOrders.length}</span> pesanan
          </div>
        </div>

        {/* Cards Grid */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mb-8">
            {paginatedOrders.map((order, index) => (
              <div
                key={order.id}
                className={`bg-linear-to-br ${getStatusColor(order.status)} border-2 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Pesanan #{(currentPage - 1) * itemsPerPage + index + 1}</h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusBadgeColor(
                          order.status,
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status === "progress"
                          ? "Proses"
                          : order.status === "completed"
                            ? "Selesai"
                            : "Dibatalkan"}
                      </span>
                      <span>{order.status === "completed" ? "Pesanan sudah selesai dan bisa dijemput":""}</span>
                    </div>
                    <p className="text-slate-700 font-semibold text-base">{order.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2.5 hover:bg-white/50 rounded-lg cursor-pointer transition-colors duration-200 group"
                    title="Lihat detail"
                  >
                    <Eye className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Telepon</p>
                    <p className="text-slate-900 font-semibold mt-1">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Jumlah</p>
                    <p className="text-slate-900 font-semibold mt-1">{order.quantity} item</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Total</p>
                    <p className="text-slate-900 font-bold mt-1">Rp {order.total_amount.toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Tanggal</p>
                    <p className="text-slate-900 font-semibold mt-1">
                      {new Date(order.updated_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-300/50">
                  <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Alamat</p>
                  <p className="text-slate-700 mt-1.5 line-clamp-2">{order.address}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-linear-to-br from-slate-50 to-slate-50 rounded-xl border-2 border-slate-200 p-12 text-center">
            <p className="text-slate-600 mb-5 text-lg">Tidak ada pesanan ditemukan</p>
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
            <div className="text-sm font-medium text-slate-600">
              Halaman <span className="text-blue-600 font-bold">{currentPage}</span> dari{" "}
              <span className="text-slate-900 font-bold">{totalPages}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-300 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Sebelumnya
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all duration-300 ${
                      currentPage === page
                        ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                        : "border-2 border-slate-300 text-slate-700 cursor-pointer hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-300 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Pesanan #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl cursor-pointer font-light"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex w-full justify-between items-center gap-5">
                <div className="p-4 bg-slate-50 rounded-lg w-full">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Nama</span>
                  <p className="text-slate-900 font-semibold mt-1">{selectedOrder.name}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg w-full">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Telepon</span>
                  <p className="text-slate-900 font-semibold mt-1">{selectedOrder.phone}</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg w-full">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Alamat</span>
                <p className="text-slate-900 font-semibold mt-1">{selectedOrder.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Jumlah</span>
                  <p className="text-slate-900 font-semibold mt-1">{selectedOrder.quantity} item</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Total</span>
                  <p className="text-blue-600 font-bold mt-1">
                    Rp {selectedOrder.total_amount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="flex item-center gap-5 w-full justify-between">
                <div className="p-4 rounded-lg border-2 w-full border-slate-200">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Tanggal</span>
                  <p className="text-slate-900 font-semibold mt-1">
                      {new Date(selectedOrder.updated_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-slate-200 w-full">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Status</span>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold border ${getStatusBadgeColor(
                        selectedOrder.status,
                      )}`}
                    >
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status === "progress"
                        ? "Proses"
                        : selectedOrder.status === "completed"
                          ? "Selesai"
                          : "Dibatalkan"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg w-full">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Catatan</span>
                <p className="text-slate-900 font-semibold mt-1">{selectedOrder.notes || "-"}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-8 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all cursor-pointer duration-300 font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
