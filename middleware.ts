import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from '@/app/lib/session'

//1. Specify protected and public routes
const protectedRoutes = ["/user-account"]
const protectedRoutesAdmin = ["/admin"]
const publicRoutes = ["/", "/sign-in", "/sign-up"]


export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname

    //2. Check if the current route is protected or public
    const isProtectedRoute = protectedRoutes.includes(path)
    const isProtectedRouteAdmin = protectedRoutesAdmin.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    //3. Decrypt the session from cookies
    const coookieStore = await cookies()
    const sessionCookies = coookieStore.get('session')?.value
    const session = await decrypt(sessionCookies)

    //4. Redirect to login if user is not authentificated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    //5. Redirect if admin route and not admin
    if (isProtectedRouteAdmin && !session?.isAdmin) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    //6. Redirect to user account if user is authentificated
    if (isPublicRoute && session?.userId) {
        const targetPath = "/user-account";
        if (path !== targetPath && path !== "/") {
            return NextResponse.redirect(new URL(targetPath, req.nextUrl));
        }
    }

    // // 7. 
    // const hasSession = !!session?.userId
    // const hasGuestCookie = coookieStore.get("userId")?.value

    // const isOnApi = path.startsWith("/api")

    // if (!hasSession && !hasGuestCookie && !isOnApi) {
    //     const url = req.nextUrl.clone()
    //     url.pathname = "/api"
    //     return NextResponse.redirect(url)
    // }
    return NextResponse.next()
}

//Route Middleware should not run on 
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}