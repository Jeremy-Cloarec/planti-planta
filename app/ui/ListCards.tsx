import { Plant } from "../lib/definitions"
import ListCardsClient from "./ListCardsClients"

export async function ListCardsPlants({plants, userId}: {plants: Plant[], userId:string}) {
    if (!plants) return null

    return <ListCardsClient plants={plants} userId={userId} />
}
