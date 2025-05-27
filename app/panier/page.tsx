"use client"
import Nav from "../ui/nav/Nav"
import { Footer } from "../ui/Footer"
import Image from "next/image"
import { Plant, User } from "../lib/definitions"
import ButtonDeleteToBasket from "../ui/buttons/ButtonDeleteToBasket"
import { useQuery } from "@tanstack/react-query"
import LoadingPlants from "../ui/skeleton/loading"
import { formatedUrl } from "../utils/utils"

export default function Basket() {
    const userQuery = useQuery<User>({
        queryKey: ['user'],
        queryFn: () =>
            fetch("/api/user").then((res) => res.json()),
        staleTime: 1000 * 60 * 5,
    })

    const userId = userQuery.data?.id

    const plantsData = useQuery({
        queryKey: ['plantsInBasket'],
        queryFn: () =>
            fetch(`/api/basket/all_plants_in_basket?userId=${userId}`).then((res) => res.json())
    })

    const countNav = useQuery({
        queryKey: ['countBasket', userId],
        queryFn: () =>
            fetch(`/api/basket/count_basket?userId=${userId}`).then((res) => res.json()),
        enabled: !!userId
    })

    if (plantsData.isPending) return <LoadingPlants />

    if (plantsData.error) return 'An error occured: ' + plantsData.error.message

    const plants: Plant[] = plantsData.data

    return (
        <>
            <h1>Test Panier</h1>
            <Nav numberOfPlants={countNav.data } />
            <main className="w-full flex-1 pt-[72px] flex flex-col gap-4">
                <h1 className="text-center bg-greenLightOpacity rounded-lg py-6">Votre panier</h1>
                <div>
                    {plants.length > 0 ? (
                        <ul className="flex flex-col gap-4">
                            {plants.map(plant => (
                                <li
                                    key={plant.id}
                                    className="flex gap-4"
                                >
                                    <Image
                                        alt="Miniature"
                                        width={130}
                                        height={165}
                                        src={`/plants/${formatedUrl(plant.title)}.png`}
                                    />
                                    <div className="flex-1">
                                        <h2>{plant.title}</h2>
                                        <p>{plant.price} €</p>
                                    </div>
                                    <ButtonDeleteToBasket
                                        text="Supprimer"
                                        plantId={plant.id}
                                        userId={userId}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Vous n&apos; avez pas encore de plantes dans votre panier</p>
                    )}
                </div>
            </main>
            <Footer />
        </>

    )
}