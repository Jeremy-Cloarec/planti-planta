import Nav from "../ui/Nav"
import { Footer } from "../ui/Footer"
import { fetchPlantInBasket, fetchUserInfos } from "../actions"
import Image from "next/image"
import { Plant, User } from "../lib/definitions"
import ButtonDeleteToBasket from "../ui/buttons/ButtonDeleteToBasket"

export default async function Basket() {
    const user: User | undefined = await fetchUserInfos()
    const plantsInBasket: Plant[] | undefined = user ? await fetchPlantInBasket(user.id) : undefined

    return (
        <>
            <Nav />
            <main className="w-full flex-1 pt-[72px] flex flex-col gap-4">
                <h1 className="text-center bg-greenLightOpacity rounded-lg py-6">Votre panier</h1>
                <div>
                    {plantsInBasket !== undefined && plantsInBasket.length > 0 ? (
                        <ul className="flex flex-col gap-4">
                            {plantsInBasket.map(plant => (
                                <li
                                    key={plant.id}
                                    className="flex gap-4"
                                >
                                    <Image
                                        alt="Miniature"
                                        width={130}
                                        height={165}
                                        src={`/plants/${plant.title.toLowerCase()}.png`}
                                    />
                                    <div className="flex-1">
                                        <h2>{plant.title}</h2>
                                        <p>{plant.price} €</p>
                                    </div>
                                    <ButtonDeleteToBasket
                                        text="Supprimer"
                                        plantId={plant.id}
                                        userId={user?.id}
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