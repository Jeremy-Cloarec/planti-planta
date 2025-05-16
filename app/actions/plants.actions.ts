'use server'
import { revalidatePath } from "next/cache"
import { Plant } from "../lib/definitions"
import { connectionPool as cp } from "app/db"

export async function fetchPlants() {
    try {
        const data = await cp.query(`SELECT * FROM plants`)
        const plants: Plant[] = data.rows
        return plants
    } catch (error) {
        console.error("Failed to fetch plants. " + error)
    }
}

export async function checkIfPlantIsInBasket(idPlant: string, idUser: string): Promise<boolean> {
    try {
        const result = await cp.query(
            `SELECT 1 FROM basket WHERE plant_id = $1 AND user_id = $2 LIMIT 1`,
            [idPlant, idUser]
        )
        return (result.rowCount ?? 0) > 0
    } catch (error) {
        console.error("Failed to check if plant is in the basket:", error)
        throw error
    }
}

export async function addPlantToBasket(idPlant: string, idUser: string) {
    try {
        // Check if plant is already in basket
        const existingPlant = await checkIfPlantIsInBasket(idPlant, idUser)

        if (existingPlant) {
            return { success: false, message: "La plante est déjà dans le panier" }
        }

        // Check if plant is in stock
        const plantQuantity: { quantity: string } = (await cp.query(`SELECT quantity FROM plants WHERE id = $1`, [idPlant])).rows[0]
        const isStock: number = parseInt(plantQuantity.quantity)
        if (isStock <= 0) {
            return { success: false, message: "La plante n'est plus en stock" }
        }

        // Add plant to basket
        await cp.query(`INSERT INTO basket (plant_id, user_id) VALUES ($1, $2)`, [idPlant, idUser])
        revalidatePath('/')

        return { success: true, message: "La plante a été ajoutée au panier" }
    } catch (error) {
        console.error("Fail to add plant to basket" + error)
    }
}