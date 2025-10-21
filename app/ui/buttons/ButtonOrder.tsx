"use client"
import { usePlantsBasket } from "@/app/context/PlantsBasketContext";
import Button from "./Button"
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { stripePayment } from "@/app/actions/stripe.action";
import { useEffect } from "react";

export default function ButtonOrder() {
    const { data: session } = authClient.useSession()
    const plantsInBasket = usePlantsBasket()

    useEffect(() => {
        console.log(plantsInBasket);
    })
    
    const handleOrder = async () => {

        try {
            const url = await stripePayment(plantsInBasket);
            if (url) {
                window.location.href = url;
            } else {
                alert("Erreur : l'URL Stripe est introuvable.");
            }
        } catch (error) {
            console.error("Erreur Stripe :", error);
            alert("Une erreur est survenue pendant le paiement.");
        }
    };

    const text = session?.user?.name ? "Passer la commande" : "Se connecter"

    const buttonOrder = session?.user?.name ?
        <Button className="w-full" onClick={handleOrder}>
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