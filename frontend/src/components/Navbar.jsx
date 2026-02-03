import { BookA, BookOpen, User, LogOut } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {

    const { user, setUser } = getData()
    const accessToken = localStorage.getItem("accessToken")

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if (res.data.success) {
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="sticky top-0 z-20 w-full border-b border-green-200/60 bg-green-200 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <BookOpen className="h-6 w-6 text-green-700" />
                        <h1 className="text-xl font-extrabold tracking-tight">
                            <span className="text-green-700">Notes</span>
                            <span className="text-gray-900">App</span>
                        </h1>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-8">

                        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                            {["Features", "Pricing", "About"].map((item) => (
                                <li
                                    key={item}
                                    className="relative cursor-pointer transition-colors hover:text-green-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-green-700 after:transition-all hover:after:w-full"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Auth Section */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="rounded-full p-0 hover:bg-transparent"
                                    >
                                        <Avatar className="h-9 w-9 border border-green-300">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="profile"
                                            />
                                            <AvatarFallback className="bg-green-200 text-green-900">
                                                {user.username?.[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-44 rounded-xl">
                                    <DropdownMenuLabel className="text-sm">
                                        My Account
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                        <BookA className="h-4 w-4" />
                                        Notes
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={logoutHandler}
                                        className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link to="/login">
                                <Button
                                    size="sm"
                                    className="bg-green-700 hover:bg-green-800 rounded-lg px-5"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar