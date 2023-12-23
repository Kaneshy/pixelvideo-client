'use client'
import { videosData } from '@/constants/index.js'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TrendTopbar from '@/components/bars/TrendTopbar'

const TagPage = ({params}) => {

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

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        const bodyTags = params.id
      try {
        const res = await axios.get(`/api/videos/tags/${bodyTags}`, {
            bodyTags
        });
        setVideos(res.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);


  return (

    <div id='a' className=' gap-y-5 p-4 mt-2  flex flex-col items-center max-sm:p-0'>
      <TrendTopbar />
      <div className='home-sv-a'>
        {videos.map((video, index) => {
          return (
            <Link href={`/Video/${video._id}`} key={video._id}>
              <motion.div
                className='rounded-2xl max-w-lg select-none relative bg-opacity-40 flex flex-col p-2 gap-y-7   shadow bg-neutral-900 max-sm:p-0 '
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

export default TagPage