'use server'
import { connectionPool as cp } from "app/db"
import { revalidatePath } from "next/cache"
import { Plant } from "../lib/definitions"

export async function fetchPlantInBasket(id: string) {
    try {
        const baskePlants:Plant[] = (await cp.query(
            `SELECT plants.id, plants.title, plants.price, plants.quantity FROM plants
                JOIN basket ON(plants.id = basket.plant_id)
                JOIN users ON(users.id = basket.user_id)
                WHERE users.id = $1`, [id])).rows
        return baskePlants 
    } catch (error) {
        console.error("Failed to fetch plant in shop. ", error);
    }
}

export async function numberOfPlantsInBasket(idUser: string) {
    try {
        const countPlantsInBaskey = await cp.query(`SELECT COUNT(*) FROM basket WHERE user_id = $1`, [idUser])
        revalidatePath('/panier')
        return countPlantsInBaskey.rows[0].count
    } catch (error) {
        console.error("Fail to count plant in the basket" + error)
    }
}

export async function deletePlantFromBasket(idPlant: string, idUser: string | unknown) {
    try {
        await cp.query(`DELETE FROM basket WHERE plant_id = $1 AND user_id = $2`, [idPlant, idUser])
    } catch (error) {
        console.error("Fail to delete plant to basket" + error)
    }
}