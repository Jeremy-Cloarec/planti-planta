"use client"
import { usePlantsBasket } from "@/app/context/PlantsBasketContext";
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { PlantInBasket } from "@/app/lib/definitions";

export default function ButtonOrder() {
    const { data: session } = authClient.useSession()
    const plantsInBasket = usePlantsBasket()

    const text = session?.user?.name ? "Passer la commande" : "Se connecter"

    function sendOrder (plantsInBasket: PlantInBasket[]) {
        fetch(`/api/stripe/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(plantsInBasket)
        })
    }

    const buttonOrder = session?.user?.name ?
        <Button className="w-full"  onClick={() => sendOrder(plantsInBasket)}>
            {text}
        </Button>
        :
        <Link href={"/sign-in"}>
            <Button className="w-full">
                {text}
            </Button>
        </Link>

    return (
        buttonOrder
    )
} 