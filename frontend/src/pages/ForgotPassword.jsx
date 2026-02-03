import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getData } from '@/context/userContext'
import { Label } from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ForgotPassword = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, { email })

            if (res.data.success) {
                // setUser(res.data.user)
                navigate(`/verify-otp/${email}`)
                toast.success(res.data.message)
                setEmail("")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full min-h-screen bg-linear-to-br from-green-100 via-green-200 to-green-300 overflow-hidden">

            {/* subtle background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">

                        {/* Page header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-green-800">
                                Reset your password
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Enter your email address and we’ll send you instructions
                                to reset your password.
                            </p>
                        </div>

                        {/* Card */}
                        <Card className="bg-white rounded-2xl shadow-xl border-0">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-center text-green-700">
                                    Forgot password
                                </CardTitle>
                                <CardDescription className="text-center text-gray-600">
                                    {isSubmitted
                                        ? "Check your email for password reset instructions."
                                        : "Enter your email address to receive a reset link."}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-5">

                                {/* Error */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Success state */}
                                {isSubmitted ? (
                                    <div className="py-6 flex flex-col items-center text-center space-y-4">
                                        <div className="bg-green-100 rounded-full p-4">
                                            <CheckCircle className="w-7 h-7 text-green-700" />
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">
                                                Check your inbox 📬
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                We’ve sent a password reset link to{" "}
                                                <span className="font-medium text-gray-900">{email}</span>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Didn’t get it? Check spam or{" "}
                                                <button
                                                    onClick={() => setIsSubmitted(false)}
                                                    className="text-green-700 font-medium hover:underline"
                                                >
                                                    try again
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">

                                        <div className="space-y-2">
                                            <Label>Email address</Label>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={isLoading}
                                                className="h-11 rounded-lg"
                                            />
                                        </div>

                                        <Button
                                            className="w-full h-11 bg-green-700 hover:bg-green-600 rounded-xl font-semibold"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Sending reset link...
                                                </span>
                                            ) : (
                                                "Send reset link"
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>

                            {/* Footer */}
                            <CardFooter className="flex justify-center">
                                <p className="text-sm text-gray-600">
                                    Remember your password?{" "}
                                    <Link
                                        to="/login"
                                        className="text-green-700 hover:underline font-medium"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword