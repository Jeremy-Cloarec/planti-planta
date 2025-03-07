import "server-only"
// Data Access Layer
// Centralize data request and authorization logic
// Include a function that verifie the user's session as they interact with your application
//At least, function should check if the sessionis valid, then redirect or return the user information needed to make further request
import { cookies } from "next/headers"
import { decrypt } from "./session"
import { cache } from "react"
import { redirect } from "next/navigation"

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('./')
    }

    return { isAuth: true, userId: session.userId }
})