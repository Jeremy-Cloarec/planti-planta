"use client"
import { useState } from "react"
import { addPlantToBasket, checkIfPlantIsInBasket } from "../../actions"
import Button from "./Button"

interface Response {
    message: string
    success: boolean
}

interface ButtonProps {
    text: string
    plantId: string
    userId: string
    setResponses: (value: (prev: Response[]) => Response[]) => void
}

export default function ButtonAddToBasket({ text, plantId, userId, setResponses }: ButtonProps) {
    const [isDisable, setIsDisable] = useState<boolean>(false)

    const handleAddToBasket = async () => {
        const res = await addPlantToBasket(plantId, userId)
        console.log(res)

        if (!res) {
            setResponses(prev => [...prev, { message: "Un problème inconnu est survenu", success: false }])
            return
        }

        if (!res.success) {
            setResponses(prev => [...prev, { message: res.message, success: false }])
        }

        if (res.success) {
            setIsDisable(true)
            setResponses(prev => [...prev, { message: res.message, success: true }])
        }

        const basket = await checkIfPlantIsInBasket(plantId, userId)
        if (basket.length > 0) setIsDisable(true)
    }

    return (
        <>
            <Button onClick={() => handleAddToBasket()} disabled={isDisable}>
                {isDisable ? "Ajoutée au panier" : text}
            </Button>
        </>
    )
}
