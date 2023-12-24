import axios from 'axios';
import { NextResponse } from 'next/server';
// import { usePathname, useSearchParams } from 'next/navigation'

export async function GET(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const queryValue = searchParams.get('query')
  const queryValueB = queryValue.toString()

try {
  const response = await axios.get(`https://pixelvideo.up.railway.app/api/videos/search?q=${queryValueB}`);
  const responseData = response.data; // Extract necessary data from the response
  return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.error();
  }


  // // export const search = async (req, res, next) => {
  //   const query = req.query;
  //   console.log(query)
  // };
  // console.log('oso', queryValue)
  // console.log('osof', queryValue)
  // console.log('osoh', req)
  // const { url: pathname } = req;
  // const { url: search } = req;
  // try {
  //   const { url: pathname } = req; // Getting the pathname from the request object
  //   console.log(pathname)
    // Use the pathname in API logic
    // return NextResponse.json(pathname)
    // return res.status(200).json({ pathname });
    // const response = await axios.get(`http://localhost:8800/api/videos/search${queryValue}`);
    // const responseData = response.data; // Extract necessary data from the response
    // console.log('moose', responseData)
  //   return NextResponse.json(res); // Return only the necessary data
  // } catch (error) {
  //   console.error('Error occurred:', error);
  //   return NextResponse.error();
  // }
}
