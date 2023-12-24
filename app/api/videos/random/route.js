import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get('https://pixelvideo.up.railway.app/api/videos/random');
    const responseData = response.data; // Extract necessary data from the response

    return NextResponse.json(responseData); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }
}
