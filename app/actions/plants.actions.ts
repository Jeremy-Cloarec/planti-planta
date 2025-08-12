import { Plant } from "../lib/definitions"
import { connectionPool as cp } from "app/db"

export async function fetchPlants() {
    try {
        const data = await cp.query(`SELECT * FROM plants ORDER BY title`)
        const plants: Plant[] = data.rows
        return plants
    } catch (error) {
        console.error("Failed to fetch plants. " + error)
    }
}


