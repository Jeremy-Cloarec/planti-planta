"use client"
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ButtonDeleteUser() {
    const router = useRouter();

    const handleDeleteUser = async () => {
        await authClient.deleteUser();
        router.push("/"); // Redirection après déconnexion
    };

    return (
        <>
            <Button onClick={handleDeleteUser} className="bg-red">
                Supprimer le compte
            </Button>
        </>
    )
}
