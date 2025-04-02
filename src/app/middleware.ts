// // middleware.ts
// import { NextResponse, NextRequest } from 'next/server';
// import { cookies } from 'next/headers';

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   // Define the paths that need protection
//   if (pathname.startsWith('/users')) {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('token'); // Check for auth token in cookies
//     // If the token is not present, redirect to the login page
//     if (!token) {
//       return NextResponse.redirect(new URL('/signin', request.url));
//     }
//   }
//   // If the user is authenticated, continue with the request
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/users'], // Apply middleware only to /users routes
// };
