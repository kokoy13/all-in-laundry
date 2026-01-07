"use client"

function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function WhyChoose() {
  const features = [
    {
      title: "Merk Terpercaya",
      icon: "⭐",
      description:
        "Sudah dipercaya oleh ribuan pelanggan di kota Bandung dan Jakarta, kami bangga menjadi pilihan utama dalam layanan laundry berkualitas.",
    },
    {
      title: "Tim Profesional",
      icon: "👥",
      description:
        "Layanan terbaik hanya dapat diberikan oleh tim yang berdedikasi dan terlatih dalam menangani berbagai jenis pakaian dan kain.",
    },
    {
      title: "Express 3 Jam",
      icon: "⚡",
      description:
        "Layanan express yang menjamin cucian Anda selesai dalam waktu 3 jam tanpa mengurangi kualitas hasil cucian.",
    },
    {
      title: "Antar Jemput Gratis",
      icon: "🚗",
      description:
        "Layanan antar-jemput gratis dengan waktu penjemputan maksimal 30 menit setelah Anda melakukan pemesanan.",
    },
    {
      title: "Pembayaran Mudah",
      icon: "💳",
      description:
        "Berbagai metode pembayaran mulai dari tunai, transfer bank, hingga pembayaran digital seperti QRIS dan dompet elektronik.",
    },
    {
      title: "Kualitas Terjamin",
      icon: "✨",
      description:
        "Setiap cucian dijamin bersih, wangi, rapi, dan higienis dengan menggunakan standar kualitas tertinggi.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Mengapa Harus Chingu Laundry?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
