"use client"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"
import {Plant} from "../lib/definitions"
import {cabinBold, cabinCondensed, cormorant} from "./fonts"
import {formatedUrl} from "../utils/utils"

interface CardPlantProps {
    plant: Plant
    findIndex: (plant: Plant) => void
}

export default function CardPlant({
                                      plant,
                                      findIndex
                                  }: CardPlantProps) {
    const alt: string = `Photographie du desin ${plant.title}`
    const url = `/plants/${formatedUrl(plant.title)}.png`

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
                plantTitle={plant.title}

            />
        </div>
    )
}