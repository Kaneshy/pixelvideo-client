'use client'
import React from 'react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5";


const Searchbar = () => {
    const router = useRouter()
    const [q, setQ] = useState("");
    

    const handlequery = () => {
        router.push(`/api/videos/search?query=${q}`);
    }

    const handlequeryb = (e) => {
        e.preventDefault()
        router.push(`/Search?query=${q}`);
    }


    return (
        <div className="flex items-center w-2/3 max-w-xl ml-4 px-4  ">
            <form onSubmit={handlequeryb} className="flex w-full ">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setQ(e.target.value)}
                    className="border w-full border-gray-600 bg-neutral-900 rounded-l-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-500  "
                />
                <button
                    className=" bg-gray-600 hover:bg-gray-300 text-gray-200 px-3 py-2  rounded-r-full">
                    <IoSearchOutline size={24} />
                </button>
            </form>
        </div>
    )
}

export default Searchbar