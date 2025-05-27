'use server'
import { revalidatePath } from "next/cache"
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

        const title: string = (await cp.query(`SELECT title FROM plants WHERE id=$1`, [idPlant])).rows[0].title
        console.log(title);


        if (existingPlant) {
            return { success: false, message: `${title} est déjà dans le panier` }
        }

        // Check if plant is in stock
        const plantQuantity: { quantity: string } = (await cp.query(`SELECT quantity FROM plants WHERE id = $1`, [idPlant])).rows[0]
        const isStock: number = parseInt(plantQuantity.quantity)
        if (isStock <= 0) {
            return { success: false, message: `${title} n'est plus en stock` }
        }

        // Add plant to basket
        await cp.query(`INSERT INTO basket (plant_id, user_id) VALUES ($1, $2)`, [idPlant, idUser])
        revalidatePath('/')

        return { success: true, message: `${title} a été ajoutée au panier` }
    } catch (error) {
        console.error("Fail to add plant to basket" + error)
    }
}

export async function updateQuantityPlant(id: string) {
    try {
        await cp.query(`UPDATE plants SET quantity = 0 WHERE id=$1`, [id])
        revalidatePath('/')
    } catch (error) {
        console.error("Fail to update quantity of plant" + error)
    }
}

export async function isPlantInStock(id: string) {
    try {
        const plantQuantity: { quantity: string } = (await cp.query(`SELECT quantity FROM plants WHERE id = $1`, [id])).rows[0]
        const isStock: number = parseInt(plantQuantity.quantity)
        if (isStock > 0) return true
        return false
    } catch (error) {
        console.error("Fail to run isPlantInStock. Error: " + error)
    }
}