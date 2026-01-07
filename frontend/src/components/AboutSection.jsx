"use client"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Laundry Bersih, Wangi, Higienis, dan Tepat Waktu</h2>
            <p className="text-gray-600 text-lg mb-4">
              <strong>All In Laundry</strong> adalah layanan laundry kiloan dan satuan. Kami adalah tim
              profesional yang selalu mengutamakan kualitas cucian & pelayanan dengan prinsip bersih, rapi, wangi,
              higienis & tepat waktu.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Kami menerima laundry kiloan untuk perusahaan, misal kantor, rumah sakit, asrama, pesantren, sekolah,
              perusahaan konveksi atau perusahaan-perusahaan semisal. Silakan hubungi kami untuk penawaran harga khusus
              dengan kontrak minimal 3 bulan.
            </p>
            <p className="text-gray-600 text-lg font-semibold text-blue-600">
              Maksimalkan waktu berharga Anda, biarkan Tim Profesional kami yang mencuci untuk Anda!
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-12 rounded-xl">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-2xl font-semibold text-gray-700">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
