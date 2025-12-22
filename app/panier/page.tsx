"use client"
import Nav from "../ui/nav/Nav"
import { cabinBold, cormorant } from "../ui/fonts"
import Footer from "../ui/Footer"
import { usePlantsBasket } from "@/app/context/PlantsBasketContext";
import CardPlantBasket from "@/app/ui/basket/CardPlantBasket";
import CommandResume from "@/app/ui/basket/CommandResume";
import { calculateTotalPrice } from "@/app/utils/utils";
import { PlantInBasket } from "../lib/definitions";
import { useRouter } from "next/navigation";

export default function Basket() {
    const plantsInBasket = usePlantsBasket();
    const totalPrice = calculateTotalPrice(plantsInBasket);
    const router = useRouter();

    async function sendOrder(plantsInBasket: PlantInBasket[]) {
        const createSession = await fetch(`/api/stripe/create-checkout-session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plantsInBasket)
        }).then((response) => response.json());

        if (createSession.status !== "open") {
            throw new Error("Un problème est survenu dans la création de la session.");
        };

        router.push('/paiement');
    }

    return (
        <>
            <Nav />
            <main className="w-full flex-1 pt-[72px] flex flex-col gap-4 max-w-(--breakpoint-lg)">
                <div className="flex items-center justify-between my-6 px-3 md:px-4">
                    <h1 className={`${cormorant.className} text-3xl`}>Votre panier</h1>
                    <p className={`${cabinBold.className} text-3xl`}>{totalPrice} €</p>
                </div>
                {plantsInBasket.length > 0 ? (
                    <div className="flex flex-col gap-6 flex-1 justify-between
                    md:flex-row md:items-start md:px-3
                    ">
                        <CardPlantBasket plantsInBasket={plantsInBasket} />
                        <CommandResume totalPrice={totalPrice} sendOrder={sendOrder} />
                    </div>
                ) : (
                    <p className="p-3">Vous n&apos; avez pas encore de plantes dans votre panier</p>
                )}
            </main>
            <div className="hidden md:block w-full">
                <Footer />
            </div>
        </>

    )
}