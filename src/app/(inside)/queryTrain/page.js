'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { PiSeatFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator"
import axios from "axios"

// trainId: train.id,
// trainName: train.name,
// seats: seats,

//seatId: seat.id,
//class: seat.class,
//fare: seat.fare,
//status: booking ? booking.status : 'Free', // Default status is Free

export default function Page() {
    const [query, setQuery] = useState({
        source: "",
        destination: "",
        date: "",
    })
    const [queryClean, setQueryClean] = useState(false)
    const [laoding, setLoading] = useState(false)
    const [results, setResults] = useState([{
        trainId: 1,
        trainName: "Train 1",
        seats: [
            {
                seatId: 1,
                class: "First Class",
                fare: 100,
                status: "Free",
            },
            {
                seatId: 2,
                class: "First Class",
                fare: 50,
                status: "Free",
            },
            {
                seatId: 3,
                class: "Second Class",
                fare: 25,
                status: "Free",
            },
            {
                seatId: 4,
                class: "Second Class",
                fare: 10,
                status: "Free",
            },
            {
                seatId: 5,
                class: "Third Class",
                fare: 5,
                status: "Free",
            }
        ],
    },
    {
        trainId: 2,
        trainName: "Train 2",
        seats: [
            {
                seatId: 1,
                class: "First Class",
                fare: 100,
                status: "Free",
            },
            {
                seatId: 2,
                class: "Second Class",
                fare: 50,
                status: "Free",
            },
            {
                seatId: 3,
                class: "Second Class",
                fare: 25,
                status: "Free",
            },
            {
                seatId: 4,
                class: "Second Class",
                fare: 10,
                status: "Free",
            },
            {
                seatId: 5,
                class: "Second Class",
                fare: 5,
                status: "Free",
            }
        ],
    },
    {
        trainId: 3,
        trainName: "Train 3",
        seats: [
            {
                seatId: 1,
                class: "Second Class",
                fare: 100,
                status: "Free",
            },
            {
                seatId: 2,
                class: "Second Class",
                fare: 50,
                status: "Free",
            },
            {
                seatId: 3,
                class: "Third Class",
                fare: 25,
                status: "Free",
            },
            {
                seatId: 4,
                class: "Third Class",
                fare: 10,
                status: "Free",
            },
            {
                seatId: 5,
                class: "Third Class",
                fare: 5,
                status: "Free",
            }
        ],
    },
    {
        trainId: 4,
        trainName: "Train 4",
        seats: [
            {
                seatId: 1,
                class: "First Class",
                fare: 100,
                status: "Free",
            },
            {
                seatId: 2,
                class: "Second Class",
                fare: 50,
                status: "Free",
            },
            {
                seatId: 3,
                class: "Third Class",
                fare: 25,
                status: "Free",
            },
            {
                seatId: 4,
                class: "Third Class",
                fare: 10,
                status: "Free",
            },
            {
                seatId: 5,
                class: "Third Class",
                fare: 5,
                status: "Free",
            }
        ],
    }])

    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <div className="flex flex-col w-full flex-1 gap-4 bg-slate-100 p-5">
            <h1 className="text-3xl font-bold ">Query Train</h1>
            <div className="flex flex-row w-full gap-4">
                <input type="text" placeholder="From" id="source-input" className="w-64 rounded-xl px-3 py-1 text-base shadow-inner border border-gray-400 focus:outline-white" />
                <input type="text" placeholder="To" id="destination-input" className="w-64 rounded-xl px-3 py-1 text-base shadow-inner border border-gray-400 focus:outline-white" />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[340px] pl-3 text-left font-normal rounded-xl",
                                !selectedDate && "text-muted-foreground"
                            )}>
                            {selectedDate ? (
                                format(selectedDate, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                setSelectedDate(date)
                            }}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                        />
                    </PopoverContent>
                </Popover>
                <Button className="ml-3 rounded-2xl text-lg" onClick={() => {
                    const source = document.getElementById("source-input")?.value
                    const destination = document.getElementById("destination-input")?.value
                    const date = selectedDate
                    if (!source || !destination || !date) return toast.error("Please fill all the fields")
                    setQuery({
                        source: source,
                        destination: destination,
                        date: selectedDate.toISOString().split('T')[0]
                    })
                    setQueryClean(false)
                }} >
                    Query
                </Button>
                <Button variant="outlined" className="rounded-2xl text-lg border-2 border-gray-400" onClick={() => {
                    if(document.getElementById("source-input")) document.getElementById("source-input").value = ""  
                    if(document.getElementById("destination-input")) document.getElementById("destination-input").value = ""
                    setSelectedDate(null)
                    setQueryClean(true)
                }} >
                    Clear
                </Button>
            </div>
            <Separator className="h-[2px] mb-3 bg-gray-700" />
            {queryClean ?
                <div className="text-3xl font-bold text-gray-800">
                </div>
                :
                <div className="flex flex-row flex-wrap overflow-hidden w-full gap-4">
                    {results.map((trains, index) => (
                        <TrainCard key={index} trains={trains} />
                    ))}
                </div>
            }
        </div>
    )
}

