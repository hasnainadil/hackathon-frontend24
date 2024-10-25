'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"

// bookingId: booking.id,
// seatId: seat.id,
// class: seat.class,
// fare: seat.fare,
// status: booking.status,
// trainId: train.id,
// trainName: train.name,
// journeyDate: booking.journeyDate


export default function Page() {
    const [purchased, setPurchased] = useState([{
        bookingId: 1,
        seatId: 1,
        class: "First",
        fare: 1000,
        status: "purchased",
        trainId: 1,
        trainName: "Rajdhani",
        journeyDate: "2022-12-12"
    },
    {
        bookingId: 2,
        seatId: 2,
        class: "Business",
        fare: 500,
        status: "purchased",
        trainId: 2,
        trainName: "Shatabdi",
        journeyDate: "2022-12-12"
    },
    {
        bookingId: 3,
        seatId: 3,
        class: "First",
        fare: 1000,
        status: "purchased",
        trainId: 3,
        trainName: "Duronto",
        journeyDate: "2022-12-12"
    },
    {
        bookingId: 4,
        seatId: 4,
        class: "Economy",
        fare: 500,
        status: "purchased",
        trainId: 4,
        trainName: "Garib Rath",
        journeyDate: "2022-12-12"
    }])
    return (
        <div className="flex flex-col w-full h-full justify-center p-7 gap-8">
            <h1 className="text-3xl font-bold text-gray-800">Purchased Tickets</h1>
            <div className="flex flex-row w-full h-full flex-wrap gap-6">
                {purchased.map((ticket, index) => (
                    <div key={index} className={cn("p-3 flex flex-col gap-3 rounded-3xl bg-opacity-70 shadow-lg w-56 h-fit items-center", ticket.class === "First" ? "bg-green-500" : ticket.class === "Business" ? "bg-blue-500" : ticket.class === "Economy" ? "bg-yellow-500" : "bg-red-500")}>
                        <span className=" text-2xl font-semibold">
                            {ticket.trainName}
                        </span>
                        <span className=" text-lg">
                            {ticket.class}
                        </span>
                        <span className=" text-lg">
                            {ticket.journeyDate}
                        </span>
                        <span className=" text-xl font-bold">
                            {ticket.fare}
                        </span>
                        <button className="bg-red-700 bg-opacity-80 hover:scale-95 active:scale-75 transition-all duration-500 ease-linear text-white rounded-xl px-3 py-1" onClick={() => {}}>
                            Cancel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}