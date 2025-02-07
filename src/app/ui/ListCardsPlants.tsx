"use client"
import { useStorePlant } from "../store/plantsStore"
import CardPlant from "./CardPlant"
import { Plant } from "../lib/definitions"
import { PlantsContext } from "../context/PlantsContext"
import { useContext } from "react"

export function ListCardsPlants() {
    const plants = useStorePlant((state) => state.plants)
    const fetchPlants = useStorePlant((state) => state.fetch)

    useEffect(() => {
        fetchPlants()
    }, [fetchPlants])

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
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
            {listPlants}
        </ul>
    )
}