"use client"
import Nav from "../ui/nav/Nav"
import {cabinBold, cormorant} from "../ui/fonts"
import Footer from "../ui/Footer"
import {usePlantsBasket} from "@/app/context/PlantsBasketContext";
import CardPlantBasket from "@/app/ui/basket/CardPlantBasket";
import CommandResume from "@/app/ui/basket/CommandResume";

export default function Basket() {
    const plantsInBasket = usePlantsBasket()
    const totalPrice = 120

    return (
        <>
            <Nav/>
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
                        <CommandResume totalPrice={ totalPrice} />
                    </div>
                ) : (
                    <p className="p-3">Vous n&apos; avez pas encore de plantes dans votre panier</p>
                )}
            </main>
            <div className="hidden md:block w-full">
                <Footer/>
            </div>
        </>

    )
}