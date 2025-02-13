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

    const handleClick = (plant: Plant) => {
        updateStore(plant)
        updateStock(plant)
    }

    const updateStock =(plant: Plant) => {
        const nextStock = plants.map(p => p.id === plant.id ? {
            ...p,
            quantity: p.quantity - 1,
        } : p)

        setPlants(nextStock)
    }

    const updateStore =(plant: Plant) => {
        const plantExists = storePlants.find(p => p.id === plant.id)
        if (!plantExists) {
            return setStorePlants([...storePlants, { ...plant, quantity: 1 }])
        }

        const nextStore = storePlants.map(p =>
            p.id === plant.id ?
                {
                    ...p,
                    quantity: p.quantity + 1,
                    price: p.price + plant.price
                } : p
        )

        setStorePlants(nextStore)
    }

    const listPlants = plants.map(plant =>
        <li
            key={plant.id}
        >
            <CardPlant
                title={plant.title}
                price={plant.price}
                quantity={plant.quantity}
                handleClick={() => handleClick(plant)}
            />
        </li>
    )

    return (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
            {listPlants}
        </ul>
    )
}