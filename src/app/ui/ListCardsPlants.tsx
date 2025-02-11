"use client"
import CardPlant from "./CardPlant"
import { useContext, useEffect } from "react"
import { Plant } from "@/app/lib/definitions"
import { StoreContext } from "@/app/context/StoreContext"
import { fetchPlants } from "@/app/lib/data"
import { PlantsContext } from "@/app/context/PlantsContext"

export function ListCardsPlants() {
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const { plants, setPlants } = useContext(PlantsContext)

    useEffect(() => {
        async function getPlants() {
            const fetchedPlants = await fetchPlants()
            setPlants(fetchedPlants)
        }
        getPlants()
    }, [setPlants])

    useEffect(() => {
        console.log(storePlants);
    }, [storePlants])

    function handleClick(e: React.FormEvent, plant: Plant) {
        e.preventDefault()
        const plantExists = storePlants.find(p => p.id === plant.id)
        if (!plantExists) {
            return setStorePlants([...storePlants, { ...plant, quantity: 1 }])
        }

        const nextQuantity = storePlants.map(p =>
            p.id === plant.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        return setStorePlants(nextQuantity)
    }

    const listPlants = plants.map(plant =>
        <li
            key={plant.id}
            onClick={(e) => { handleClick(e, plant) }}
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