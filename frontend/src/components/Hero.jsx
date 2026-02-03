import React from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'

const Hero = () => {

    const navigate = useNavigate()
    const { user } = getData()

    return (
        <div className="relative w-full min-h-screen bg-linear-to-br from-green-100 via-green-200 to-green-300 overflow-hidden -mt-28">

            {/* subtle background decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

            <section className="relative w-full py-16 md:py-28 lg:py-36">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-6">

                        {/* Welcome */}
                        <p className="text-sm md:text-base text-green-900">
                            Welcome back, <span className="font-semibold">{user.username}</span> 👋
                        </p>

                        {/* Badge */}
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-300/70 text-green-900 border border-green-400 shadow-sm"
                        >
                            <Zap className="w-4 h-4" />
                            New: AI-Powered Note Organization
                        </Badge>

                        {/* Heading */}
                        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-green-800">
                            Your thoughts,
                            <span className="block text-gray-900">
                                organized & accessible everywhere
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl text-gray-700 md:text-xl leading-relaxed">
                            Capture ideas, organize thoughts, and collaborate seamlessly.
                            A modern note-taking app that grows with you and keeps your ideas
                            secure in the cloud.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                onClick={() => navigate("/create-todo")}
                                size="lg"
                                className="h-12 px-8 bg-green-700 hover:bg-green-800 rounded-xl font-semibold shadow-lg"
                            >
                                Start Taking Notes
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 rounded-xl bg-white/80 backdrop-blur border-green-300 text-green-900 hover:bg-green-200"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Trust line */}
                        <p className="text-sm text-green-900 pt-2">
                            Free forever • No credit card required • Setup in 2 minutes
                        </p>

                    </div>
                </div>
            </section>
        </div>

    )
}

export default Hero