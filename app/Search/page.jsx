'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { usePathname, useSearchParams } from 'next/navigation'
import TrendTopbar from '@/components/bars/TrendTopbar'

const SearchPage = () => {

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
  const [videos, setVideos] = useState([])
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // const url = `${pathname}?${searchParams}`
    const search = searchParams.get('query')
    // console.log(url)
    // console.log('a', pathname)
    console.log('search', search)
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/search?query=${search}`);
        console.log('chethaa', res)
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])

  // const router = useRouter();
  // const { query } = router.query;
  // console.log('Query:', query);
  // const [videos, setVideos] = useState([]);
  // console.log(videos)
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const res = await axios.get(`/api/videos/search`);
  //       setVideos(res.data);
  //     } catch (error) {
  //       console.error('Error fetching videos:', error);
  //     }
  //   };
  //   fetchVideos();
  // }, []);

  return (

    <div id='a' className='gap-y-10 p-4 mt-6 flex flex-col items-center max-w-lg'>
      <TrendTopbar />
      <div className='home-sv-a'>
        {videos.map((video, index) => {
          return (
            <Link href={`/Video/${video._id}`} key={video._id}>
              <motion.div
                className='rounded-xl relative bg-opacity-40 flex flex-col p-2 gap-y-7   shadow bg-neutral-900 '
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
  )
}

export default SearchPage