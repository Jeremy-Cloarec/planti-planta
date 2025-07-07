"use client"
import {googleSignIn} from "@/app/lib/auth-client";

export default function GoogleProviderButton() {
    return (
        <div>
            <button onClick={googleSignIn}>Se connecter avec Google</button>
        </div>

    )
}