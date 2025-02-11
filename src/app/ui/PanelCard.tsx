"use client"
import { useContext, useEffect } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { StoreContext } from "../context/StoreContext"

export function PanelCard() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants } = useContext(StoreContext)

    const handleClick = () => {
        setIsShop(false)
    }

    const listPlantsStore = storePlants.map(plant => {
        return <li key={plant.id}>{plant.title} </li>
    })

    useEffect(() => {
        console.log(storePlants);
    }, [storePlants])

    return (
        <div className="panel-card absolute top-0 right-0 w-full h-dvh bg-black/5 flex justify-end" onClick={handleClick}>
            <div className="w-4/5 bg-white h-dvh p-3" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between">
                    <h2 className="font-jaldiBold">Mon panier</h2>
                    <button
                        name="Fermer le menu"
                        className="cursor-pointer hover:bg-slate-200 rounded-md transition duration-300"
                        onClick={handleClick}
                    >
                        <XMarkIcon
                            width={24}
                        />
                    </button>
                </header>
                <div>
                    {storePlants.length > 0 ? (
                        <ul>
                            {listPlantsStore}
                        </ul>
                    ) : (<p>Vous n'avez pas encore de produit dans votre panier</p>)}

                </div>
            </div>
        </div>
    )
}