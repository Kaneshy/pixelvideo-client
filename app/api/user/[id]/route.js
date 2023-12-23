import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(request, {params}) {
    console.log('runing get')
    try {
        const channelRes = await axios.get(`http://localhost:8800/api/users/find/${params.id}`);
        const responseData = channelRes.data; // Extract necessary data from the response
    
        return NextResponse.json(responseData); // Return only the necessary data
      } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.error();
      }

}