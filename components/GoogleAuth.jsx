'use client'
import React, { useState } from 'react'
import { auth, provider } from '@/firebase.js'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from 'axios'
import { loginStart, loginSuccess, loginFailure, logout } from '@/redux/features/userSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';



// try {
//     const response = await fetch(`/api/user`, {
//         method: 'POST',
//         body: JSON.stringify({
//             name:result.user.displayName,
//             email:result.user.email,
//             img:result.user.photoURL
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const data = await response.json()
// } catch (error) {
//     console.log('error')
// }

const GoogleAuth = () => {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [signOutBar, setsignOutBar] = useState(false)


    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const b = await axios.post('/api/user', {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                })
                    .then((res) => {
                        console.log('runing ga', res.data)
                        dispatch(loginSuccess(res.data));
                    })
            })
            .catch((error) => {
                dispatch(loginFailure());
            });
        // const dataH = await fetch(`/api/user`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: result.user.displayName,
        //         email: result.user.email,
        //         // img:result.user.photoURL
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

    }

    const singOutGoogle = () => {
        signOut(auth).then(async () => {
            console.log('successful')
            dispatch(logout())
            // Sign-out successful.
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }

    return (
        <main className='flex items-center '>
            {currentUser ? (
                <section className='p-1  w-full gap-x-6 flex justify-evenly items-center align-middle '>

                    <div
                        className=' flex items-center align-middle gap-x-3'
                        onClick={() => setsignOutBar(!signOutBar)}
                    >
                        <div className='max-xl:hidden'>{currentUser.name}</div>
                        <div className='w-8 h-8 flex'>
                            <img className='rounded-full object-contain ' width={50} height={50} src={currentUser.img} alt="" />
                        </div>
                        {signOutBar && (
                            <section className='bg-neutral-900 z-50 gap-y-2 absolute flex flex-col  top-20 right-2 text-center text-small-semibold px-4 py-2 rounded-xl  w-28  '>
                                <div
                                    className='hover:scale-110 hover:bg-neutral-600 rounded-xl p-2 '
                                    onClick={singOutGoogle}
                                >Sign Out</div>
                                <Link href='/User' className='hover:scale-110 hover:bg-neutral-600 rounded-xl p-2   '>Setting</Link>
                            </section>

                        )}
                    </div>

                </section>
            ) : (
                <div className='flex mr-4 p-2 hover:text-blue-300 hover:border-blue-300 items-center border border-blue-600 text-blue-600 px-3 rounded-2xl'>
                    <button
                        onClick={signInWithGoogle}
                    >
                        SINGIN
                    </button>
                </div>

            )}

        </main>
    )
}

export default GoogleAuth