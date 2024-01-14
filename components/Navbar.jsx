'use client'
import Image from "next/image"
import Link from "next/link"
import { MdVideoCall } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";


import Searchbar from "./Searchbar"
import GoogleAuth from "./GoogleAuth"
import LeftSidebar from "./bars/LeftSidebar";
import { useState } from "react";

const Navbar = () => {

    const [sideBar, setsideBar] = useState(false)

    return (
        <nav className="flex select-none top-0 z-30 bg-color-main w-full top-22 p-2 text-white justify-between ">
            <div className='flex items-center ml-8 '>
                <Link
                href='/Home'
                className="flex"
                >
                    <Image src='/assets/logB.png' className="" alt='logo' width={50} height={50} />
                    <p className=' text-heading3-bold text-font-a1 text-xl text-light-1 max-sm:hidden flex items-center justify-center'> PixelVideo </p>
                </Link>
            </div>

            <Searchbar />

            <section className="flex justify-between mr-4">
                <Link href='/Upload' className='pr-4 py-2 rounded-2xl flex justify-center items-center '>  <MdVideoCall size={30} />  </Link>
                <GoogleAuth />
            </section>

            {sideBar && (
                <LeftSidebar />
            )}

        </nav>
    )
}

export default Navbar

{/* <div className='text-slate-300 flex flex-row max-xs:hidden max-sm:hidden p-2 justify-center items-center'>
                <div className="flex ">
                    {social.map((w, index) => {
                        return (
                            <Link href={w.ruta} key={index} className="px-2 ">
                                {w.name}
                            </Link>
                        )
                    })}
                </div>
            </div> */}