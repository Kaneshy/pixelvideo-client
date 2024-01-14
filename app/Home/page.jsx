'use client'
import { videosData } from '@/constants/index.js'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TrendTopbar from '@/components/bars/TrendTopbar'
import InfiniteScroll from 'react-infinite-scroll-component';
import { FcSupport } from "react-icons/fc";



const HomePage = () => {

  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [test, settest] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

  const fetchVideos = async () => {
    console.log('gs', page)
    try {
      const res = await axios.get(`/api/videos/random?page=${page}`);
      const data = await res.data;


      if (data.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevPosts) => [...prevPosts, ...data]);
        setPage((prevPage) => prevPage + 1);
      }


    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    console.log('run')
    fetchVideos();
  }, []);


  return (

    <InfiniteScroll
      dataLength={videos.length}
      next={fetchVideos}
      hasMore={hasMore}
      loader={
        <div id='a' className=' gap-y-5 p-4  flex flex-col items-center max-sm:p-0'>
          <div className='home-sv-a'>
            {test.map((x, index) => {
              return (
                <div key={index}>
                  <div className='rounded-2xl select-none relative bg-opacity-40 flex flex-col p-2 gap-y-7   shadow bg-neutral-900 max-sm:p-0 '>
                      <div className="flex max-h-52">
                        <div className="w-full h-52 flex rounded-2xl object-contain bg-neutral-800" alt="" />
                      </div>
                      <div className="flex w-full p-2">
                        <div className="flex flex-col ml-2">
                          <h1 className="min-h-6 flex overflow-hidden text-base1-semibold bg-neutral-700 w-full py-4"></h1>
                        </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
    >
      <div id='a' className=' gap-y-5 p-4  flex flex-col items-center max-sm:p-0'>
        <TrendTopbar />
        <div className='home-sv-a'>
          {videos.map((video, index) => {
            return (
              <Link href={`/Video/${video._id}`} key={video._id + index}>
                <div className='rounded-2xl select-none relative bg-opacity-40 flex flex-col p-2 gap-y-7   shadow bg-neutral-900 max-sm:p-0 '>

                  <Card video={video} />

                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </InfiniteScroll>
  )
}

export default HomePage