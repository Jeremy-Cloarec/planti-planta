"use client"
import {useState} from "react"
import CardPlant from "./CardPlant"
import {PopUpAddedToCard} from "./PopUp"
import {v4 as uuidv4} from 'uuid'
import {Plant} from "../lib/definitions"
import {useQuery} from "@tanstack/react-query"
import LoadingPlants from "./skeleton/loading"
import PlantPopover from "./PlantPopover"

interface Response {
    message: string
    success: boolean
}

export default function ListCardsPlants({userId}: { userId: string }) {
    const [responses, setResponses] = useState<Response[]>([])
    const [index, setIndex] = useState<number>(0)

    function addResponse(newResponse: Response) {
        setResponses((prev) => [...prev, newResponse])

        setTimeout(() => {
            setResponses((prev) => prev.filter(r => r !== newResponse))
        }, 2000)
    }

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
                <ul className="z-20 fixed bottom-10 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">
                    {responses.map((response) =>
                        <PopUpAddedToCard
                            key={uuidv4()}
                            message={response.message}
                            isSucces={response.success}
                        />
                    )}
                </ul>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
                    {data.map((plant: Plant) => (
                        <li key={plant.id}>
                            <CardPlant
                                plant={plant}
                                findIndex={findIndex}
                                userId={userId}
                                addReponse={addResponse}
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
