"use client"
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/"); // Redirection après déconnexion
    };

    return (
        <>
            <Button onClick={handleSignOut}>
                Se déconnecter
            </Button>
        </>
    )
}
