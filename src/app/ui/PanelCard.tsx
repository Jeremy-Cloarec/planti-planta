"use client"
import { useContext } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { StoreContext } from "../context/StoreContext"
import CardPlantStore from "./CardPlantStore"
import { PlantsContext } from "../context/PlantsContext"
import { isNotInStock } from "../functions/functions"
import { isPlantOutOfStock } from "../functions/functions"

export function PanelCard({getScrollPosition} : {getScrollPosition: () => void}) {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const { plants, setPlants } = useContext(PlantsContext)

    const closePanel = () => {
        setIsShop(false)
        getScrollPosition()
    }

    const clickOnPlus = (id: number) => {
        // Return if the stock === 0
        const notInStock = isNotInStock(plants, id, 0)
        if (notInStock) {
            return
        }

        addOnePlant(id)
        updateStock(id, q => q - 1)
    }

    const clickOnMinus = (id: number) => {
        removeOnePlant(id)
        updateStock(id, q => q + 1)
    }

    const clickOnTrash = (id: number) => {
        removeAllPlants(id)
    }

    const updateStock = (id: number, operation: (quantity: number) => number) => {
        const nextStock = plants.map(p =>
            p.id === id ? {
                ...p,
                quantity: operation(p.quantity),
            } : p)

        setPlants(nextStock)
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
        setStorePlants(newPlant)
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
        setStorePlants(removePlant)
    }

    const removeAllPlants = (id: number) => {
        const quantityToMoveInStock = storePlants.map(p => p.quantity)
        updateStock(id, q => q + quantityToMoveInStock[0])
        const nextStorePlants = storePlants.filter(p => p.id !== id)
        setStorePlants(nextStorePlants)
    }

    const listPlantsStore = storePlants.map(plant => {
        return <li key={plant.id}>{
            <CardPlantStore
                plant={plant}
                addOnePlant={clickOnPlus}
                removeOnePlant={clickOnMinus}
                removeAllPlants={clickOnTrash}
                isPlantOutOfStock={isPlantOutOfStock(plant.id, plants)}
            />
        } </li>
    })

    return (
        <div className="z-30 panel-card absolute top-0 right-0 w-full h-dvh bg-black/5 flex justify-end" onClick={closePanel}>
            <div className="w-full md:w-4/5 lg:w-2/5 bg-white h-dvh p-3 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <h2 className="font-jaldiBold">Mon panier</h2>
                    <button
                        name="Fermer le menu"
                        className="cursor-pointer hover:bg-slate-200 rounded-md transition duration-300"
                        onClick={closePanel}
                    >
                        <XMarkIcon
                            width={24}
                        />
                    </button>
                </div>
                <div>
                    {storePlants.length > 0 ? (
                        <ul className="flex flex-col gap-6">
                            {listPlantsStore}
                        </ul>
                    ) : (<p>Vous n avez pas encore de produit dans votre panier</p>)}
                </div>
            </div>
        </div>
    )
}