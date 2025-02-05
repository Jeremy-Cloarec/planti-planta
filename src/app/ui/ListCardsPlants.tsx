"use client"
import CardPlant from "./CardPlant"
import { Plants } from "../lib/definitions"

interface ListCardsPlantsProps {
    plants: Plants[],
}

export function ListCardsPlants({ plants }: ListCardsPlantsProps) {

    function handleClick(title: string) {
        console.log(`Click on ${title}`)
    }

    const listPlants = plants.map(plant =>
        <li
            key={plant.id}
            onClick={() => handleClick(plant.title)}
        >
            <CardPlant
                title={plant.title}
                price={plant.price.toString()}
            />
        </li>
    )

    return (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {listPlants}
        </ul>
    )
}