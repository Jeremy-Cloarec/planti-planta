"use client"
import { useContext, useEffect, useReducer, useState } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { StoreContext } from "../context/StoreContext"
import CardPlantStore from "./CardPlantStore"
import { PlantsContext } from "../context/PlantsContext"
import { isNotInStock } from "../functions/functions"
import { isPlantOutOfStock } from "../functions/functions"
import { Discount } from "../lib/definitions"
import Button from "./Button"
import { updateStockStore } from "../lib/actions"
import plantsReducer from "../functions/plantsReducer"

export function PanelCard({ setIsOrder }: { setIsOrder: (isOrder: boolean) => void }) {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const { plants, setPlants } = useContext(PlantsContext)
    const [discount, setDiscount] = useState("")
    const [isDiscount, setIsDiscount] = useState(false)
    const [message, setMessage] = useState('')
    const [state, dispatch] = useReducer(plantsReducer, { storePlants, plants })
    const discountWorld = 'plantiplanta'
    const discountAmount = 5
    const styleMessage = isDiscount ? "text-sm mt-1 text-green " : "text-sm mt-1 text-red"

    const closePanel = () => {
        setIsShop(false)
    }

    useEffect(() => {
        const savedDiscount = localStorage.getItem("discount")
        if (savedDiscount) {
            console.log(savedDiscount);
            const discount: Discount = JSON.parse(savedDiscount)
            setDiscount(discount.discountInput)
            setIsDiscount(discount.isDiscount)
            setMessage(discount.message)
        }
    }, [])

    const calculateSubtotal = () => {
        const subTotal = storePlants.reduce((acc, curr) => acc + curr.price, 0)
        return subTotal
    }

    const calculateTotal = () => {
        const subTotal = calculateSubtotal()
        if (!isDiscount) return subTotal

        return subTotal - (subTotal * discountAmount) / 100
    }

    const handleIsDiscount = () => {
        const isValid = discount === discountWorld
        const message = isValid ? "La réduction a bien été prise en compte" : "Le bon de réduction n'est pas correct"
        setMessage(message)
        setIsDiscount(() => {
            const newIsDiscount = isValid
            updateLocalStorage(newIsDiscount, discount, message)
            return newIsDiscount
        })
    }

    const updateLocalStorage = (isDiscountValue: boolean, discountValue: string, messageValue: string) => {
        localStorage.setItem("discount", JSON.stringify({
            isDiscount: isDiscountValue,
            discountInput: discountValue,
            message: messageValue
        }))
    }

    const clickOnPlus = (id: number) => {
        const notInStock = isNotInStock(state.plants, id, 0)
        if (notInStock) return

        dispatch({ type: "addOnePlant", id, operation: q => q + 1 })
        dispatch({ type: "updateStock", id, operation: q => q - 1 })
    }

    const clickOnMinus = (id: number) => {
        dispatch({ type: "removeOnePlant", id, operation: q => q - 1 })
        dispatch({ type: "updateStock", id, operation: q => q + 1 })
    }

    const clickOnTrash = (id: number) => {
        const quantityToMoveInStock = storePlants.map(p => p.quantity)
        dispatch({ type: "updateStock", id, operation: q => q + quantityToMoveInStock[0]})
        dispatch({type: "removeAllPlants", id})
    }

    const listPlantsStore = state.storePlants.map(plant => {
        return <li key={plant.id}>{
            <CardPlantStore
                plant={plant}
                addOnePlant={clickOnPlus}
                removeOnePlant={clickOnMinus}
                removeAllPlants={clickOnTrash}
                isPlantOutOfStock={isPlantOutOfStock(plant.id, state.plants)}
            />
        } </li>
    })

    const validateOrder = async () => {
        await updateStockStore(storePlants)
        setStorePlants([])
        localStorage.clear()
        setIsOrder(true)
        setIsShop(false)
    }

    return (
        <div className="z-30 panel-card fixed top-0 right-0 w-full h-full bg-[#1d1e1b30] flex justify-end" onClick={closePanel}>
            <div className="w-full md:w-[500px] bg-white p-3 flex flex-col gap-8 overflow-y-auto h-full" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <h2 className="font-jaldiBold font-bold">Mon panier</h2>
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

                                {isDiscount &&
                                    <>
                                        <p>Sous total : {calculateSubtotal()}€</p>
                                        <p className="text-red"> Réduction : - {(calculateSubtotal() * 5 / 100)}€</p>
                                    </>
                                }
                                <p className="py-8 text-2xl border-t-2">Total : {calculateTotal()}€</p>
                                <Button text="Passer la commande" handleClick={validateOrder} />
                            </div>
                        </>
                    ) : (<p>Vous n&apos;avez pas encore de produit dans votre panier</p>)}
                </div>
            </div>
        </div>
    )
}