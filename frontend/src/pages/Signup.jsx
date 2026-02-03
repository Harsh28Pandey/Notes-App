import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData)

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/register`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.data.success) {
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full min-h-screen bg-linear-to-br from-green-100 via-green-200 to-green-300 overflow-hidden">

            {/* background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">

                        {/* Page header */}
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-green-800">
                                Create your account
                            </h1>
                            <p className="text-gray-700 text-sm">
                                Start organizing your thoughts and ideas today
                            </p>
                        </div>

                        {/* Card */}
                        <Card className="w-full rounded-2xl shadow-xl border-0 bg-white">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-center text-green-700 font-bold">
                                    Sign up
                                </CardTitle>
                                <CardDescription className="text-center text-gray-600">
                                    Create your account to get started with Notes App
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="flex flex-col gap-5">

                                    <div className="grid gap-2">
                                        <Label>Full name</Label>
                                        <Input
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="h-11 rounded-lg"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Email address</Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            required
                                            className="h-11 rounded-lg"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Password</Label>
                                        <div className="relative">
                                            <Input
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Create a strong password"
                                                required
                                                className="h-11 rounded-lg pr-10"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isLoading}
                                                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-4 h-4 text-gray-600" />
                                                ) : (
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col gap-3">
                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 bg-green-700 hover:bg-green-600 rounded-xl font-semibold"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating account...
                                        </span>
                                    ) : (
                                        "Sign up"
                                    )}
                                </Button>

                                <p className="text-sm text-gray-600 text-center">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-green-700 font-medium hover:underline"
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

export default Signup