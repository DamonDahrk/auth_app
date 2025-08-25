import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  //nexturl is instance of URL class, which is used to represent a URL and its associated properties.
  //request is an instance of NextRequest class, which is used to represent a request made to a Next.js application.
  //pathname is a property of the URL class that represents the path of the URL.


  //Extracts the request path

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  //Marks routes that are public, i.e., accessible without login.


  const token = request.cookies.get('token')?.value || ''

  //Extracts the value of the token cookie from the request cookies. If the token cookie is not found, it returns an empty string.

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  //If the user requests a public path and has a token (logged in), redirect to the root path (/)

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  //If the user requests a non-public path (protected page) but does NOT have a token (not logged in), redirect to /login
    
}

 
// Specifies the paths for which this middleware runs. It covers public and protected routes in your app.
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}  //