'use client'
import { sidebarLinks, sidebarTrens } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const LeftSidebar = () => {

  const router = useRouter()
  const pathname = usePathname()

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-3 px-6">
        {sidebarLinks.map((link) => {
          // link.route is in constants index.js 
          // link.route.length > 1 = no estamos en home page || alt 124
          const isActive = (pathname.includes(link.route) && link.route.length > 1)// || pathname === link.route
          const video = (pathname.includes('/Video'))
          // if (link.route === "/") link.route = `${link.route}/`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className={`text-light-1 max-lg:hidden px-4 `}>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="flex w-full pt-2 flex-1 flex-col gap-5 px-6 ">
        {sidebarTrens.map((link) => {
          // link.route is in constants index.js 
          // link.route.length > 1 = no estamos en home page || alt 124
          const isActive = (pathname.includes(link.label) && link.route.length > 1)// || pathname === link.route
          // const video = (pathname.includes('/Video'))
          // if (link.route === "/") link.route = `${link.route}/`;

          return (
            <Link
              href={`${link.route}/${link.label}`}
              key={link.label}
              className={`leftsidebar_link  ${isActive && 'bg-primary-500'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={34}
                height={34}
              />

              <p className={`text-light-1 max-lg:hidden px-4 `}>{link.label}</p>  
            </Link>
          )
        })}
      </div>

    </section>
  )
}

export default LeftSidebar