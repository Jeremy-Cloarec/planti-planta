"use client"
import CardPlant from "./CardPlant"
import { useContext, useEffect, useState } from "react"
import { Plant } from "../lib/definitions"
import { StoreContext } from "../context/StoreContext"
import { fetchPlants } from "../lib/data"

export function ListCardsPlants() {
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        async function getPlants() {
            const fetchedPlants = await fetchPlants();
            setPlants(fetchedPlants);
        }
        getPlants();
    }, []);

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