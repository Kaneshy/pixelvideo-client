import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  console.log('osos')
  try {
    const response = await axios.get(`https://pixelvideo.up.railway.app/api/videos/find/${params.id}`);
    const responseData = response.data; // Extract necessary data from the response
    const resview = await axios.put(`https://pixelvideo.up.railway.app/api/videos/view/${params.id}`)

    return NextResponse.json(response.data); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }
}