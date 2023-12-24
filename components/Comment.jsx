'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/api/user/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <main className="flex w-full p-2 border-t border-neutral-800 py-4 ">

      <div className="align-middle items-center flex px-2">
        <img
          src={channel.img} alt=""
          className='rounded-full mr-2'
          width={35}
        />
      </div>
      <section className="flex flex-col w-full">
        <div className="flex p-1 gap-x-2">
          <p className=" text-small-semibold">{channel.name}</p>
          <p className=" text-small-semibold text-neutral-500" >1 day ago</p>
        </div>
        <div className="bg-neutral-900 rounded-2xl w-full p-3 flex">{comment.desc}</div>
      </section>


    </main>
  )
}

export default Comment