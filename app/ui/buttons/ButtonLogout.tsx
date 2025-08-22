"use client"
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                }
            }
        });
    };

    return (
        <button
            onClick={handleSignOut}
            className={`px-1 py-2 w-full transition delay-75 duration-300 ease-in-out bg-green hover:bg-green-hover text-dark rounded-sm`}
        >
            Se déconnecter
        </button>
    )
}
