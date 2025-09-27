"use client"
import { use, useState } from "react"
import CardPlant from "./CardPlant"
import { Plant } from "../lib/definitions"
import PlantPopover from "./PlantPopover"

export default function ListCardsPlants({ promisePlants }: { promisePlants: Promise<Plant[]> }) {
    const [index, setIndex] = useState<number>(0)
    const plants = use(promisePlants)
    const findIndex = (plant: Plant) => {
        const nameIndex: number = plants.indexOf(plant)
        setIndex(nameIndex)
    }

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 w-full">
                    {plants.map((plant: Plant) => (
                        <li className="h-dvh border-2 snap-center snap-always" key={plant.id}>
                            <CardPlant
                                plant={plant}
                                findIndex={findIndex}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <PlantPopover
                index={index}
                setIndex={setIndex}
                plants={plants}
            />
        </>
    )
}
