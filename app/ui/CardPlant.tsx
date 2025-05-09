"use client"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"
import ButtonNoStock from "./buttons/ButtonNoStock"
// import { isPlantInStock } from "../actions"

interface CardPlantProps {
    title: string
    price: number
    plantId: string
    userId: string
    setMessagesSuccess: (value: (prev: string[]) => string[]) => void
    setMessagesError: (value: (prev: string[]) => string[]) => void
}

export default function CardPlant({
    title,
    price,
    plantId,
    userId,
    setMessagesSuccess,
    setMessagesError
}: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`
    const isStock = true /*  await isPlantInStock(plantId) */
    const imgIsStock = isStock ? "rounded-2xl w-full" : "rounded-2xl w-full opacity-50"

    return (
        <div className="ring-1 ring-green p-3 bg-white rounded-3xl flex flex-col gap-4 h-full justify-between">
            <div className="relative bg-white flex items-center">
                {!isStock && <p className="text-black z-10 absolute text-center w-full">Victime de son succès 🦋</p>}
                <Image
                    src={url}
                    alt={alt}
                    className={imgIsStock}
                    width={212}
                    height={209}
                />
            </div>
            <h2 className="text-ellipsis overflow-hidden">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
            </div>
            {isStock ?
                (<ButtonAddToBasket
                    text="Ajouter au panier"
                    plantId={plantId} userId={userId}
                    setMessagesSuccess={setMessagesSuccess}
                    setMessagesError={setMessagesError}
                />
                ) :
                (<ButtonNoStock text="Bientôt de retour !" />)}
        </div>
    )
}