"use client"
import Button from "./Button"
import {authClient} from "@/app/lib/auth-client";
import Link from "next/link";

export default function ButtonOrder() {
    const {data: session} = authClient.useSession()

    const text = session?.user?.name ? "Passer la commande" : "Se connecter"

    const buttonOrder = session?.user?.name ?
        <Button className="w-full" onClick={() => alert("Passer la commande est en cours de dévelopement")}>
            {text}
        </Button>
        :
        <Button className="w-full">
            <Link href={"/sign-in"}>
                {text}
            </Link>
        </Button>


    return (
        buttonOrder
    )
} 