"use client"
import { useState } from "react"
import Button from "./Button"
import { addPlantToBasket, checkIfPlantIsInBasket } from "@/app/actions/plants.actions"

interface Response {
    message: string
    success: boolean
}

interface ButtonProps {
    text: string
    plantId: string
    userId: string
    disabled: boolean
    addReponse: (res: Response) => void
}

export default function ButtonAddToBasket({ text, plantId, userId, disabled, addReponse }: ButtonProps) {
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const handleAddToBasket = async () => {
        const res = await addPlantToBasket(plantId, userId)

        if (!res) {
            addReponse({ message: "Un problème inconnu est survenu", success: false })
            return
        }

        if (!res.success) {
            addReponse({ message: res.message, success: false })
        }

        if (res.success) {
            setIsDisable(true)
            addReponse({ message: res.message, success: true })
        }

        const basket = await checkIfPlantIsInBasket(plantId, userId)
        if (basket) setIsDisable(true)
    }

    return (
        <>
            <Button onClick={() => handleAddToBasket()} disabled={isDisable || disabled}>
                {isDisable || disabled ? "Ajoutée au panier" : text}
            </Button>
        </>
    )
}
