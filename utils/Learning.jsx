'use client'
import { usePathname, useSearchParams } from 'next/navigation'



const Learning = () => {

    // get the path in use client next js
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {

        const url = `${pathname}?${searchParams}`
        const search = searchParams.get('query')
        console.log(url)
        console.log('a', pathname)
        console.log('b', search)

      }, [pathname, searchParams])

       // get the path in use client next js

  return (
    <div>Learning</div>
  )
}

export default Learning