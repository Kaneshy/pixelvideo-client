import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
    const body = await req.json();
    // console.log('req.', body)
    const b = req.cookies.get('access_token')
    const bodyData = body.commentText

    // const newVideo = new Video({ userId: req.user.id, ...req.body });
    // console.log('upload video', newVideo)
    // const { img, email, name } = await req.json()
    try {
        
        const config = {
            headers: {
              'Cookie': `access_token=${b.value}`, // Set the specific cookie in the 'Cookie' header
              'Content-Type': 'application/json' // Adjust content type if necessary
            }
          };
        const data = await axios.post('https://pixelvideo.up.railway.app/api/comments' ,{
            desc:bodyData,
            videoId:params.id
        }, config)

        return NextResponse.json(data.data)
        
        // res.status(200).json(data);
        // return NextResponse.json(data.data, cookies)
    } catch (error) {
        console.log(error.message)
        return NextResponse.json('error upload')
    }
}