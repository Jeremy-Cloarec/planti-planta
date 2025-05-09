"use client"
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
    setResponses: (value: (prev: Response[]) => Response[]) => void
}

export default function CardPlant({
    title,
    price,
    plantId,
    userId,
    setResponses,
}: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`

    return (
        <div className="ring-1 ring-green p-3 bg-white rounded-3xl flex flex-col gap-4 h-full justify-between">
            <div className="relative bg-white flex items-center">
                <Image
                    src={url}
                    alt={alt}
                    width={212}
                    height={209}
                />
            </div>
            <h2 className="text-ellipsis overflow-hidden">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
            </div>
            <ButtonAddToBasket
                text="Ajouter au panier"
                plantId={plantId} userId={userId}
                setResponses={setResponses}
            />
        </div>
    )
}