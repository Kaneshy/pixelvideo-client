import axios from "axios"
import { NextResponse } from "next/server"
import { serialize } from 'cookie'
import { cookies } from 'next/headers'




export async function POST(req, res) {

    const { img, email, name } = await req.json()
    try {
        // const data = await fetch(`http://localhost:8800/api/auth/google`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         // img,
        //         email,
        //         name
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        const data = await axios.post('http://localhost:8800/api/auth/google', { email, name, img })

        // console.log('user/route/2', data)
        // console.log('user/route/21', data.data)
        // const userData = await data.json();
        // console.log('user/route', userData)

        // console.log('mio', data.headers)

        const cookiesG = data.headers.get('set-cookie');
        console.log('d', cookiesG)
        const cookiesArray = cookiesG[0].split(';').map(cookie => cookie.trim().split('='));
        // console.log('dg', cookiesArray)
        // console.log('dgdf', cookiesArray[0][1])

        console.log('c', data.data)
        // console.log('cookie', cookies)
        cookies().set('access_token', cookiesArray[0][1], { httpOnly: true })

        return NextResponse.json(data.data)

        // res.status(200).json(data);
        // return NextResponse.json(data.data, cookies)
    } catch (error) {
        console.log(error)
    }
}

export async function PUT(request) {

    const b = request.cookies.get('access_token')
    console.log('runing', b)
    try {
        const da = await request.json()
        const newName = da.name
        console.log('route.js', da)
        console.log('try running')
        // const data = await fetch(`http://localhost:8800/api/users/658099773b4edc5aade8784b`, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         name: da.name,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        const config = {
            headers: {
                'Cookie': `access_token=${b.value}`, // Set the specific cookie in the 'Cookie' header
                'Content-Type': 'application/json' // Adjust content type if necessary
            }
        };
        const data = await axios.put('http://localhost:8800/api/users/658644414a035826f6a410aa', {
            name: newName
        }, config)
        console.log('dddd', data.data)

        console.log('try running s', data.statusText)
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