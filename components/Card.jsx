import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



const Card = ({video}) => {

      const [channel, setChannel] = useState({});
      useEffect(() => {
        const fetchChannel = async () => {
          const res = await axios.get(`/api/user/${video.userId}`);
          setChannel(res.data);
        };
        fetchChannel();
      }, [video.userId]);

    return (
        <section className="">
                <div className="flex max-h-52">
                    <img className="w-full rounded-2xl object-contain"  src={video.imgUrl} alt="" />
                </div>
                <div className="flex   w-full p-2">
                    <div className=" items-center flex   pfp  ">
                        <img width={40} height={40}  src={channel.img} alt="" 
                        className="rounded-full  bg-slate-500   "
                        />
                    </div>
                    <div className="flex flex-col ml-2">
                        <h1 className="max-h-6 flex overflow-hidden text-base1-semibold">{video.title}</h1>
                        <p className="text-small-regular text-neutral-400"> {channel.name}</p>
                        <p className="text-small-regular text-neutral-400">{video.views} views 18h ago</p>
                    </div>
                </div>
        </section>

    );
};

export default Card;