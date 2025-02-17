"use client"
import CardPlant from "./CardPlant"
import { useContext, useEffect, useState } from "react"
import { Plant } from "@/app/lib/definitions"
import { StoreContext } from "@/app/context/StoreContext"
import { fetchPlants } from "@/app/lib/data"
import { PlantsContext } from "@/app/context/PlantsContext"
import { isNotInStock, isPlantOutOfStock, notMuchPlant } from "../functions/functions"

export function ListCardsPlants() {
    const { storePlants, setStorePlants } = useContext(StoreContext)
    const { plants, setPlants } = useContext(PlantsContext)
    const [isPopUp, setIsPopup] = useState(false)
    const [plantsClicked, setPlantsClicked] = useState<string[]>([])

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

    useEffect(() => {
        console.log(plantsClicked)
    }, [plantsClicked])

    const handleClick = (plant: Plant) => {
        const notInStock = isNotInStock(plants, plant.id, 0)
        if (notInStock) return
        popUpAddToCard(plant.title)
        updateStore(plant)
        updateStock(plant)
    }

    const updateStock = (plant: Plant) => {
        const nextStock = plants.map(p => p.id === plant.id ? {
            ...p,
            quantity: p.quantity - 1,
        } : p)

        setPlants(nextStock)
    }

    const updateStore = (plant: Plant) => {
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

    const popUpAddToCard = (title: string) => {
        setPlantsClicked(pc => [...pc, title]);
        setIsPopup(true)

        setTimeout(() => {
            setPlantsClicked(pc => pc.slice(1));
        }, 2000);
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
                isPlantOutOfStock={isPlantOutOfStock(plant.id, plants)}
                notMuchPlant={notMuchPlant(plant.id, plants)}
            />
        </li>
    )

    return (
        <>
            {isPopUp && <PopUp plantsClicked={plantsClicked} />}
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
                {listPlants}
            </ul>
        </>
    )
}

const PopUp = ({ plantsClicked }: { plantsClicked: string[] }) => {
    return <ul className="z-50 fixed bottom-10 left-0 w-full max-w-full text-center flex flex-col items-center gap-2">{
        plantsClicked.map((plantClicked, i) =>
            <li
                key={i}
                className="bg-greenLightOpacity w-fit py-1 px-3 rounded-lg"
            >
                {plantClicked} ajoutée au panier !
            </li>)
    }</ul>
}