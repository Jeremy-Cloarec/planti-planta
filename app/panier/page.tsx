"use client"
import Nav from "../ui/nav/Nav"
import Image from "next/image"
import {Plant} from "../lib/definitions"
import ButtonDeleteToBasket from "../ui/buttons/ButtonDeleteToBasket"

import {formatedUrl} from "../utils/utils"
import {cabinBold, cormorant} from "../ui/fonts"
import ButtonOrder from "../ui/buttons/ButtonOrder"
import Footer from "../ui/Footer"
import {useState} from "react";

const plants: Plant[] = [
    {
        id: "1",
        title: 'Dancing Plant 5',
        price: 60,
        quantity: 1,
        legend: '21 X 29, 7, Feutre, encre et stylo sur papier, 2025'
    },
    {
        id:"2",
        title: 'Dancing Plant 6',
        price: 60,
        quantity: 1,
        legend: '21 X 29, 7, Feutre, encre et stylo sur papier, 2025'
    }
]

export default function Basket() {
    const [plantsInBasket] = useState<Plant[]>(plants)
    const totalPrice = 120

    return (
        <>
            <Nav />
            <main className="w-full flex-1 pt-[72px] flex flex-col gap-4 max-w-(--breakpoint-lg)">
                <div className="flex items-center justify-between my-6 px-3 md:px-4">
                    <h1 className={`${cormorant.className} text-3xl`}>Votre panier</h1>
                     <p className={`${cabinBold.className} text-3xl`}>{totalPrice} €</p>
                </div>
                {plants.length > 0 ? (
                    <div className="flex flex-col gap-6 flex-1 justify-between
                    md:flex-row md:items-start md:px-3
                    ">
                        <ul className="flex flex-col gap-4 px-3 md:px4
                        md:flex-3 md:px-0 md:gap-6">
                            {plantsInBasket.map(plant => (
                                <li
                                    key={plant.id}
                                    className="flex gap-2"
                                >
                                    <Image
                                        alt="Miniature"
                                        width={130}
                                        height={165}
                                        src={`/plants/${formatedUrl(plant.title)}.png`}
                                        className="flex-2"
                                    />
                                    <div className="flex-3 flex flex-col gap-2">
                                        <h2 className={`${cormorant.className} text-xl`}>{plant.title}</h2>
                                        <p className={`${cabinBold.className}`}>{plant.price} €</p>
                                        <p className="text-sm">{plant.legend}</p>
                                        <ButtonDeleteToBasket
                                            text="Supprimer"
                                            plantId={plant.id}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="relative bg-slate-100 px-3 md:px-4 pt-3 pb-16 flex flex-col gap-3 
                        md:flex-2 md:sticky md:top-[72px] md:p-3">
                            <h2>Récapitulatif de la commande</h2>
                            <div className="flex items-center justify-between text-dark2">
                                <p>Sous total</p>
                                <p>{totalPrice - (totalPrice * 0.20)} €</p>
                            </div>
                            <div className="flex items-center justify-between text-dark2">
                                <p>Taxes</p>
                                <p>{totalPrice * 0.20} €</p>
                            </div>
                            <div className="flex items-center justify-between text-dark2">
                                <p>Frais de livraison</p>
                                <p className="text-lime-600">Gratuit</p>
                            </div>
                            <div
                                className={`flex items-center justify-between py-3 ${cabinBold.className}  border-t border-y-slate-400`}>
                                <p>TOTAL</p>
                                <p> {totalPrice} €</p>
                            </div>
                            <div className="p-3 fixed bottom-0 left-0 w-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]
                            md:relative md:p-0 md:shadow-none
                            ">
                                <ButtonOrder
                                    text="Passer la commande"
                                />
                            </div>
                        </div>

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