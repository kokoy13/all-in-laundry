import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
            setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5001/auth/register",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            })

            if(res.ok){
                setTimeout(()=>{
                navigate('/login')
                , 3000})
            }

            const data = await res.json()
            setMessage(data.message)

        } catch (error) {
            setLoading(false)
            setMessage(`Error: ${error}`)
        }finally{
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                <div className="w-full flex justify-center">
                    <img src="/img/laundry.png" alt="Laundry Logo" className="h-16" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mt-4">Buat Akun</h2>
                <p className="text-gray-500 text-sm mt-1">Gabung dengan kami untuk mengakses layanan Laundry</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="mt-2 w-full px-4 pt-3 pb-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            required
                        />
                    </div>
                    

                    {/* Email Field */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                        />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            required
                        />
                        </div>

                        <div>
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            required
                        />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r cursor-pointer from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                    {
                        message &&  
                        (
                            <div className="text-sm text-center text-red-500 pl-2 pt-2">
                                {message}
                            </div>
                        )
                    }
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                Sudah memiliki akun?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Login
                </Link>
                </p>
            </div>
        </section>
    )
}
