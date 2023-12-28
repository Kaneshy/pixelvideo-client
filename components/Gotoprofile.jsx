'use client'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


// const Gotoprofile = () => {

//     const { currentUser } = useSelector((state) => state.user)
//     const pathname = usePathname()
//     const isActive = (pathname.includes('/Profile'))
    
//     return (
//         <Link
//             href={`Profile/${currentUser._id}`}
//             className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
//         >
//             <Image
//                 src='/assets/user.svg'
//                 alt='img_profile'
//                 width={24}
//                 height={24}
//             />

//             <p className={`text-light-1 max-lg:hidden px-4 `}>Profile</p>
//         </Link>
//     )
// }

// export default Gotoprofile