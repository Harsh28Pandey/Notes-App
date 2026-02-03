import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

const ChangePassword = () => {

    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleChangePassword = async (e) => {
        setError("")
        setSuccess("")

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Password do not match")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/change-password/${email}`, {
                newPassword,
                confirmPassword
            })
            setSuccess(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 via-green-200 to-green-300 px-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-green-700">
                        Change Password
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Set a new password for <br />
                        <span className="font-semibold text-gray-800">{email}</span>
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">
                        {success}
                    </div>
                )}

                {/* Inputs */}
                <div className="space-y-4">
                    <Input
                        type="password"
                        placeholder="New password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-11 rounded-lg"
                    />

                    <Input
                        type="password"
                        placeholder="Confirm new password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-11 rounded-lg"
                    />

                    {/* Button */}
                    <Button
                        className="w-full h-11 bg-green-700 hover:bg-green-600 rounded-lg text-white font-semibold transition-all duration-200"
                        disabled={isLoading}
                        onClick={handleChangePassword}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Changing...
                            </span>
                        ) : (
                            "Change Password"
                        )}
                    </Button>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-500 text-center mt-6">
                    Make sure your password is strong & secure
                </p>
            </div>
        </div>
    )
}

export default ChangePassword