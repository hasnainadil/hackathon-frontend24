'use client'
import { motion } from "framer-motion";
import Lottie from "lottie-react"
import animationData from '../../../public/loginAnimations/train_animation.json'
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import pagePaths from "@/utils/pagePaths";
import { Loader } from "lucide-react";

export default function LoginRegister() {

    const text = "RAILWAY SERVICE"; // Your text
    const [currentSection, setCurrentSection] = useState("login");

    const letterAnimation = {
        hidden: { y: 0 },
        visible: (i) => ({
            y: -10, // Jump upwards
            transition: {
                delay: i * 0.2, // Staggering effect
                duration: 0.5,
                repeat: Infinity, // Infinite jump
                repeatType: "reverse", // Makes the letters go up and then come back down
                repeatDelay: 2.5, // Delay between each letter's jump
            },
        }),
    };

    const reflectionAnimation = {
        hidden: { y: 0 },
        visible: (i) => ({
            y: 10, // Reflection moves downward

            transition: {
                delay: i * 0.2, // Sync with the text above
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2.5,
            },
        }),
    };


    return (
        <div className="flex w-screen flex-col h-screen items-center flex-wrap flex-shrink px-5 bg-white">
            <div className="flex flex-row w-full h-full items-center justify-between flex-wrap flex-shrink relative">
                {/* <div className="w-20 absolute right-[36%] h-full bg-gradient-to-r from-transparent to-green-100"></div> */}
                <div className="flex flex-col justify-start items-center h-full pt-20 flex-1 gap-5">
                    <div className="flex flex-col items-center w-fit h-fit text-4xl font-extrabold relative mb-10">
                        {/* Original text */}
                        <div className="flex">
                            {text.split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={letterAnimation}
                                    className="text-green-500"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* Reflection text */}
                        <div className="flex absolute top-full -mt-2">
                            {text.split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    custom={index}
                                    initial={{ rotateX: 180 }}
                                    animate="visible"
                                    variants={reflectionAnimation}
                                    className="text-green-200 text-reflection"
                                >
                                    <span className="rotate-90">
                                        {char}
                                    </span>
                                </motion.span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-96 rounded-3xl shadow-xl bg-green-500 p-8 gap-5 transition-all duration-500 ease-linear">
                        {currentSection === "login" ? <LoginSection setCurrentSection={setCurrentSection} /> : <RegisterSection setCurrentSection={setCurrentSection} />}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center h-full py-2 rounded-l-md w-8/12 relative overflow-hidden">
                    <div className="w-56 h-full bg-gradient-to-r from-white to-transparent absolute left-0 z-50"></div>
                    <div className="w-full h-1/2 bg-white absolute left-0 top-0 z-50 bg-opacity-35 blur-sm -translate-y-2 translate-x-2"></div>
                    <div className="flex flex-col w-full h-full justify-center items-center absolute right-0 rotate-180 -scale-x-125">
                        <Lottie
                            animationData={animationData}
                            className="flex justify-center items-center w-full "
                            loop={true}
                        />
                    </div>
                    <div className="flex flex-col w-full h-full justify-center items-center absolute bottom-0 right-0 scale-x-125">
                        <Lottie
                            animationData={animationData}
                            className="flex justify-center items-center w-full "
                            loop={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function RegisterSection({ setCurrentSection }) {
    const router = useRouter();
    const [laoding, setLoading] = useState(false);

    return (
        <>
            <div className="text-4xl font-bold text-white">Register</div>
            <input id="name-input" placeholder="Name" type="text" className="w-64 rounded-xl px-3 py-1 text-lg shadow-inner border border-gray-50 focus:outline-white" />
            <input id="email-input" placeholder="Email" type="email" className="w-64 rounded-xl px-3 py-1 text-lg shadow-inner border border-gray-50 focus:outline-white" />
            <input id="password-input" placeholder="Password" type="password" className="w-64 rounded-xl px-3 py-1 text-lg shadow-inner border border-gray-50 focus:outline-white" />
            <button className="w-64 rounded-xl px-3 py-1 text-lg shadow-md shadow-gray-500 bg-red-500 text-white active:scale-75 transition-all duration-500 ease-linear" onClick={() => {
                const fullName = document.getElementById("name-input").value;
                const email = document.getElementById("email-input").value;
                const password = document.getElementById("password-input").value;
                if (fullName === "" || email === "" || password === "") {
                    toast.error("Please fill all the fields");
                    return;
                }
                setLoading(true);
                toast.loading("Registering...");
                axios.post("https://api.prod.pinklifeline.xyz/authentication/v1/auth/register", {
                    fullName: fullName,
                    username: email,
                    password: password
                }).then((response) => {
                    toast.dismiss();
                    router.push("/verifyotp?email=" + email);
                }).catch((error) => {
                    toast.dismiss();
                    toast.error("An error occurred");
                }).finally(() => {
                    setLoading(false);
                })
            }}>
                {laoding ? <Loader className="animate-spin" size={20} /> : "Register"}
            </button>
            <div className="flex flex-row gap-7 justify-center w-64">
                <div className="text-white">Already have an account?</div>
                <button className="text-white hover:underline" onClick={() => { setCurrentSection("login") }} >
                    Login
                </button>
            </div>
        </>
    )
}

function LoginSection({ setCurrentSection }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="text-4xl font-bold text-white">Login</div>
            <input id="email-input" placeholder="Email" type="email" className="w-64 rounded-xl px-3 py-1 text-lg shadow-inner border border-gray-50 focus:outline-white" />
            <input id="password-input" placeholder="Password" type="password" className="w-64 rounded-xl px-3 py-1 text-lg shadow-inner border border-gray-50 focus:outline-white" />
            <button className="w-64 rounded-xl px-3 py-1 text-lg shadow-md shadow-gray-500 bg-red-500 text-white active:scale-75 transition-all duration-500 ease-linear" onClick={() => {
                const username = document.getElementById("email-input").value;
                const password = document.getElementById("password-input").value;
                if (username === "" || password === "") {
                    toast.error("Please fill all the fields");
                    return;
                }
                setLoading(true);
                toast.loading("Logging in...");
                axios.post("https://api.prod.pinklifeline.xyz/authentication/v1/auth", {
                    username: username,
                    password: password
                }).then((response) => {
                    localStorage.setItem("userId", JSON.stringify(response.data.userId));
                    localStorage.setItem("username", JSON.stringify(response.data.username));
                    toast.dismiss();
                    router.push(pagePaths.queryTrain)
                }).catch((error) => {
                    toast.dismiss();
                    toast.error("An error occurred");
                }).finally(() => {
                    setLoading(false);
                })

            }}>
                {loading ? <Loader className="animate-spin" size={20} /> : "Login"}
            </button>
            <div className="flex flex-row gap-7 justify-center w-64">
                <div className="text-white">Don't have an account?</div>
                <button className="text-white hover:underline" onClick={() => { setCurrentSection("register") }} >
                    Register
                </button>
            </div>
        </>
    )
}


