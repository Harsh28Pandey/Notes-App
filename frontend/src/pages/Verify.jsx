import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying...")

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`http://localhost:8000/user/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.success) {
                    setStatus("✅ Email Verified Successfully")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setStatus("❌ Invalid or Expired Token.")
                }
            } catch (error) {
                console.log(error)
                setStatus("❌ Verification Failed. Please try again.")
            }
        }
        verifyEmail()
    }, [token, navigate])

    return (
        <div className="relative w-full min-h-screen bg-linear-to-br from-green-100 via-green-200 to-green-300 overflow-hidden">

            {/* background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-md space-y-4">

                    {/* status icon */}
                    <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-green-700" />
                    </div>

                    {/* status text */}
                    <h2 className="text-2xl font-bold text-gray-900">
                        {status}
                    </h2>

                    {/* helper text */}
                    <p className="text-sm text-gray-600">
                        You can safely close this page or continue using the application.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Verify