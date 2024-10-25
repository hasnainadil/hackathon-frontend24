'use client'
import { set, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import axiosInstance from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import pagePaths from "@/utils/pagePaths"


export default function OTPVerify() {
    const { register, handleSubmit, setValue, formState: { errors }, trigger } = useForm()
    const params = useSearchParams()
    const router = useRouter()

    const handleOtpChange = (opt) => {
        setValue("otp", opt)
        return
    }

    const submitForm = async (data) => {
        if (!(await trigger())) return
        const sentData = { username: data.email, otp: data.otp }
        console.log("Sent data")
        console.log(sentData)
        axiosInstance.post("https://api.prod.pinklifeline.xyz/authentication/v1/auth/verify", sentData).then((res) => {
            toast.success("OTP verified", {
                description: "You can now login"
            })
            console.log(res.data)
            router.push(pagePaths.login)
        }).catch((err) => {
            console.log(err)
            toast.error("An error occured", {
                description: err.response.data?.message
            })
        })
    }

    useEffect(() => {
        register("otp", {
            required: "OTP field is required",
            validate: (value) => {
                return value.length === 6 || "OTP must be 6 characters"
            }
        })
    }, [register])


    return (
        <div className="flex w-screen flex-col h-screen items-center justify-center flex-wrap flex-shrink">
            <div className="flex w-full flex-col  p-10 items-center justify-center flex-wrap flex-shrink ">
                <div className="flex flex-row justify-center items-center">
                    <button id="loginsection" className="text-2xl font-bold text-center m-2 text-gray-700">Verify OTP</button>
                </div>
                <Separator className="bg-green-400 m-2 w-80" />
                <form className="flex w-96 p-10 rounded-2xl flex-col items-center justify-between flex-wrap flex-shrink bg-purple-100 m-5" onSubmit={handleSubmit(submitForm)}>
                    <input type="email" placeholder="Email" className="border-2 border-black rounded-xl p-3 w-full" defaultValue={params.get('email')} {...register("email", { required: true, maxLength: 64 })} />
                    {errors.email?.type === "required" && <span className="text-red-500">This field is required</span>}
                    {errors.email?.type === "maxLength" && <span className="text-red-500">Max length is 64</span>}
                    <label className="text-xl font-bold mt-5">OTP</label>

                    <InputOTP maxLength={6} onChange={handleOtpChange} >
                        <InputOTPGroup >
                            <InputOTPSlot index={0} className="bg-white" />
                            <InputOTPSlot index={1} className="bg-white" />
                            <InputOTPSlot index={2} className="bg-white" />
                            <InputOTPSlot index={3} className="bg-white" />
                            <InputOTPSlot index={4} className="bg-white" />
                            <InputOTPSlot index={5} className="bg-white" />
                        </InputOTPGroup>
                    </InputOTP>
                    {errors.otp && <span className="text-red-500">{errors.otp?.message}</span>}
                    <button type="submit" className="bg-pink-500 text-white p-2 m-4 w-1/2 rounded-md hover:scale-105 hover:bg-pink-100 hover:text-pink-950 hover:border-double hover:border-pink-900 hover:border-2 transition ease-out duration-300">Verify</button>
                </form>
            </div>
        </div>
    )
}