"use client";
import Image from "next/image";
import Link from "next/link";
import { PiUser } from "react-icons/pi";
import { TbMenu } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useSession } from "next-auth/react"
import Avatar from '@mui/material/Avatar';


export default function Navbar() {

    const { data: session } = useSession()
    console.log(session);


    const [navOpen, setNavOpen] = useState(false)

    const navLinks = [
        {
            label: "Home",
            url: "/"
        },
        {
            label: "About Us",
            url: "/about"
        },
        {
            label: "Feed",
            url: "/feed"
        },
        {
            label: "Post Idea",
            url: "/post"
        },
        {
            label: "Dashboard",
            url: "/dashboard"
        }
    ]
    return (
        <main className="flex items-center justify-between bg-blue-600 text-white md:px-10 md:py-3 p-3 shadow-md max-w-7xl">
            <Link href={"/"} className="z-50">
                <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={800}
                    height={800}
                    className="w-10 h-10"
                />
                <p className="font-black text-2xl ml-0 text-center left-5">BizArena</p>
            </Link>

            {/* Tablet and Desktop Nav */}
            <div className="flex items-center bg-blue-600 gap-10 ml-auto px-10 max-md:hidden">
                {
                    navLinks.map((item, index) => (
                        <Link key={index} href={item.url} className="hover:text-gray-700 transition-colors duration-200">{item.label}</Link>
                    ))
                }
            </div>

            {/* Mobile nav */}
            <div className={`bg-white h-dvh w-full md:hidden absolute top-0 left-0 items-center flex-col pt-20 gap-15 ${navOpen ? "flex" : "hidden"}`}>
                {
                    navLinks.map((item, index) => (
                        <Link key={index} href={item.url} className="hover:text-gray-700 transition-colors duration-200 text-2xl">{item.label}</Link>
                    ))
                }
            </div>

            {
                session ? <Link href={"/profile"}><Avatar alt={session?.user?.name} src={session?.user?.image} /></Link>
                    : (
                        <Link className="flex items-center gap-1 hover:text-gray-700 transition-all duration-200 max-md:ml-auto z-50" href={"/signin"}><p className="max-md:hidden">Sign In</p><PiUser className="max-md:text-2xl text-lg" /></Link>
                    )
            }

            <button onClick={() => setNavOpen(!navOpen)} className="text-2xl md:hidden ml-5 z-50">
                {
                    navOpen ? <IoMdClose /> : <TbMenu />
                }
            </button>
        </main>
    )
}