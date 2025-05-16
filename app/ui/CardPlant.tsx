"use client"
import { useQuery } from "@tanstack/react-query"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"
import { Plant } from "../lib/definitions"

interface Response {
    message: string
    success: boolean
}

interface CardPlantProps {
    plant: Plant
    userId: string
    addReponse: (newResponse: Response) => void
}

export default function CardPlant({
    plant,
    userId,
    addReponse,
}: CardPlantProps) {
    const alt: string = `Photographie de la plante ${plant.title}`
    const url = `/plants/${plant.title.toLowerCase()}.png`

    const { data } = useQuery({
        queryKey: ["isInBasket", plant.id, userId],
        queryFn: async () => {
            const res = await fetch(`/api/basket?plantId=${plant.id}&userId=${userId}`)
            if (!res.ok) throw new Error("Erreur API panier")
            const json = await res.json()
            return json.quantity > 0
        },
    })

    const alreadyInBasket = data === true
    
    return (
        <div className="ring-1 ring-green p-3 bg-white rounded-3xl flex flex-col gap-4 h-full justify-between">
            <div className="relative bg-white flex items-center">
                <Image
                    src={url}
                    alt={alt}
                    width={212}
                    height={209}
                    className="w-full rounded-2xl"
                />
            </div>
            <h2 className="text-ellipsis overflow-hidden">{plant.title}</h2>
            <div className="flex items-center justify-between">
                <p>{plant.price}€</p>
            </div>
            <ButtonAddToBasket
                text="Ajouter au panier"
                plantId={plant.id} 
                userId={userId}
                addReponse={addReponse}
                disabled={alreadyInBasket}
            />
        </div>
    )
}