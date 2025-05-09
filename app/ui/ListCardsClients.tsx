"use client"
import { useEffect, useState } from "react"
import CardPlant from "./CardPlant"
import { PopUpAddedToCard } from "./PopUp"
import { v4 as uuidv4 } from 'uuid'


interface ListCardsClientProps {
    plants: { id: string; title: string; price: number }[]
    userId: string
}

interface Response {
    message: string
    success: boolean
}

export default function ListCardsClient({ plants, userId }: ListCardsClientProps) {
    const [responses, setResponses] = useState<Response[]>([])

    useEffect(() => {
        setTimeout(() => {
            setResponses(prev => prev.filter(res => res !== responses[0]))
        }, 2000)
    }, [responses])

    return (
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
                {plants.map((plant) => (
                    <li key={plant.id}>
                        <CardPlant
                            title={plant.title}
                            price={plant.price}
                            plantId={plant.id}
                            userId={userId}
                            setResponses={setResponses}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
