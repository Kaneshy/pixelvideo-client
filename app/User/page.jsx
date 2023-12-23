'use client'
import Alerts from '@/components/Alerts';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const UserPage = () => {

    const [newName, setnewName] = useState('')
    const [alertD, setalertD] = useState(false)
    const { currentUser } = useSelector((state) => state.user)


    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(newName)
        console.log(currentUser._id)
        try {
            const data = await axios.put(`/api/user/profile/${currentUser._id}`, {
                name: newName
            })
            console.log('mooseee', data.data)
            setalertD(true)
        } catch (error) {
            console.log('error')
        }

    }

    return (

        <main>
            <div className="max-w-xl mx-auto mt-8 p-4 bg-neutral-900 rounded-lg">
                <h1 className='text-center  font-bold text-2xl text-white border-a1 pb-2 mb-6 '> Edit your profile </h1>

                <div className="mb-4 border-gray-500 border rounded  p-2 w-full">
                    <label htmlFor="title" className="text-small-semibold block text-gray-400 font-bold mb-2 ">Username (required): </label>
                    <input type="text" id="title" name='title' onChange={(e) => setnewName(e.target.value)} className="border-neutral-500 border rounded bg-neutral-900 p-2 w-full" />
                </div>

                <button
                    type="submit"
                    className="bg-blue-1 w-full hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            { alertD && (
                <Alerts alertH={'Profile Edited'}/>
            )}
        </main>

    );
};

export default UserPage;