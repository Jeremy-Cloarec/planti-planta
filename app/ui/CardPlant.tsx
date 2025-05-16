"use client"
import { useQuery } from "@tanstack/react-query"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"

interface Response {
    message: string
    success: boolean
}

interface CardPlantProps {
    title: string
    price: number
    plantId: string
    userId: string
    addReponse: (newResponse: Response) => void
}

export default function CardPlant({
    title,
    price,
    plantId,
    userId,
    addReponse,
}: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`

    const { data, isLoading } = useQuery({
        queryKey: ["isInBasket", plantId, userId],
        queryFn: async () => {
            const res = await fetch(`/api/basket?plantId=${plantId}&userId=${userId}`)
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
            <h2 className="text-ellipsis overflow-hidden">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
            </div>
            <ButtonAddToBasket
                text="Ajouter au panier"
                plantId={plantId} userId={userId}
                addReponse={addReponse}
                disabled={alreadyInBasket}
            />
        </div>
    )
}