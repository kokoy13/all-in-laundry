import { useState } from "react"
import logo from "/img/laundry.png"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
            setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogin = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try { 
            const res = await fetch("http://localhost:5001/auth/login",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            })

            if(res.ok){
                setTimeout(()=>{
                navigate('/dashboard')
                , 3000})
            }

            const data = await res.json()
            localStorage.setItem("token", data.token)
            localStorage.setItem("id", data.id)
            setMessage(data.message)

        } catch (error) {
            setLoading(false)
            setMessage(`Error: ${error}`)
        }finally{
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-full flex justify-center">
                        <img src={logo} alt=""/>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-4">
                        Selamat Datang
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Login untuk melanjutkan layanan laundry
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@example.com"
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        required
                        placeholder="••••••••"
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full cursor-pointer bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition ${loading? "hover:opacity-90":"hover:opacity-100"}`}
                >
                    {
                        loading?
                        (
                            <>
                                Loading...
                            </>
                        ):(
                            <>
                                Login
                            </>
                        )
                    }
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
                   Belum mempunyai akun?{" "}
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                    Daftar
                </Link>
                </p>
            </div>
        </section>
    )
}
