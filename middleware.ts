import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from '@/app/lib/session'

//1. Specify protected and public routes
const protectedRoutes = ["/user-account"]
const protectedRoutesAdmin = ["/admin"]
const publicRoutes = ["/", "/sign-in", "/sign-up"]

export default async function middleware(req: NextRequest) {
    //2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isProtectedRouteAdmin = protectedRoutesAdmin.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    //3. Decrypt the session from cookies
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    console.log(session);
    
    //4. Redirect to login if user is not authentificated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    // Admin
    if (isProtectedRouteAdmin && !session?.isAdmin) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    //5. Redirect to user account if user is authentificated
    if (isPublicRoute && session?.userId ) {
        const targetPath = "/user-account";
        if (path !== targetPath && path !== "/") {
            return NextResponse.redirect(new URL(targetPath, req.nextUrl));
        }
    }

    return NextResponse.next()
}

//Route Middleware should not run on 
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}