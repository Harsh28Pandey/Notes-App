import { MailCheck } from 'lucide-react'
import React from 'react'

const VerifyEmail = () => {
    return (
        <div className="relative w-full min-h-screen bg-linear-to-br from-green-100 via-green-200 to-green-300 overflow-hidden">

            {/* background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-4">

                    {/* icon */}
                    <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
                        <MailCheck className="w-7 h-7 text-green-700" />
                    </div>

                    {/* title */}
                    <h2 className="text-2xl font-bold text-green-800">
                        Check your email
                    </h2>

                    {/* description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We’ve sent you a verification email. Please check your inbox and
                        click the verification link to activate your account.
                    </p>

                    {/* helper text */}
                    <p className="text-xs text-gray-500 pt-2">
                        Didn’t receive the email? Check your spam folder or wait a few minutes.
                    </p>

                </div>
            </div>
        </div>

    )
}

export default VerifyEmail