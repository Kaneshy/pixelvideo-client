import axios from "axios";
import { NextResponse } from "next/server";


export async function GET(request, {params}) {
    try {
        const channelRes = await axios.get(`https://pixelvideo.up.railway.app/api/users/find/${params.id}`);
        const responseData = channelRes.data; // Extract necessary data from the response
    
        return NextResponse.json(responseData); // Return only the necessary data
      } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.error();
      }

}