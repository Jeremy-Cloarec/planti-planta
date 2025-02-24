'use server'
import { Plant } from "@/app/lib/definitions";
import { connectionPool as cp } from "@/app/db"

export async function updateStockStore (storePlants: Plant[]) {
    for (const plant of storePlants) {
        cp.query(`UPDATE plants SET quantity = quantity - '${plant.quantity}' WHERE id = '${plant.id}'`)
    }
}
