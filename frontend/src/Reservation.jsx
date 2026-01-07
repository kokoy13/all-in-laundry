import { useEffect, useState } from "react"
import { MapPin, Shirt } from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useNavigate } from "react-router-dom"

const SERVICES = [
    { id: 1, name: "Cuci Biasa", price: 5000, duration: "3-5 hari", desc: "Pencucian standar dengan deterjen" },
    { id: 2, name: "Cuci Express", price: 12000, duration: "3 jam", desc: "Layanan kilat untuk kebutuhan mendesak" },
    {
        id: 3,
        name: "Cuci Dry Clean",
        price: 20000,
        duration: "2-3 hari",
        desc: "Untuk pakaian yang memerlukan perawatan khusus",
    },
    { id: 4, name: "Cuci Setrika", price: 15000, duration: "2-3 hari", desc: "Cuci dan setrika lengkap" },
]

export default function Reservation() {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token && !userId){
            navigate('/login')
        }
    })

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        service: "",
        date: "",
        time: "",
        quantity: "1",
        notes: "",
    })

    const [selectedService, setSelectedService] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleServiceSelect = (service) => {
        setSelectedService(service)
        setFormData((prev) => ({ ...prev, service: service.name }))
    }

    const calculateTotal = () => {
        if (!selectedService) return 0
        return selectedService.price * Number.parseInt(formData.quantity || 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Send to WhatsApp
        const message = `Halo, saya ingin melakukan reservasi:\n\nNama: ${formData.name}\nHP: ${formData.phone}\nAlamat: ${formData.address}\nLayanan: ${formData.service}\nTanggal: ${formData.date}\nJam: ${formData.time}\nJumlah: ${formData.quantity} kg\nCatatan: ${formData.notes}`
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />

        <main className="grow bg-linear-to-br from-secondary/30 to-background py-12">
            <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Pesan Layanan Cuci Anda</h1>
                <p className="text-muted-foreground text-lg">
                Isi form di bawah untuk membuat reservasi dengan Chingu Laundry
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info */}
                    <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Shirt className="w-5 h-5" />
                        Informasi Pribadi
                    </h2>
                    <div className="space-y-4">
                        <div>
                        <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-chart-1 focus:border-transparent bg-background"
                            placeholder="Masukkan nama Anda"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-chart-1 focus:border-transparent bg-background"
                            placeholder="08xxxxxxxxxx"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Alamat Pengambilan
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-chart-1 focus:border-transparent bg-background"
                            placeholder="Jalan, RT/RW, Kota, Provinsi"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Service Selection */}
                    <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Pilih Layanan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedService?.id === service.id
                                ? "border-chart-1 bg-chart-1/5"
                                : "border-border hover:border-chart-1/50"
                            }`}
                        >
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{service.desc}</p>
                            <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-chart-1 font-semibold">
                                Rp {service.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">{service.duration}</span>
                            </div>
                        </button>
                        ))}
                    </div>
                    </div>

                    {/* Details */}
                    <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>
                    <div className="space-y-4">
                        <div>
                        <label className="block text-sm font-medium mb-2">Jumlah (kg)</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-chart-1 focus:border-transparent bg-background"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-medium mb-2">Catatan Khusus (Opsional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-chart-1 focus:border-transparent bg-background"
                            placeholder="Instruksi khusus atau permintaan spesial..."
                        />
                        </div>
                    </div>
                    </div>

                    <button
                    type="submit"
                    disabled={
                        !selectedService ||
                        !formData.name ||
                        !formData.phone ||
                        !formData.address ||
                        !formData.date ||
                        !formData.time
                    }
                    className="w-full bg-chart-1 hover:bg-chart-1/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    Pesan via WhatsApp
                    </button>
                </form>
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                <div className="bg-card rounded-lg p-6 border border-border sticky top-6 h-fit">
                    <h2 className="text-lg font-semibold mb-6">Ringkasan Pesanan</h2>

                    {selectedService ? (
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground">Layanan</p>
                        <p className="font-semibold text-lg">{selectedService.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedService.desc}</p>
                        </div>

                        <div className="pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground">Harga per kg</p>
                        <p className="font-semibold">Rp {selectedService.price.toLocaleString()}</p>
                        </div>

                        <div className="pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground">Jumlah</p>
                        <p className="font-semibold">{formData.quantity} kg</p>
                        </div>

                        <div className="pb-4 border-b border-border">
                        <p className="text-sm text-muted-foreground">Estimasi Selesai</p>
                        <p className="font-semibold">{selectedService.duration}</p>
                        </div>

                        <div className="pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Total</p>
                        <p className="text-3xl font-bold text-chart-1">Rp {calculateTotal().toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-2">Pembayaran saat barang diambil</p>
                        </div>
                    </div>
                    ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Pilih layanan untuk melihat ringkasan harga</p>
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>
        </main>

        <Footer />
        </div>
    )
}
