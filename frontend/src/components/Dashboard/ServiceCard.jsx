import { Trash2 } from "lucide-react"

export default function ServiceCard({services}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Service Breakdown */}
      {services.map((service, idx) => (
        <div key={idx} className="bg-slate-100/10 border hover:scale-105 transition-all hover:bg-blue-100 cursor-pointer duration-300 border-gray-200 shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">{service.name}</h2>
            <Trash2 className="mb-8 text-red-500 hover:text-red-600 hover:scale-110 duration-200 transition-all p-1 rounded-lg" width={28} height={28}/>
          </div>
          <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-500">{service.description}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-slate-800 font-semibold mt-1">Rp {(service.price.toLocaleString())}</div>
                  <h2 className="text-neutral-800">Estimasi : {service.estimation}</h2>
                </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  )
}
