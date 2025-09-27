"use client"
import { use, useState } from "react"
import CardPlant from "./card-plant/CardPlant"
import { Plant } from "../lib/definitions"
import MiniaturesCards from "./card-plant/MiniaturesCards"

export default function ListCardsPlants({ promisePlants }: { promisePlants: Promise<Plant[]> }) {
    const [index, setIndex] = useState<number>(0)
    const plants = use(promisePlants)
    const findIndex = (plant: Plant) => {
        const nameIndex: number = plants.indexOf(plant)
        setIndex(nameIndex)
    }
    
    console.log(index);
    

    return (
        <>
            <div className="flex flex-col gap-6 items-start relative
            min-[370px]:flex-row w-full">
                <CardPlant
                    plants={plants}
                    findIndex={findIndex}
                />
                <MiniaturesCards plants={plants} />
            </div>
        </>
    )
}