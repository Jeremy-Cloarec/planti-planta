import {
    createAuthClient
} from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
})

export const {
    signIn,
    signOut,
    signUp,
    changePassword,
    useSession,
    deleteUser
} = authClient;

export const googleSignIn = () =>  authClient.signIn.social({
    provider: "google",
})