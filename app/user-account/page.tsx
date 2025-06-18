"use client"

import { redirect } from "next/navigation"
import Nav from "../ui/nav/Nav"
import { Footer } from "../ui/Footer"
import ButtonLogout from "../ui/buttons/ButtonLogout"
import { useQuery } from "@tanstack/react-query"
import LoadingPlants from "../ui/skeleton/loading"
import { cormorant } from "../ui/fonts"

export default function UserAccount() {
    const { data: user, isPending: isUserLoading, error: userError } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch("/api/user").then((res) => res.json()),
    })

    const {
        data: countBasket,
        isPending: isCountLoading,
        error: countError,
    } = useQuery({
        queryKey: ['countBasket', user?.id],
        queryFn: () =>
            fetch(`/api/basket/count_basket?userId=${user.id}`).then((res) => res.json()),
        enabled: !!user?.id,
    })

    if (isUserLoading || isCountLoading) return <LoadingPlants />
    if (userError || countError) return <div>Erreur de chargement utilisateur (Basket) : {userError?.message}</div>
    if (!user) return <div>Utilisateur non connecté</div>

    if (!user) {
        redirect("/api/logout")
    }

    return (
        <>
            <Nav numberOfPlants={countBasket ?? "0"} />
            <main className="w-full flex-1 pt-[72px]">
                <h1 className={`${cormorant.className} text-3xl`}>Bonjour {user.name}</h1>
                <h2>Informations personnelles</h2>
                <h2>Commandes</h2>
                <ButtonLogout />
            </main>
            <Footer />
        </>
    )
}
