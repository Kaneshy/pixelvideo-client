'use client'
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "@/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';

const UploadPage = () => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const router = useRouter()

  
  const { currentUser } = useSelector(state => state.user)


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    // const fileName = new Date().getTime() + file.name;
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const currentUserInfo = {
      imgPfp: currentUser.img,
      nameChannel: currentUser.name
    }
    const b = { ...inputs, currentUserInfo }

    console.log('ddfdf', b)
    try {
      const res = await axios.post("/api/videos/upload", { b, tags })
      console.log('upload status', res.status)

      if (res.status === 200) {
          router.push(`/Home`);
      }

    } catch (error) {
      console.log('ddd', error.message)
    }
    // res.status===200 && navigate(`/video/${res.data._id}`)
  }

  const handletest = () => {
    console.log('cu', currentUser)
  }

  return (
    <main>
      <button className="bg-blue p-2" onClick={handletest}>tap</button>
      <div className="max-w-xl mx-auto mt-8 p-4 bg-neutral-900 rounded-lg">
        <h1 className='text-center  font-bold text-2xl text-white border-a1 pb-2 mb-6 '>Upload your video </h1>
        
        <div className="mb-4">
          <label htmlFor="video" className=" text-gray-400 justify-around gap-x-2 font-bold mb-2 flex  ">
            <p className="text-small-semibold"> Select video here</p>
            <div className="bg-blue-2 text-small-semibold text-white p-2 rounded-xl hover:bg-blue-3  ">Select form computer</div>
          </label>
          {videoPerc > 0 ? ('Uploading ' + videoPerc + '%') : (
            <input type="file" id="video" onChange={(e) => setVideo(e.target.files[0])} className="border-gray-300 hidden" />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="thumbnail" className=" text-gray-400 justify-around gap-x-2 font-bold mb-2 flex  ">
            <p className="text-small-semibold"> Select thumbnail here</p>
            <div className="bg-blue-2 text-small-semibold text-white p-2 rounded-xl hover:bg-blue-3  ">Select form computer</div>
          </label>
          {imgPerc > 0 ? ('Uploading ' + imgPerc + '%') : (
            <input type="file" id="thumbnail" onChange={(e) => setImg(e.target.files[0])} className="border-gray-300 hidden" />
          )}
        </div>

        {/* <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-400 font-bold mb-2">Thumbnail:</label>
          {imgPerc > 0 ? ('Uploading ' + imgPerc + '%') : (
            <input type="file" id="thumbnail" onChange={(e) => setImg(e.target.files[0])} className="border-gray-300" />
          )}
        </div> */}

        <div className="mb-4 border-gray-500 border rounded  p-2 w-full">
          <label htmlFor="title" className="text-small-semibold block text-gray-400 font-bold mb-2 ">Título (required): </label>
          <input type="text" id="title" name='title' onChange={handleChange} className="border-neutral-500 border rounded bg-neutral-900 p-2 w-full" />
        </div>
        <div className="mb-4 border-gray-500 border rounded  p-2 w-full">
          <label htmlFor="tags" className="text-small-semibold block text-gray-400 font-bold mb-2">Tags: (music,art,animation,drawing,dance...)</label>
          <input type="text" id="tags" onChange={handleTags} className="border-gray-500 border rounded bg-neutral-900  p-2 w-full" />
        </div>
        <div className="mb-4 border-gray-500 border rounded  p-2 w-full">
          <label htmlFor="description" className="text-small-semibold block text-gray-400 font-bold mb-2">Descripción:</label>
          <textarea id="description" name='desc' onChange={handleChange} className="border-gray-500 border rounded bg-neutral-900 p-2 w-full h-24"></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-1 w-full hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          onClick={handleUpload}
        >
          Submit
        </button>
      </div>
    </main>
  )
}

export default UploadPage