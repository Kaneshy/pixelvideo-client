import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  console.log('videos/video/id/route')
  try {
    const response = await axios.get(`http://localhost:8800/api/videos/find/${params.id}`);
    const responseData = response.data; // Extract necessary data from the response

    return NextResponse.json(responseData); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }
}