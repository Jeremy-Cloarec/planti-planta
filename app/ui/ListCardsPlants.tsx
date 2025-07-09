"use client"
import {useState} from "react"
import CardPlant from "./CardPlant"
import {Plant} from "../lib/definitions"
import {useQuery} from "@tanstack/react-query"
import LoadingPlants from "./skeleton/loading"
import PlantPopover from "./PlantPopover"

export default function ListCardsPlants() {
    const [index, setIndex] = useState<number>(0)

    const {isPending, error, data} = useQuery({
        queryKey: ['plants'],
        queryFn: () =>
            fetch("/api/plants").then((res) => res.json())
    })

    if (isPending) return <LoadingPlants/>

    if (error) return 'An error occured: ' + error.message

    const findIndex = (plant: Plant) => {
        const nameIndex: number = data.indexOf(plant)
        setIndex(nameIndex)
    }

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
                    {data.map((plant: Plant) => (
                        <li key={plant.id}>
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
                plants={data}
            />
        </>
    )
}
