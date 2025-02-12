"use client"
import { useContext, useEffect } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { StoreContext } from "../context/StoreContext"
import CardPlantStore from "./CardPlantStore"

export function PanelCard() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants, setStorePlants } = useContext(StoreContext)

    const handleClick = () => {
        setIsShop(false)
    }

    const addOnePlant = (id: number) => {
        const newPlant = storePlants.map(p => {

            const unitPrice = p.price / p.quantity
            return p.id === id ?
                {
                    ...p,
                    quantity: p.quantity + 1,
                    price: p.price + unitPrice
                } : p
        })
        return setStorePlants(newPlant)
    }

    const removeOnePlant = (id: number) => {
        const removePlant = storePlants.map(p => {
            const unitPrice = p.price / p.quantity
            return p.id === id ?
                {
                    ...p,
                    quantity: p.quantity - 1,
                    price: p.price - unitPrice

                } : p
        })
        return setStorePlants(removePlant)
    }

    const removeAllPlants = (id: number) => {
        const nextStorePlants = storePlants.filter(p => p.id !== id)

        return setStorePlants(nextStorePlants)
    }

    const listPlantsStore = storePlants.map(plant => {
        return <li key={plant.id}>{
            <CardPlantStore
                id={plant.id}
                title={plant.title}
                price={plant.price}
                quantity={plant.quantity}
                addOnePlant={addOnePlant}
                removeOnePlant={removeOnePlant}
                removeAllPlants={removeAllPlants}
            />
        } </li>
    })

    useEffect(() => {
        console.log(storePlants);

    }, [storePlants])

    return (
        <div className="panel-card absolute top-0 right-0 w-full h-dvh bg-black/5 flex justify-end" onClick={handleClick}>
            <div className="w-full md:w-4/5 lg:w-2/5 bg-white h-dvh p-3 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
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
                </div>
                <div>
                    {storePlants.length > 0 ? (
                        <ul className="flex flex-col gap-4">
                            {listPlantsStore}
                        </ul>
                    ) : (<p>Vous n avez pas encore de produit dans votre panier</p>)}

                </div>
            </div>
        </div>
    )
}