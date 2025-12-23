"use client"
import { usePlantsBasket } from "@/app/context/PlantsBasketContext";
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { PlantInBasket } from "@/app/lib/definitions";

export default function ButtonOrder({ sendOrder }: {
    sendOrder: (plantsInBasket: PlantInBasket[]) => Promise<void>
}) {
    const { data: session } = authClient.useSession()
    const plantsInBasket = usePlantsBasket()

    return (
        <div className="flex items-center justify-center gap-4 bg-slate-100">
            <Button className="w-full" onClick={() => sendOrder(plantsInBasket)}>
                Passer la commande
            </Button>
            {!session?.user?.name &&
                <Link href={"/sign-in"} className="w-full">
                    <Button className="w-full bg-white hover:">Se connecter</Button>
                </Link>
            }
        </div>
    )
} 