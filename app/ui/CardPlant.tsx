"use client"
import ButtonAddToBasket from "./buttons/ButtonAddToBasket"
import Image from "next/image"
import { Plant } from "../lib/definitions"
import { cabinBold} from "./fonts"
import { formatedUrl } from "../utils/utils"

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
        <div className="flex flex-col gap-4">
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
                        width={2000}
                        height={209}
                        className="w-full"
                    />
                </button>
            </div>
            <div className="flex flex-col items-start px-3 gap-3">
                <h2 className={`${cabinBold.className}`}>{plant.title}</h2>
                <ButtonAddToBasket
                    text="+ Ajouter"
                    plant={plant}
                />
            </div>

        </div>
    )
}