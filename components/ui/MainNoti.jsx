'use client'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from 'framer-motion'


const MainNoti = () => {

    const [isActive, setisActive] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setisActive(false)
        }, 2000);
    }, [])

    return (
        <motion.main
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            className={` ${isActive ? 'fixed' : 'hidden'} bottom-10 z-20 right-10 rounded-xl bg-black text-white p-4`}>
            <div className='flex gap-2 justify-center items-center'>
                <FaCheckCircle size={24} />
                <span> SING UP FIRST  </span>
            </div>
        </motion.main>
    )
}

export default MainNoti