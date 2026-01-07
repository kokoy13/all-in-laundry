function TestimonialCard({ name, role, text}) {
  var image = name[0]
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4">
          {image}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-600">{role}</div>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dion Ortega",
      role: "Customer",
      text: "Laundry nya bisa milih wangi suka-suka, packingan rapi, dan juga harum.",
    },
    {
      name: "Catatan Gusveri",
      role: "Local Guide",
      text: "Bisa milih wangi suka-suka",
    },
    {
      name: "Merti",
      role: "Customer",
      text: "Pelayanan nya sangat mantab, cepat dan wangi sekali, terimakasih atas pelayananya Chingu Laundry.",
    },
    {
      name: "Inggit Chairun",
      role: "Content Creator",
      text: "Pengerjaannya benar-benar cepet dan rapi hasilnya juga wangi, baju tidak akan ketuker.",
    },
    {
      name: "Rosa",
      role: "Customer",
      text: "Pelayanan sangat baik, fast respon. Hasil laundry wangi dan bersih, sangat terbantu dengan layanan antar jemputnya.",
    },
    {
      name: "Radya Ananta",
      role: "Karyawan",
      text: "Tempat laundry andalan, punya layanan terbaik karena bisa express, harganya terjangkau dan bisa di anter jemput.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Apa Kata Pelanggan Setia Kami?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
