
import { recommendationesTags } from '@/constants/index.js'
import Link from 'next/link'

const TrendTopbar = () => {
  return (
    <div className='ml-14 select-none text-neutral-100 gap-x-4 flex w-full justify-start max-lg:hidden '>

    {recommendationesTags.map((link) => {
        return (
          <Link
            href={`${link.route}/${link.label}`}
            key={link.label}
          >
            <p className='rounded-xl bg-neutral-700 px-4 py-1'>{link.label}</p>  
          </Link>
        )
      })}

    </div>
  )
}

export default TrendTopbar