'use client'
import  { useState } from 'react'

const Alerts = ({ alertH }) => {

    const [isActive, setisActive] = useState(true)

        setTimeout(() => {
            console.log('is running alert', alertH)
            setisActive(false)
        }, 3000);

    return (
        <main className='fixed bottom-2 right-2'>
            {isActive && (
                <div className='rounded-xl bg-neutral-400 text-small-semibold p-4'>
                    <p>{alertH} succefully</p>
                </div>
            )}
        </main>
    )
}

export default Alerts