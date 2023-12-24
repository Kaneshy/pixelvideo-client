import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
  try {
    const response = await axios.get(`https://pixelvideo.up.railway.app/api/videos/profile/${params.id}`);
    const responseData = response.data; // Extract necessary data from the response

    return NextResponse.json(responseData); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error.message);
    return NextResponse.error();
  }
}
