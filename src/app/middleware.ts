// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const refreshToken = request.cookies.get("refreshToken");

//   if (!refreshToken) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // Protect the dashboard
// };