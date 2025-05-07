"use client"
// import { useState } from "react"
import { addPlantToBasket } from "../../actions"
import Button from "./Button"

interface ButtonProps {
    text: string
    plantId: string
    userId: string | unknown
}

export default function ButtonAddToBasket({ text, plantId, userId }: ButtonProps) {

    // const [error, setError] = useState<string | null>(null)
    // const [success, setSuccess] = useState<string | null>(null)

    const handleAddToBasket = async () => {
        const res: {success:boolean, message:string} | undefined= await addPlantToBasket(plantId, userId)
        console.log(res);
        

        // if (!res) {
        //     setError("Une erreur est survenue lors de l'ajout de la plante au panier.")
        //     return
        // }

        // if (res.success) {
        //     setSuccess(res.message)
        //     setError(null)
        // } else {
        //     setError(res.message)
        //     setSuccess(null)
        // }
    }

    return (
        <>
            <Button
                onClick={() => handleAddToBasket()}
            >
                {text}
            </Button>
        </>
    )
    }
