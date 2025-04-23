import { fetchPlants } from "../actions"
import CardPlant from "./CardPlant"
import { GridCardSkeleton } from "./Skeleton"

export async function ListCardsPlants() {
    const plants = await fetchPlants()
    const listPlants = plants.map(plant =>
        <li
            key={plant.id}
        >
            <CardPlant
                title={plant.title}
                price={plant.price}
                quantity={plant.quantity}
                id={plant.id}
            />
        </li>
    )

    return (
        <div className="flex items-center justify-center">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 w-full">
                {plants.length > 0 ? (listPlants) : <GridCardSkeleton />}
            </ul>
        </div>
    )
}

