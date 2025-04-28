import Nav from "../ui/Nav"
import { Footer } from "../ui/Footer"
import { fetchPlantInBasket, fetchUserInfos } from "../actions"
import Image from "next/image"
import { Plant } from "../lib/definitions"

export default async function Basket() {
    const user = await fetchUserInfos()
    console.log("userId : ", user)

    const plantsInBasket: Plant[] | undefined = await fetchPlantInBasket(user.id)
    console.log(plantsInBasket)

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
                                    <div>
                                        <h2>{plant.title}</h2>
                                        <p>{plant.price} €</p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Vous n'avez pas encore de plantes dans votre panier</p>
                    )}
                </div>
            </main>
            <Footer />
        </>

    )
}