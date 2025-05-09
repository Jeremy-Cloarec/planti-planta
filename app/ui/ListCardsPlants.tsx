import ListCardsClient from "./ListCardsPlantsClients"
import { fetchPlants } from "../actions"
import { cookies } from "next/headers"
import { decrypt } from "../lib/session"

export async function ListCardsPlants() {
    const plants = await fetchPlants()
    const cookie = (await cookies()).get("session")?.value
    const userId: string = cookie ? (await decrypt(cookie))?.userId ?? null : null

    if (!plants) return null

    return <ListCardsClient plants={plants} userId={userId} />
}
