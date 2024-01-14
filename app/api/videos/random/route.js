import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req, {params}) {
  const page = Number(req.url.split('?page=')[1])
  console.log(page)
  const searchParams = new URLSearchParams(req.url);
  console.log('hhh', searchParams)
  // const page = searchParams.get('page') 

  try {
    const response = await axios.get(`https://pixelvideo.up.railway.app/api/videos/random?page=${page}`);
    const responseData = response.data; // Extract necessary data from the response

    return NextResponse.json(responseData); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }
}

// import { connectToDatabase } from '../../db';

// export default async function handler(req, res) {
//   const { page = 1, pageSize = 10 } = req.query;

//   const database = await connectToDatabase();
//   const collection = database.collection('posts');

//   const skip = (page - 1) * pageSize;
//   const posts = await collection.find().skip(skip).limit(pageSize).toArray();

//   res.status(200).json(posts);
// }
