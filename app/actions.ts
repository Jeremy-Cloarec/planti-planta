'use server'
import {
    Plant,
    SignupFormShema,
    FormState
} from "app/lib/definitions"
import { connectionPool as cp } from "app/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import bcrypt from 'bcrypt'

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

export async function signUp(state: FormState, formData: FormData) {

    //1. Validate form fields
    const validateFields = SignupFormShema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    //If any form are invalid, return early
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    // 2.Prepare data for insertion into database
    const { name, email, password } = validateFields.data
    // Hashing passord before store it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert user into the database or call an Auth librairy
    const data = await cp.query(`
        INSERT INTO users (name, email, password) VALUES($1, $2, $3)
        `, [name, email, hashedPassword])

    const user = data.rows[0]

    if (!user) {
        return {
            message: "Une erreur est survenue lors de la création de votre compte"
        }
    }

    // 4. Create a user session
    // 5. Redirect user
}