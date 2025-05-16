'use client'
import { useQuery } from "@tanstack/react-query"
import { Footer } from "./Footer"
import ListCardsPlants from "./ListCardsPlants"
import Heading from "./Heading"
import Nav from "./nav/Nav"
import { User } from "../lib/definitions"

export default function HomeChild() {
    const { isPending, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            fetch('http://localhost:3000/api/user').then((res) => res.json())
    })

    if (isPending) return <p>Loading user info</p>

    if (error) return 'An error occured: ' + error.message

    const user: User = data

    return (
        <>
            {user && < Nav userId={user.id} />}
            <div className="max-w-4xl flex flex-col flex-1 w-full">
                <Heading title="Planti Planta" />
                <main className="flex-1">
                    <ListCardsPlants userId={user.id} />
                </main>
            </div>
            <Footer />
        </>
    )
}