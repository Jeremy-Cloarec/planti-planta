"use client"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"
import {Plant} from "../lib/definitions"
import {cabinBold, cabinCondensed, cormorant} from "./fonts"
import {formatedUrl} from "../utils/utils"
import {useQuery} from "@tanstack/react-query"

interface CardPlantProps {
    plant: Plant
    userId: string
    addReponse: (newResponse: Response) => void
    findIndex: (plant: Plant) => void
}

export default function CardPlant({
                                      plant,
                                      userId,
                                      addReponse,
                                      findIndex
                                  }: CardPlantProps) {
    const alt: string = `Photographie du desin ${plant.title}`
    const url = `/plants/${formatedUrl(plant.title)}.png`

     const { data } = useQuery({
     queryKey: ["isInBasket", plant.id, userId],
     queryFn: async () => {
     const res = await fetch(`/api/basket/is_in_basket?plantId=${plant.id}&userId=${userId}`)
     if (!res.ok) throw new Error("Erreur API panier")
     const json = await res.json()
     return json.quantity > 0
     },
     })

     const alreadyInBasket = data === true

    return (
        <div className=" bg-white flex flex-col gap-4 justify-between">
            <div className="relative bg-white flex items-center">
                <button
                    popoverTarget="popover_plant"
                    popoverTargetAction="show"
                    className="w-full"
                    onClick={() => findIndex(plant)}
                >
                    <Image
                        src={url}
                        alt={alt}
                        width={212}
                        height={209}
                        className="w-full"
                    />
                </button>
            </div>
            <h2 className={`${cormorant.className} text-ellipsis overflow-hidden text-2xl md:text-3xl lg:text-4xl`}>{plant.title}</h2>
            <p className={`text-3xl ${cabinBold.className} text-violet`}>{plant.price}€</p>
            <p className={`${cabinCondensed.className} text-sm md:text-base`}>{plant.legend}</p>
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