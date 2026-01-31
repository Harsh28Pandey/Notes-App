import React from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate()

    return (
        <div className='relative w-full md:h-175 h-screen bg-green-100 overflow-hidden'>
            <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
                <div className='max-w-7xl mx-auto px-4 md:px-6'>
                    <div className='flex flex-col items-center space-y-4 text-center'>
                        <div className='space-y-2'>
                            <Badge varient="secondary" className='mb-4 text-green-900 border border-green-300 bg-green-300'>
                                <Zap className='w-4 h-4 mr-1' />
                                New: AI-Powered note organization
                            </Badge>
                            <h1 className='text-green-700 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Your thoughts, organized and accessible
                                <span className='text-gray-900'> everywhere</span>
                            </h1>
                            <p className='mx-auto max-w-175 text-muted-foreground md:text-xl'>
                                Capture ideas, organize thoughts, and collaborate seamlessly. The modern note-taking app that grows with you and keeps your ideas secure in the cloud.
                            </p>
                        </div>
                        <div className='space-x-4'>
                            <Button onClick={() => navigate('/create-todo')} size='lg' className="h-12 px-8 relative bg-green-700 hover:bg-green-900 cursor-pointer">
                                Start Taking Notes
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                            <Button varient="outline" size='lg' className="h-12 px-8 bg-white text-green-900 hover:bg-green-300 cursor-pointer">
                                Watch Demo
                            </Button>
                        </div>
                        <p className='text-sm text-green-900'>
                            Free Forever • No credit card required • 2 minutes setup
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero