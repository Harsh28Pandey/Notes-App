import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const VerifyOTP = () => {

    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [isLoading, setIsLoading] = useState(false)
    const inputRefs = useRef([])
    const { email } = useParams()
    const navigate = useNavigate()

    const handleChange = (index, value) => {
        if (value.length > 1) return
        const updatedOtp = [...otp]
        updatedOtp[index] = value
        setOtp(updatedOtp)
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleVerify = async () => {
        const finalOtp = otp.join("")
        if (finalOtp.length !== 6) {
            setError("Please enter a valid 6-digit OTP")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/verify-otp/${email}`, { otp: finalOtp })
            setSuccessMessage(res.data.message)
            setTimeout(() => {
                navigate(`/change-password/${email}`)
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const clearOtp = () => {
        setOtp(["", "", "", "", "", ""])
        setError("")
        inputRefs.current[0]?.focus()
    }

    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-green-100 via-green-200 to-green-300">
            {/* main content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-green-800">
                            Verify your email
                        </h1>
                        <p className="text-gray-600 text-sm">
                            We've sent a 6-digit verification code to <br />
                            <span className="font-semibold text-gray-800">your email</span>
                        </p>
                    </div>

                    {/* Card */}
                    <Card className="shadow-xl rounded-2xl border-0">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-2xl text-center text-green-700">
                                Enter verification code
                            </CardTitle>
                            <CardDescription className="text-center text-gray-600">
                                {isVerified
                                    ? "Code verified successfully! Redirecting..."
                                    : "Enter the 6-digit code we sent to your email to verify your account."}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Alerts */}
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {successMessage && (
                                <div className="bg-green-100 text-green-700 text-sm text-center p-3 rounded-lg">
                                    {successMessage}
                                </div>
                            )}

                            {/* Verified State */}
                            {isVerified ? (
                                <div className="py-8 flex flex-col items-center text-center space-y-4">
                                    <div className="bg-green-100 rounded-full p-4">
                                        <CheckCircle className="h-8 w-8 text-green-700" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-lg">
                                            Verification successful 🎉
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Your email has been verified. You’ll be redirected to reset your password.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm">Redirecting...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* OTP Input */}
                                    <div className="flex justify-between gap-2">
                                        {otp.map((digit, index) => (
                                            <Input
                                                key={index}
                                                type="text"
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                maxLength={1}
                                                className="
                      w-12 h-12 text-center text-xl font-bold
                      rounded-xl border-2 border-gray-300
                      focus:border-green-600 focus:ring-2 focus:ring-green-200
                      transition-all
                    "
                                            />
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <Button
                                            onClick={handleVerify}
                                            className="bg-green-700 hover:bg-green-600 w-full h-11 rounded-xl font-semibold"
                                            disabled={isLoading || otp.some((digit) => digit === "")}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Verifying...
                                                </span>
                                            ) : (
                                                "Verify Code"
                                            )}
                                        </Button>

                                        <Button
                                            onClick={clearOtp}
                                            variant="outline"
                                            className="w-full h-11 rounded-xl"
                                            disabled={isLoading || isVerified}
                                        >
                                            <RotateCcw className="mr-2 h-4 w-4" />
                                            Clear
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-600">
                                Wrong email?{" "}
                                <Link
                                    to="/forgot-password"
                                    className="text-green-700 hover:underline font-medium"
                                >
                                    Go back
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>

                    {/* Test Hint */}
                    <div className="text-center text-xs text-gray-500">
                        For testing use code:
                        <span className="font-mono font-semibold ml-1">123456</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VerifyOTP