function TrainCard({ trains }) {
    const firstClass = trains?.seats.filter(seat => seat.class === "First Class")
    const secondClass = trains?.seats.filter(seat => seat.class === "Second Class")
    const thirdClass = trains?.seats.filter(seat => seat.class === "Third Class")

    const requestOtp = async () => {
        if(!localStorage.getItem("userId")) return toast.error("Please login first")
        // axios.post("https://api.prod.pinklifeline.xyz/authentication/main/v1/otp/sent", {
        //     id :
        // })
    }

    if (trains.seats.length === 0) return <div className="w-full h-32 bg-white rounded-2xl shadow-lg p-5">No trains available</div>
    return (
        <div className="w-72 p-5 pb-8 bg-white rounded-lg shadow-lg gap-5 flex flex-col drop-shadow-xl">
            <span className="text-2xl  font-bold text-gray-800 w-full text-center">{trains.trainName}</span>
            <div className="flex flex-col relative gap-1 border-2 p-3 rounded-xl flex-1 shadow-lg">
                <div className={cn("flex flex-col w-full ", firstClass.length === 0 ? 'justify-center items-center' : "")}>
                    <span className="text-base text-gray-700 w-full text-center">
                        First Class: {firstClass.length} seats
                    </span>
                    {firstClass.length === 0 ? <span className="text-base text-gray-700 w-full text-center">No seats found</span> : <></>}
                    <div className="w-full flex flex-row items-center flex-wrap gap-3">
                        {firstClass.map((seat, index) =>
                            <Popover key={index}>
                                <PopoverTrigger asChild disabled={seat.status === "Booked" || seat.status === "Purchased"}>
                                    <button className="w-fit h-fit p-2 ">
                                        <PiSeatFill size={54} color={seat.status === "Purchased" ? "red" : seat.status === "Booked"? "yellow":""} className={cn(seat.status === "Purchased" ? "" :""," text-gray-800")} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <div className="w-full bg-white rounded-2xl shadow-lg p-5">
                                        <div className="text-2xl font-bold text-gray-800">{trains.trainName}</div>
                                        <div className="text-lg font-semibold text-gray-800">{seat.class}</div>
                                        <div className="text-xl font-semibold text-gray-800">{seat.fare}</div>
                                        <Button className="rounded-2xl text-lg" >
                                            Book
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <Separator className="h-[1.5px]" />
                <div className={cn("flex flex-col w-full ", secondClass.length === 0 ? 'justify-center items-center' : "")}>
                    <span className="text-base text-gray-700 w-full text-center">
                        Second Class: {secondClass.length} seats
                    </span>
                    {secondClass.length === 0 ? <span className="text-base text-gray-700 w-full text-center">No seats found</span> : <></>}
                    <div className="w-full flex flex-row items-center flex-wrap gap-3">
                        {secondClass.map((seat, index) =>
                            <Popover key={index}>
                                <PopoverTrigger asChild disabled={seat.status === "Booked" || seat.status === "Purchased"}>
                                    <button className="w-fit h-fit p-2 ">
                                        <PiSeatFill size={54} className=" text-gray-800" color={seat.status === "Purchased" ? "red" : seat.status === "Booked"? "yellow":""}/>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <div className="w-full bg-white rounded-2xl shadow-lg p-5">
                                        <div className="text-2xl font-bold text-gray-800">{trains.trainName}</div>
                                        <div className="text-lg font-semibold text-gray-800">{seat.class}</div>
                                        <div className="text-xl font-semibold text-gray-800">{seat.fare}</div>
                                        <Button className="rounded-2xl text-lg" >
                                            Book
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <Separator className="h-[1.5px]" />
                <div className={cn("flex flex-col w-full ", thirdClass.length === 0 ? 'justify-center items-center' : "")}>
                    <span className="text-base text-gray-700 w-full text-center">
                        Third Class: {thirdClass.length} seats
                    </span>
                    {thirdClass.length === 0 ? <span className="text-base text-gray-700 w-full text-center">No seats found</span> : <></>}
                    <div className="w-full flex flex-row items-center flex-wrap gap-3">
                        {thirdClass.map((seat, index) =>
                            <Popover key={index}>
                                <PopoverTrigger asChild disabled={seat.status === "Booked" || seat.status === "Purchased"}>
                                    <button className="w-fit h-fit p-2 ">
                                        <PiSeatFill size={54} className=" text-gray-800" color={seat.status === "Purchased" ? "red" : seat.status === "Booked"? "yellow":""} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <div className="w-full bg-white rounded-2xl shadow-lg p-5">
                                        <div className="text-2xl font-bold text-gray-800">{trains.trainName}</div>
                                        <div className="text-lg font-semibold text-gray-800">{seat.class}</div>
                                        <div className="text-xl font-semibold text-gray-800">{seat.fare}</div>
                                        <Button className="rounded-2xl text-lg" >
                                            Book
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
                <div className=" absolute -bottom-4 left-4 right-4 h-4  border-[3px] border-t-0 border-gray-800 rounded-b-2xl">

                </div>
            </div>
        </div>
    )
}
