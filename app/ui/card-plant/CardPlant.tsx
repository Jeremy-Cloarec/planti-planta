"use client"
import Image from "next/image"
import { Plant } from "../../lib/definitions"
import { formatedUrl } from "../../utils/utils"
import InfosCardPlant from "./InfosCardPlant"

interface CardPlantProps {
    plants: Plant[]
    findIndex: (plant: Plant) => void
}

export default function CardPlant({
    plants,
    findIndex
}: CardPlantProps) {
    return (
        <ul className="flex-1">
            {plants.map((plant: Plant) => (
                <li
                    className="h-dvh snap-center snap-always py-3 
                    sm:py-4"
                    key={plant.id}>
                    <div className="bg-white flex flex-col gap-4 h-full justify-center
                    sm:flex-row sm:items-center">
                        <div className="bg-white flex items-center justify-center 
                        sm:order-2 sm:h-full">
                            <button
                                onClick={() => findIndex(plant)}
                                className="flex h-full max-h-full w-3/4 md:w-5/6"
                            >
                                <Image
                                    src={`/plants/${formatedUrl(plant.title)}.png`}
                                    alt={`Photographie du desin ${plant.title}`}
                                    width={2000}
                                    height={209}
                                    className="sm:h-full object-contain w-full"
                                />
                            </button>
                        </div>
                        <InfosCardPlant plant={plant} />
                    </div>
                </li>))}
        </ul>
    )
}