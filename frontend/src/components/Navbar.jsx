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

const Navbar = () => {

    const user = true

    return (
        <nav className='p-2 border-b border-gray-200 bg-transparent'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {/* logo section */}
                <div className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-green-900' />
                    <h1 className='font-bold text-xl'><span className='text-green-700'>Notes</span> App</h1>
                </div>
                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-7 items-center text-lg font-semibold'>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>About</li>
                        {
                            user ? <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" className="cursor-pointer" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button></DropdownMenuTrigger>
                                <DropdownMenuContent className="cursor-pointer">
                                    <DropdownMenuGroup className="cursor-pointer">
                                        <DropdownMenuLabel className="cursor-pointer">My Account</DropdownMenuLabel>
                                        <DropdownMenuItem className="cursor-pointer"><User />Profile</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer"><BookA />Notes</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuGroup className="cursor-pointer">
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer"><LogOut />Logout</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu> : <Link to={'/login'}><li>Login</li></Link>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar