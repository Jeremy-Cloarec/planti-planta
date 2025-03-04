import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl }}) {
            const isLoggedIn = !!auth?.user
            const isOnUserAccount = nextUrl.pathname.startsWith('./user-account')
            if(isOnUserAccount) {
                if (isLoggedIn) return true
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/user-account', nextUrl))
            }
            return true
        }
    },
    providers: [],
} satisfies NextAuthConfig;