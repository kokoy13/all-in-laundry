import { useEffect, useState } from "react"
import { MapPin, Shirt } from "lucide-react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Reservation() {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("id")
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!token && !userId){
            navigate('/login')
        }
    }, [token, userId, navigate])

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5001/reservation/getallservice",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )

                const data = await res.json()
                setServices(data.services)
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchService()
    }, [])

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        service_id: "",
        total_amount: "",
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
        setFormData((prev) => ({ ...prev, service_id: service.id }))
    }

    useEffect(() => {
        if (!selectedService) return

        const total_amount =
            selectedService.price * Number.parseInt(formData.quantity || 1)

        setFormData(prev => ({
            ...prev,
            total_amount
        }))
    }, [selectedService, formData.quantity])


    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try { 
            const res = await fetch("http://localhost:5001/reservation/create",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({formData, userId})
            })

            await new Promise(resolve => setTimeout(resolve, 500))

            const data = await res.json();

            if(!res.ok){
                toast.error(data.message, {
                    duration: 3000,
                    position: 'top-center',
                    removeDelay: 1000,
                })
                return
            }
            toast.success(data.message, {
                duration: 3000,
                position: 'top-center',
                removeDelay: 1000,
            })

            // Send to WhatsApp
            setTimeout(() => {
                const message = `Halo, saya ingin melakukan reservasi:\n\nNama: ${formData.name}\nHP: ${formData.phone}\nAlamat: ${formData.address}\nLayanan: ${selectedService.name}\nJumlah: ${formData.quantity} kg\nCatatan: ${formData.notes}`
                const whatsappUrl = `https://wa.me/6282169056949?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
            }, 3000);

            setTimeout(() => {
                navigate('/')
            }, 4000);

        } catch (error) {
            setLoading(false)
            toast.error(`Error: ${error}`, {
                duration: 3000,
                position: 'top-center',
                removeDelay: 1000,
            })
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Toaster/>
        <Header/>
        
        <main className="grow bg-linear-to-br from-secondary/30 to-background py-12">
            <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-2">Pesan Layanan Cuci Anda</h1>
                <p className="text-muted-foreground text-lg">
                Isi form di bawah untuk membuat reservasi dengan All In Laundry
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
                        {services.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-105 cursor-pointer hover:bg-blue-500/80 duration-200 ${
                            selectedService?.id === service.id
                                ? "border-chart-1 bg-chart-1/5 scale-105 bg-blue-500/80"
                                : "border-border hover:border-chart-1/50"
                            }`}
                        >
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                            <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-chart-1 font-semibold">
                                Rp {service.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">{service.estimation}</span>
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

                    <div className="flex w-full justify-center">
                        <button
                        type="submit"
                        disabled={
                            !selectedService ||
                            !formData.name ||
                            !formData.phone ||
                            !formData.address || !formData.quantity
                        }
                        className={`cursor-pointer hover:bg-green-500/70 duration-200 text-neutral-100 w-max bg-chart-1 hover:bg-chart-1/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-green-500/70 disabled:cursor-not-allowed ${loading ? "bg-green-500/70":"bg-green-500"}`}
                        >
                            {
                                loading ? (
                                    <>
                                        Memesan ...
                                    </>
                                ):(
                                    <>
                                        Pesan via WhatsApp
                                    </>
                                )
                            }
                        </button>
                    </div>
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
                        <p className="text-xs text-muted-foreground mt-1">{selectedService.description}</p>
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
                        <p className="font-semibold">{selectedService.estimation}</p>
                        </div>

                        <div className="pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Total</p>
                        <p className="text-3xl font-bold text-chart-1">Rp {(formData.total_amount ?? 0).toLocaleString()}</p>
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
