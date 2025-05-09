"use client"

import { useState } from "react"
import CardPlant from "./CardPlant"
import { PopUpAddedToCard } from "./PopUp"

interface ListCardsClientProps {
    plants: { id: string; title: string; price: number }[]
    userId: string
}

export default function ListCardsClient({ plants, userId }: ListCardsClientProps) {
    const [messagesSuccess, setMessagesSuccess] = useState<string[]>([])
    const [messagesError, setMessagesError] = useState<string[]>([])

    return (
        <div className="flex flex-col gap-4 items-center">
            <PopUpAddedToCard messages={messagesError} color="bg-redOpacity" />
            <PopUpAddedToCard messages={messagesSuccess} color="bg-greenLightOpacity" />

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
                {plants.map((plant) => (
                    <li key={plant.id}>
                        <CardPlant
                            title={plant.title}
                            price={plant.price}
                            plantId={plant.id}
                            userId={userId}
                            setMessagesSuccess={setMessagesSuccess}
                            setMessagesError={setMessagesError}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
