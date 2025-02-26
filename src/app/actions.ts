'use server'
import { Plant } from "@/app/lib/definitions"
import { connectionPool as cp } from "@/app/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const PlantShema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    quantity: z.number()
})

export async function updateStockStore(storePlants: Plant[]) {
    try {
        for (const plant of storePlants) {
            const validatePlantData = PlantShema.safeParse(plant)

            if (!validatePlantData.success) {
                return {
                    errors: validatePlantData.error.flatten().fieldErrors,
                    message: 'Fail to update plant'
                }
            }

            const { id, quantity, title } = validatePlantData.data

            await cp.query(`UPDATE plants SET quantity = quantity - '${quantity}' WHERE id = '${id}'`)
            console.log(`${title} a bien été modifiée`)
        } 
        revalidatePath('/')
        return { success: true, message: 'Stock mis à jour avec succès' }

    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' + error }
    }
}
