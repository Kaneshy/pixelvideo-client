'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

    useEffect(() => {
      router.push('/Home')
    }, [2000])
    

  return (
    <main className="flex items-center justify-center text-center w-full h-screen flex-col bg-purple-950">
        <h1>Getting Started</h1>
        <img src="/assets/logB.png" width={500} height={500} alt="" />
    </main>
  )
}
