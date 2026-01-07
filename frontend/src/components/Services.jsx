"use client"

function ServiceCard({ title, icon }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  )
}

export default function Services() {
  const services = [
    { title: "Daily Kiloan", icon: "👕" },
    { title: "Cuci & Setrika", icon: "🧥" },
    { title: "Laundry Sepatu", icon: "👟" },
    { title: "Laundry Tas", icon: "👜" },
    { title: "Laundry Karpet", icon: "🏠" },
    { title: "Laundry Gorden", icon: "🪟" },
    { title: "Laundry Stroller", icon: "🚼" },
    { title: "Laundry Boneka", icon: "🧸" },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Layanan All In Laundry</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menyediakan berbagai layanan laundry profesional untuk semua kebutuhan Anda
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
