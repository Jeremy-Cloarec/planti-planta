'use server'
import {connectionPool as cp} from "app/db"

export async function fetchPlantInBasket(id: string) {
    try {
        return (await cp.query(
                `SELECT plants.id, plants.title, plants.price, plants.quantity, plants.legend
                 FROM plants
                          JOIN basket ON (plants.id = basket.plant_id)
                          JOIN "user" ON ("user".id = basket.user_id)
                 WHERE "user".id = $1`, [id])
        ).rows

    } catch (error) {
        console.error("Failed to fetch plant in shop. ", error);
    }
}

export async function totalPriceInBasket(id: string) {
    const plantsBasket = await fetchPlantInBasket(id)
    const prices = plantsBasket?.map(plant => parseInt(plant.price))
    return prices?.reduce((acc, curr) => acc + curr, 0)
}

export async function numberOfPlantsInBasket(idUser: string) {
    try {
        const countPlantsInBaskey = await cp.query(`SELECT COUNT(*)
                                                    FROM basket
                                                    WHERE user_id = $1`, [idUser])
        return countPlantsInBaskey.rows[0].count
    } catch (error) {
        console.error("Fail to count plant in the basket" + error)
    }
}

export async function deletePlantFromBasket(idPlant: string, idUser: string | unknown) {
    try {
        await cp.query(`DELETE
                        FROM basket
                        WHERE plant_id = $1
                          AND user_id = $2`, [idPlant, idUser])
    } catch (error) {
        console.error("Fail to delete plant to basket" + error)
    }
}