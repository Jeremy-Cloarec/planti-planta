"use client"
export const dynamic = 'force-dynamic'

import { redirect } from "next/navigation"
import Nav from "../ui/nav/Nav"
import { Footer } from "../ui/Footer"
import ButtonLogout from "../ui/buttons/ButtonLogout"
import { useQuery } from "@tanstack/react-query"
import LoadingPlants from "../ui/skeleton/loading"

export default function UserAccount() {
    const { data, isPending, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch("/api/user").then((res) => res.json()),
    })

    const user = data

    const countNav = useQuery({
        queryKey: ['countBasket', user?.id],
        queryFn: () =>
            fetch(`/api/basket/count_basket?userId=${user.id}`).then((res) => res.json()),
        enabled: !!user?.id
    })

    if (isPending) return <LoadingPlants />
    if (error) return <div>Erreur de chargement utilisateur  pour count basket{error.message}</div>

    if (!user) {
        redirect("/api/logout")
    }

    return (
        <>
            <Nav numberOfPlants={countNav.data} />
            <main className="w-full flex-1 pt-[72px]">
                <h1>Bonjour {user.name}</h1>
                <h2>Informations personnelles</h2>
                <h2>Commandes</h2>
                <ButtonLogout />
            </main>
            <Footer />
        </>
    )
}
