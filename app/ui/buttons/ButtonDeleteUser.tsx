"use client"
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ButtonDeleteUser() {
    const router = useRouter();

    const handleDeleteUser = async () => {
        await authClient.deleteUser();
        router.push("/"); 
    };

    return (
        <>
            <Button onClick={handleDeleteUser} className="bg-white text-red-800 ring-1 ring-red-800 hover:bg-red-800 hover:text-white transition duration-300 text-sm w-full">
                Supprimer
            </Button>
        </>
    )
}
