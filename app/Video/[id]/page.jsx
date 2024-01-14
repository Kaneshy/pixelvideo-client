'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuccess, like, dislike } from "@/redux/features/videoSlice.js";
import { subscription } from "@/redux/features/userSlice.js";
import CommentsPage from '@/components/Comments';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import Link from 'next/link';


const VideoPage = ({ params }) => {


  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa')

  const dispatch = useDispatch()

  const [channel, setChannel] = useState({})
  // const { currentUser } = useSelector(state => state.user)
  // const dispatch = useDispatch

  useEffect(() => {
    console.log('bbbb')
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/videos/video/${params.id}`);
        console.log('res', res.data);
  
        // Dispatch an action to update the state or trigger a re-render
        dispatch(fetchSuccess(res.data));
  
        // Make another request after the initial response
        const channelRes = await axios.get(`/api/user/${res.data.userId}`);
        setChannel(channelRes.data);
  
        // Any additional logic after the second request
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [params.id, dispatch]);

  const handleLike = async () => {
    if(!currentUser) return
    await axios.put(`/api/user/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    if(!currentUser) return
    await axios.put(`/api/user/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    if(!currentUser) return
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/user/unsub/${channel._id}`)
      : await axios.put(`/api/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <main className=' mb-80'>
      <div className='header-max-h'>
        {currentVideo ? (
          <div className="video-container">
            <iframe width="1920" height="1080"
              //currentVideo.videoUrl
              src={currentVideo.videoUrl} allow="autoplay; fullscreen" controls allowFullScreen>
            </iframe>
          </div>
        ) : (
          <div> Loading video </div>
        )}
      </div>
      {!currentVideo ? (
        <div>Loading</div>
      ) : (
        <>
          <section className='flex flex-col p-4 gap-y-4 max-w-b'>
            <h2 className='text-body-bold'>{currentVideo.title}</h2>
            <div className='flex justify-between max-sm:flex-col gap-y-4'>
              <div className='flex max-sm:w-full max-sm:justify-between'>
                <div className='flex'>
                  <img
                    className='rounded-full mr-2'
                    width={45} src={currentVideo.imgPfp} alt="" />
                  <Link href={`/Profile/${channel._id}`}>
                    <p className='text-small-semibold'>{currentVideo.nameChannel}</p>
                    <p className='text-small-medium text-neutral-400'> {channel.subscribers} subscribers</p>
                  </Link>
                </div>

                <div className='flex items-center gap-x-4  '>
                  <div className=' justify-between px-6 py-2 rounded-xl '>
                    <button className='ml-6 px-4 py-2 bg-white text-black rounded-3xl text-small-semibold'
                      onClick={handleSub}
                    >
                      { currentUser && currentUser.subscribedUsers?.includes(channel._id) ? 'subscribed' : 'subcribe'}
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-x-4  '>
                <div className='color-btn-gray justify-between px-6 py-2 rounded-xl flex'>
                  <button
                    className='m-r gap-x-2 pr-2 flex items-center hover:scale-105 text-small-semibold'
                    onClick={handleLike}
                  >
                    {currentUser && currentVideo.likes?.includes(currentUser._id) ? (
                      <BiSolidLike size={22} />
                    ) : (
                      <BiLike size={22} />
                    )}{''}
                    {currentVideo.likes?.length}
                  </button>
                  <button
                    className='gap-x-2 px-2 flex items-center hover:scale-105 text-small-semibold'
                    onClick={handleDislike}
                  >
                    {currentUser && currentVideo.dislikes?.includes(currentUser._id) ? (
                      <BiSolidDislike size={22} />
                    ) : (
                      <BiDislike size={22} />
                    )}{''}
                    {currentVideo.dislikes?.length}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='flex  flex-col color-btn-gray p-2 rounded-xl'>
                <p className='text-small-regular'>{currentVideo.views} views 5 years ago</p>
                <p className='text-small-regular '>{currentVideo.desc}</p>
              </div>
            </div>

          </section>
          <CommentsPage videoId={currentVideo._id} />
        </>
      )}

    </main>
  )
}

export default VideoPage