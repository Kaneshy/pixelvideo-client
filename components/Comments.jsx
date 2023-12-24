'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentsPage = ({ videoId }) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [commentText, setcommentText] = useState('')



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { }
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async () => {
    try {
      const res = await axios.post(`/api/comments/comment/${videoId}`, {commentText} )

    } catch (error) {
      console.log('ddd', error.message)
    }
    setcommentText('')
  }



  //add comment route /api/comments
  return (
    <main className="p-4 mb-6 text-white max-w-b">
      <section className="flex">
        <div className="align-middle items-center flex px-2">
          <img
            src={currentUser.img} alt=""
            className='rounded-full mr-2'
            width={45}
          />
        </div>
        <div className="flex flex-col w-full mb-4 ">
          <input className="w-full mb-4 bg-neutral-800 rounded-xl p-4" placeholder="Add a comment..." type="text" 
          value={commentText}
          onChange={(e)=>setcommentText(e.target.value)}
          />
          <button className="bg-white text-small-regular text-black w-28 p-1 rounded-xl " 
          onClick={handleComment}
          >comment</button>
        </div>
      </section>
      <section>
        {comments.map((comment) => {
          return (
            <Comment key={comment._id} comment={comment} />
          )
        })}
      </section>

    </main>
  )
}

export default CommentsPage