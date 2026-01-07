import {Link} from "react-router-dom"

function PricingCard({ title, price, description, features, highlight }) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition transform hover:scale-105 ${
        highlight
          ? "bg-blue-600 text-white shadow-2xl ring-2 ring-blue-400 scale-105"
          : "bg-white text-gray-800 shadow-lg border border-gray-200"
      }`}
    >
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={`text-sm mb-6 ${highlight ? "text-blue-100" : "text-gray-600"}`}>{description}</p>

        <div className="mb-8">
          <span className="text-5xl font-bold">{price}</span>
          <span className={highlight ? "text-blue-100" : "text-gray-500"}>/kg</span>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span className={`mr-3 ${highlight ? "text-blue-200" : "text-blue-600"}`}>✓</span>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="w-full flex justify-center">
          <Link to="/reservation"
            className={`w-full text-center py-3 rounded-lg font-semibold transition ${
              highlight ? "bg-white text-blue-600 hover:bg-blue-50" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Pilih Paket
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PricingPlans() {
  const plans = [
    {
      title: "Cuci Biasa",
      price: "Rp 5.000",
      description: "Standar laundry kami",
      highlight: false,
      features: [
        "Pembersihan standar",
        "Setrika standar",
        "Pengiriman dalam 3 jam",
        "Bahan standar",
        "Garansi kebersihan",
      ],
    },
    {
      title: "Cuci Express",
      price: "Rp 12.000",
      description: "Layanan kilat kami",
      highlight: true,
      features: [
        "Pembersihan intensif",
        "Setrika premium",
        "Pengiriman dalam 30 menit",
        "Soft perfume gratis",
        "Packaging premium",
        "Prioritas handling",
      ],
    },
    {
      title: "Cuci Dry Clean",
      price: "Rp 20.000",
      description: "Untuk pakaian spesial",
      highlight: false,
      features: [
        "Dry clean profesional",
        "Pembersihan ultra lembut",
        "Setrika premium",
        "Perlindungan kain premium",
        "Packaging eksklusif",
        "Konsultasi gratis",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Paket Harga Kami</h2>
        <p className="text-center text-gray-600 mb-12">Pilih paket yang sesuai dengan kebutuhan laundry Anda</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
