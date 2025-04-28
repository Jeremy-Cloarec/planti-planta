"use client"
import { addPlantToBasket } from "../actions"

interface ButtonProps {
    text: string
    plantId: string
    userId: string|unknown
}

export default function Button({ text, plantId, userId }: ButtonProps) {

    const addPlant = (plantId: string) => {
        addPlantToBasket(plantId, userId)
    }

    return (
        <button
            className={`px-4 py-2 rounded-2xl transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-white`}
            onClick={() => addPlant(plantId)}
        >
            {text}
        </button>
    )
}