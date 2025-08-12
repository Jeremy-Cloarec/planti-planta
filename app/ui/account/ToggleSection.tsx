"use client"

import Orders from "@/app/ui/account/Orders";
import Infos from "@/app/ui/account/Infos";
import { useState } from "react";
import { User } from "@/app/lib/definitions"
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

export default function ToggleSection() {
    const { data: session } = authClient.useSession()
    if (!session) redirect("/")

    const user: User = {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email
    }

    const [isInfos, setIsInfos] = useState<boolean>(true)

    return (
        <>
            <section className="bg-green p-3 flex gap-3  justify-center items-center md:mx-3 md:rounded-xs mb-6">
                <button role="tab" className={`${isInfos ? "underline underline-offset-2" : ""}`} onClick={() => {
                    setIsInfos(true)
                }}>Mes infos
                </button>
                <button role="tab" className={`${!isInfos ? "underline underline-offset-2" : ""}`} onClick={() => { setIsInfos(false) }}>Mes Commandes</button>
            </section>
            {isInfos ? <Infos user={user} /> : <Orders />}
        </>
    )
}