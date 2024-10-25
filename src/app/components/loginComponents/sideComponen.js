'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { ActivityIcon, BotIcon, LucideMessageCircleQuestion, Plus } from "lucide-react"
import { random } from "lodash";


export default function SideComponent() {
    const cards_one = Array(2).fill(0);
    const [duration, setDuration] = useState(1);

    const card_width = 304
    const card_height = 188;
    const left_offset = 128;
    const upper_offset = 68;
    const card_positions = [
        { x: left_offset, y: upper_offset },
        { x: left_offset, y: upper_offset + card_height },
        { x: left_offset, y: upper_offset + 2 * card_height },
        { x: left_offset + card_width, y: upper_offset + 2 * card_height },
        { x: left_offset + card_width, y: upper_offset + card_height },
        { x: left_offset + card_width, y: upper_offset },
    ]

    // Define the positions for the animation in a clockwise manner
    const positions = [
        { x: -250, y: 0 },   // Move left
        { x: 0, y: -150 },   // Move up
        { x: 250, y: 0 },    // Move right
        { x: 0, y: 150 }     // Move down
    ];
    const cards_one_positions = [
        card_positions[0],
        card_positions[1],
        card_positions[2],
        card_positions[3],
        card_positions[4],
        card_positions[5],
        card_positions[0],
    ];
    const cards_two_positions = [
        card_positions[1],
        card_positions[2],
        card_positions[3],
        card_positions[4],
        card_positions[5],
        card_positions[0],
        card_positions[1],
    ]
    const card_three_positions = [
        card_positions[3],
        card_positions[4],
        card_positions[5],
        card_positions[0],
        card_positions[1],
        card_positions[2],
        card_positions[3],
    ]
    const card_four_positions = [
        card_positions[4],
        card_positions[5],
        card_positions[0],
        card_positions[1],
        card_positions[2],
        card_positions[3],
        card_positions[4],
    ]

    // Manage the current position index
    const [positionIndex, setPositionIndex] = useState(0);

    useEffect(() => {
        // Update positionIndex every 2 seconds to animate the cards
        const interval = setInterval(() => {
            setPositionIndex((prevIndex) => (prevIndex + 1) % cards_one_positions.length);
            if (random(0, 1) === 1) {
                setDuration(1.5)
            }
            else {
                setDuration(1)
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="relative flex flex-col w-full h-full gap-y-3 overflow-hidden">
            <div className="flex flex-row items-center w-full h-fit gap-x-4 overflow-hidden ">
                <div className="w-28 rounded-r-xl h-14 bg-opacity-40 flex items-center justify-center rounded-t-none"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/1.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                {cards_one.map((_, index) => (
                    <div key={index} className="w-72 rounded-xl h-14 bg-opacity-40 flex items-center justify-center rounded-t-none"
                        style={{
                            // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                            backgroundImage: `url(loginbg/2.jpg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                ))}
                <div className="w-48 rounded-l-xl h-14 bg-opacity-40 flex items-center justify-center rounded-t-none relative"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/3.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-25% to-white"></div>
                </div>
            </div>

            {/* Adding the rotating cards */}
            <motion.div
                className="absolute w-72 h-44 bg-white-400 rounded-xl z-30 shadow-md bg-white"
                initial={{ x: cards_one_positions[positionIndex].x, y: cards_one_positions[positionIndex].y }}
                animate={{ x: cards_one_positions[positionIndex].x, y: cards_one_positions[positionIndex].y }}
                transition={{ duration: duration, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-start justify-between w-full h-full gap-4 p-5 py-8">
                    <div className="flex flex-row items-center gap-2 flex-wrap w-full">
                        {Array(36).fill(0).map((_, index) => (
                            <ActivityIcon key={index} size={12} strokeWidth={1.5} className="text-gray-700" />
                        ))}
                    </div>
                    <span className="text-lg font-semibold">
                        Routine Self-Test
                    </span>
                </div>
            </motion.div>
            <motion.div
                className="absolute w-72 h-44 bg-purple-400 rounded-xl z-30"
                initial={{ x: cards_two_positions[positionIndex].x, y: cards_two_positions[positionIndex].y }}
                animate={{ x: cards_two_positions[positionIndex].x, y: cards_two_positions[positionIndex].y }}
                transition={{ duration: duration, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-start justify-between w-full h-full gap-1 p-5 py-8">
                    <div className="flex flex-row items-center gap-2 flex-wrap w-full">
                        {Array(11).fill(0).map((_, index) => (
                            <LucideMessageCircleQuestion key={index} size={12} strokeWidth={1.5} className="text-gray-700" />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-extrabold break-normal text-wrap">
                            Support, moderation,
                        </span>
                        <span className="text-lg font-extrabold break-normal text-wrap">
                            and diagnostic assistance.
                        </span>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="absolute w-72 h-44 bg-orange-400 rounded-xl z-30"
                initial={{ x: card_three_positions[positionIndex].x, y: card_three_positions[positionIndex].y }}
                animate={{ x: card_three_positions[positionIndex].x, y: card_three_positions[positionIndex].y }}
                transition={{ duration: duration, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-start justify-between w-full h-full gap-4 p-6">
                    <div className="flex flex-row items-center justify-between gap-2 flex-wrap w-full">
                        {Array(11).fill(0).map((_, index) => (
                            <Plus key={index} size={12} strokeWidth={1.5} className="text-gray-700" />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xl font-extrabold text-gray-900">
                            Hospital reviews
                        </span>
                        <span className="text-xl font-extrabold text-gray-900">
                            and cost comparison.
                        </span>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="absolute w-72 h-44 bg-amber-400 rounded-xl z-30 shadow-md"
                initial={{ x: card_four_positions[positionIndex].x, y: card_four_positions[positionIndex].y }}
                animate={{ x: card_four_positions[positionIndex].x, y: card_four_positions[positionIndex].y }}
                transition={{ duration: duration, ease: "easeInOut" }}
            >
                <div className="flex flex-col items-start justify-between w-full h-full gap-4 p-5">
                    <div className="flex flex-row items-center gap-2 flex-wrap w-full">
                        {Array(11).fill(0).map((_, index) => (
                            <BotIcon key={index} size={14} strokeWidth={1} className="text-gray-700" />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-extrabold text-gray-900">
                            Smart report
                        </span>
                        <span className="text-lg font-extrabold text-gray-900">
                            handling
                        </span>
                        <span className="text-xl font-extrabold text-gray-900">
                            with AI.
                        </span>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-row items-center w-full h-fit gap-4 overflow-hidden">
                <div className="w-28 rounded-r-xl h-44 bg-opacity-40 flex items-center justify-center"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/4.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                {cards_one.map((_, index) => (
                    <div key={index} className="w-72 rounded-xl h-44 bg-opacity-40 flex items-center justify-center"
                        style={{
                            // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                            backgroundImage: `url(loginbg/5.jpg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                ))}
                <div className="w-48 rounded-l-xl h-44 bg-opacity-40 flex items-center justify-center relative"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/6.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-25% to-white"></div>
                </div>
            </div>
            <div className="flex flex-row items-center w-full h-fit gap-4 overflow-hidden">
                <div className="w-28 rounded-r-xl h-44 bg-opacity-40 flex items-center justify-center"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/7.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                {cards_one.map((_, index) => (
                    <div key={index} className="w-72 rounded-xl h-44 bg-opacity-40 flex items-center justify-center"
                        style={{
                            // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                            backgroundImage: `url(loginbg/8.jpg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                ))}
                <div className="w-48 rounded-l-xl h-44 bg-opacity-40 flex items-center justify-center relative"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/9.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-25% to-white"></div>
                </div>
            </div>
            <div className="flex flex-row items-center w-full h-fit gap-4 overflow-hidden">
                <div className="w-28 rounded-r-xl h-44 bg-opacity-40 flex items-center justify-center"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/10.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}></div>
                {cards_one.map((_, index) => (
                    <div key={index} className="w-72 rounded-xl h-44 bg-opacity-40 flex items-center justify-center"
                        style={{
                            // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                            backgroundImage: `url(loginbg/11.jpg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                ))}
                <div className="w-48 rounded-l-xl h-44 bg-opacity-40 flex items-center justify-center relative"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/12.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-25% to-white"></div>
                </div>
            </div>
            <div className="flex flex-row items-center w-full h-fit gap-4 overflow-hidden">
                <div className="w-28 rounded-r-xl h-20 bg-opacity-40 flex items-center justify-center rounded-b-none"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/1.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                </div>
                {cards_one.map((_, index) => (
                    <div key={index} className="w-72 rounded-xl h-20 bg-opacity-40 flex items-center justify-center rounded-b-none"
                        style={{
                            // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                            backgroundImage: `url(loginbg/2.jpg)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>
                    </div>
                ))}
                <div className="w-48 rounded-l-xl h-20 bg-opacity-40 flex items-center justify-center rounded-b-none relative"
                    style={{
                        // backdropFilter: "blur(3px)", // Creates blur on the background where cards pass
                        backgroundImage: `url(loginbg/3.jpg)`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="absolute w-full h-full bg-gradient-to-r from-transparent from-25% to-white"></div>
                </div>
            </div>
        </div>
    )
}