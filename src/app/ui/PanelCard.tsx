"use client"
import { useContext, useState } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { StoreContext } from "../context/StoreContext"
import CardPlantStore from "./CardPlantStore"
import { PlantsContext } from "../context/PlantsContext"
import { isNotInStock } from "../functions/functions"
import { isPlantOutOfStock } from "../functions/functions"
import Button from "./Button"

export function PanelCard() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const { plants, setPlants } = useContext(PlantsContext)
    const [discount, setDiscount] = useState("")
    const [isDiscount, setIsDiscount] = useState(false)
    const [message, setMessage] = useState('')
    const discountWorld = 'plantiplanta'
    const discountAmount = 5
    const styleMessage = isDiscount ? "text-sm mt-1 text-green " : "text-sm mt-1 text-red"

    const closePanel = () => {  
        setIsShop(false)
    }

    const calculateSubtotal = () => {
        const subTotal = storePlants.reduce((acc, curr) => acc + curr.price, 0)
        return subTotal
    }

    const calculateTotal = () => {
        const subTotal = calculateSubtotal()
        if (!isDiscount) return subTotal

        return subTotal - (subTotal * discountAmount) / 100
    }

    const handleIsDiscount = async () => {
        if (discountWorld !== discount) {
            setMessage("Le bon de reduction n'est pas correct")
            setIsDiscount(false)
        } else {
            setMessage("Le bon de réduction est correct")
            setIsDiscount(true)
        }
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
        <div className="z-30 panel-card fixed top-0 right-0 w-full h-dvh bg-[#1d1e1b30] flex justify-end" onClick={closePanel}>
            <div className="w-full md:w-[500px] bg-white min-h-dvh p-3 flex flex-col gap-8 overflow-y-auto h-full" onClick={e => e.stopPropagation()}>
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
                <div className="flex flex-1 flex-col justify-between gap-8">
                    {storePlants.length > 0 ? (
                        <>
                            <ul className="flex flex-col gap-6">
                                {listPlantsStore}
                            </ul>
                            <div>
                                <label className="flex flex-col gap-2">
                                    Avez-vous un bon de réduction ?
                                    <div className="flex gap-2 flex-wrap">
                                        <input
                                            name="reduction"
                                            className="ring-1 ring-green rounded-md py-2 px-3 flex-1 focus-visible:outline-green"
                                            placeholder="Entrez votre bon de réduction"
                                            value={discount}
                                            onChange={e => setDiscount(e.target.value)}
                                        />
                                        <Button text="Appliquer" handleClick={handleIsDiscount} />
                                    </div>
                                </label>
                                <p className={styleMessage} >{message}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Sous total : {calculateSubtotal()}€</p>
                                {isDiscount &&
                                    <p className="text-red"> Réduction : - {(calculateSubtotal() * 5 / 100)}€</p>
                                }
                                <p className="py-8 text-2xl border-t-2">Total : {calculateTotal()}€</p>
                                <Button text="Passer la commande" handleClick={() => alert('Commande passée !')} />
                            </div>
                        </>
                    ) : (<p>Vous n&apos;avez pas encore de produit dans votre panier</p>)}
                </div>
            </div>
        </div>
    )
}