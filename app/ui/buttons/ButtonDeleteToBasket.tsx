"use client"
import { deletePlantFromBasket } from "../../actions"
import Button from "./Button"

interface ButtonDeleteProps {
    text: string
    plantId: string
    userId: string | unknown
}

export default function ButtonDeleteToBasket({ text, plantId, userId }: ButtonDeleteProps) {

    return (
        <Button
            onClick={() => deletePlantFromBasket(plantId, userId)}
        >
            {text}
        </Button>
    )
}
