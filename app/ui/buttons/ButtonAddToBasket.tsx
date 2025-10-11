"use client"
import { usePopup } from "@/app/context/PopupContext";
import { usePlantsBasketDispatch } from "@/app/context/PlantsBasketContext";
import { Plant } from "@/app/lib/definitions";

interface ButtonProps {
    text: string
    plant: Plant
}

export default function ButtonAddToBasket({ text, plant }: ButtonProps) {
    const popup = usePopup()
    const dispatch = usePlantsBasketDispatch()

    const handleAddToBasket = () => {
        if (dispatch) {
            dispatch({ type: "add", plant })
        }

        popup({
            success: true,
            message: `${plant.title} ajoutée au panier !`,
            classStyle: "bg-white/85"
        })
    }

    return (
        <button onClick={handleAddToBasket} className="w-fit">
            {text}
        </button>
    )
}
