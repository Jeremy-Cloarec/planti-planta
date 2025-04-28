import { cookies } from "next/headers";
import { fetchPlants } from "../actions"
import CardPlant from "./CardPlant"
import { GridCardSkeleton } from "./Skeleton"
import { decrypt } from "../lib/session";

export async function ListCardsPlants() {
    const plants = await fetchPlants()

    const cookie = (await cookies()).get('session')?.value
    const userId: unknown | number = cookie ? (await decrypt(cookie))?.userId ?? null : null;

    const listPlants = plants ?  plants.map(plant =>
        <li
            key={plant.id}
        >
            <CardPlant
                title={plant.title}
                price={plant.price}
                plantId={plant.id}
                userId={userId}
            />
        </li>
    ) : []

    return (
        <div className="flex items-center justify-center">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
                {plants === undefined || plants.length > 0 ? (listPlants) : <GridCardSkeleton />}
            </ul>
        </div>
    )
}

