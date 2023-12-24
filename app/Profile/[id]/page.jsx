'use client'
import Card from '@/components/Card'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { subscription } from "@/redux/features/userSlice.js";
import { motion } from 'framer-motion'

const ProfilePage = ({ params }) => {

    const { currentUser } = useSelector((state) => state.user)

    const [videos, setvideos] = useState([])
    const [channel, setchannel] = useState({})

    const dispatch = useDispatch()

    const fadeInAnimationVariants = {
        initial: {
            opacity: 0,
            y: 100,
        },
        animate: (index) => {
            return {
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.05 * index
                }
            }
        }
    }

    useEffect(() => {
        const handleVideos = async () => {

            try {
                const allvideos = await axios.get(`/api/videos/uservideos/${params.id}`)
                const channelRes = await axios.get(`/api/user/${allvideos.data[0].userId}`)
                setvideos(allvideos.data)
                setchannel(channelRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleVideos()
    }, [])


    const handleSub = async () => {
        console.log('handlesub')
        currentUser.subscribedUsers.includes(channel._id)
          ? await axios.put(`/api/user/unsub/${channel._id}`)
          : await axios.put(`/api/user/sub/${channel._id}`);
        dispatch(subscription(channel._id));
      };


    return (
        <main className='max-w-c gap-y-8 flex flex-col'>
            <section className='w-full text-opacity-40 h-20 rounded-xl bg-neutral-300 text-neutral-600 text-heading1-semibold p-4 text-center'>
                {channel.name}
            </section>
            <section className='w-full  flex border-a1 '>

                <div className=''>
                    <div>
                        <img width={250} height={250} src={channel.img} alt=""
                            className='rounded-full object-fill p-4'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <h1 className=' text-heading2-bold'>{channel.name}</h1>
                    <p className='flex text-small-semibold text-neutral-500'>@{channel.name} {channel.subscribers} subscribers 232 videos </p>
                    <p className='flex text-small-semibold text-neutral-500'>Unite, Capture, Share: Igniting Moments, Inspiring Connections!</p>

                    <div className='mb-8  '>
                        <div className=' py-2 rounded-xl '>
                            <button className='px-4 py-2 bg-white text-black rounded-3xl text-small-semibold'
                            onClick={handleSub}
                            >
                                {currentUser.subscribedUsers?.includes(channel._id) ? 'subscribed' : 'subcribe'}
                            </button>
                        </div>
                    </div>

                </div>

            </section>

            <section className='w-full'>
                <h1 className='w-full text-center text-body-semibold'> Videos </h1>
                <div id='a' className=' gap-y-5 p-4  flex flex-col items-center max-sm:p-0'>
                    <div className='home-sv-a'>
                        {videos.map((video, index) => {
                            return (
                                <Link href={`/Video/${video._id}`} key={video._id}>
                                    <motion.div
                                        className='rounded-2xl select-none relative bg-opacity-40 flex flex-col p-2 gap-y-7   shadow bg-neutral-900 max-sm:p-0 '
                                        initial='initial'
                                        variants={fadeInAnimationVariants}
                                        whileInView='animate'
                                        whileHover={{ scale: 1.05 }}
                                        viewport={{ once: true }}
                                        custom={index}
                                    >
                                        <Card video={video} />

                                    </motion.div>
                                </Link>

                            )
                        })}
                    </div>
                </div>
            </section>

        </main>
    )
}

export default ProfilePage