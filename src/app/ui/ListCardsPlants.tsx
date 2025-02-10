"use client"
import CardPlant from "./CardPlant"
import { PlantsContext } from "../context/PlantsContext"
import { useContext, useEffect } from "react"
import { Plant } from "../lib/definitions"
import { StoreContext } from "../context/StoreContext"

export function ListCardsPlants() {
    const plants = useContext(PlantsContext)
    const {storePlants, setStorePlants} = useContext(StoreContext)


    function handleClick(plant: Plant) {    
        console.log(`Click on ${plant.title}`)
        setStorePlants([
            ...storePlants,
            plant
        ])
    }

    useEffect(() => {
        console.log(storePlants);
    }, [storePlants])


    const listPlants = plants.map(plant =>
        <li
            key={plant.id}
            onClick={() => handleClick(plant)}
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