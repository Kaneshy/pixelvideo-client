import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    console.log('params tags server nextjs', params.id)
    const tags = params.id
  try {
    const response = await axios.get(`http://localhost:8800/api/videos/tags?tags=${tags}`);
    const responseData = response.data; // Extract necessary data from the response
    console.log('responseData', responseData)
    console.log('responseData', response.status)
    return NextResponse.json(responseData); // Return only the necessary data
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }
}
