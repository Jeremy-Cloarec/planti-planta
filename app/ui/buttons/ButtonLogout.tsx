"use client"
import Button from "./Button"
import {authClient} from "@/app/lib/auth-client";
import {useRouter} from "next/navigation";

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
        <Button onClick={handleSignOut} className="bg-white text-sm hover:bg-slate-200 ring-1 ring-slate-200">
            Se déconnecter
        </Button>
    )
}
