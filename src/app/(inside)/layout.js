'use client'

import { cn } from "@/lib/utils"
import pagePaths from "@/utils/pagePaths"
import axios from "axios"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export default function Layout({ children }) {
    return (
        <div className="flex flex-col w-screen h-screen bg-slate-100 overflow-y-auto overflow-x-hidden">
            <NavBar />
            <div className="flex flex-col flex-1 w-full">
                {children}
            </div>
        </div>
    )
}

function NavBar() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className="flex flex-row w-full h-[70px] bg-slate-100 items-center justify-between p-3 relative ">
            <div className=" bg-white size-10">

            </div>
            <div className="flex flex-row gap-5 h-fit">
                <Link href={pagePaths.queryTrain} className={cn(' text-white font-semibold text-lg w-fit h-fit px-3 py-1 shadow-lg rounded-2xl transition-all duration-300 ease-in-out', pathname.includes('queryTrain') ? 'bg-red-500 ' : 'hover:translate-y-2  text-gray-800 bg-white')}>
                    Query Train
                </Link>
                <Link href={pagePaths.purchased} className={cn(' text-white font-semibold text-lg w-fit h-fit px-3 py-1 shadow-lg rounded-2xl transition-all duration-300 ease-in-out', pathname.includes('purchased') ? 'bg-red-500 ' : 'hover:translate-y-2  text-gray-800 bg-white')}>
                    Purchased Tickets
                </Link>
                <button className="bg-gray-600 text-lg py-1 px-3 text-gray-100 hover:scale-95 active:scale-75 transition-all ease-in-out duration-300 rounded-2xl shadow-lg w-24 h-full" onClick={()=>{
                    axios.get("https://api.prod.pinklifeline.xyz/authentication/v1/auth/logout").then((res)=>{
                        localStorage.removeItem("userId")
                        router.push(pagePaths.login)
                    }).catch((err)=>{
                        toast.error("Failed to log out")
                    })
                }}>
                    Log Out
                </button>

            </div>
            {/* <div className="absolute -bottom-0 h-6 w-full left-0 z-50 bg-gradient-to-b from-transparent to-white"></div> */}
        </div>
    )
}