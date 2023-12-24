import axios from "axios"
import { NextResponse } from "next/server"

export async function PUT(request, {params}) {

    const b = request.cookies.get('access_token')
    try {
        const da = await request.json()
        const newName = da.name


        const config = {
            headers: {
                'Cookie': `access_token=${b.value}`, // Set the specific cookie in the 'Cookie' header
                'Content-Type': 'application/json' // Adjust content type if necessary
            }
        };
        const data = await axios.put(`https://pixelvideo.up.railway.app/api/users/${params.id}`, {
            name: newName
        }, config)

        return NextResponse.json(data.data)
    } catch (error) {
        console.log('Error', error.message)
        return NextResponse.json('error')
    }
    // try {
    //     const fug = await axios
    //       .post("http://localhost:8800/api/users/657e79122178c580a7493d2c", {
    //         name: da.name,
    //       })
    // return NextResponse.json(fug)
    // } catch (error) {
    //     console.log(error)
    // }
    // try {
    //     const res = await fetch(`http://localhost:8800/api/users/657e79122178c580a7493d2c`, {
    //         method: 'PUT',
    //         body: JSON.stringify({data}) ,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     return NextResponse.json(res)
    // } catch (error) {
    //     console.log('error')
    // }
}