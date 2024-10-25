'use client'
import { Suspense } from "react"
import OTPVerify from "./otp"

export default function VerifyOTP() {
    return (
        <Suspense fallback={<div >Loading...</div>}>
            <OTPVerify />
        </Suspense>
    )
}