import axios from "axios"
import { NextResponse } from "next/server"



export async function PUT(request, { params }) {

    const b = request.cookies.get('access_token')
    console.log('runing jnjn', b)
    console.log('video.id server next', params.id)



    try {
        const config = {
            headers: {
                'Cookie': `access_token=${b.value}`, // Set the specific cookie in the 'Cookie' header
                'Content-Type': 'application/json' // Adjust content type if necessary
            }
        };

        // console.log('dddd', data)
        const data = await axios.put(`http://localhost:8800/api/users/sub/${params.id}`,{}, config)


        return NextResponse.json('updated')
    } catch (error) {
        console.log('Errord', error.message)
        return NextResponse.json('error')
    }

}