'use server'
import {
    Plant,
    PlantShema,
    SignupFormShema,
    FormState
} from "app/lib/definitions"
import { connectionPool as cp } from "app/db"
import { revalidatePath } from "next/cache"
import bcrypt from 'bcrypt'
import { createSession, deleteSession } from "./lib/session"
import { redirect } from "next/navigation"

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

export async function logout() {
    deleteSession()
    redirect('/')
}

export async function signUp(state: FormState, formData: FormData) {

    //1. Validate form fields
    const validateFields = SignupFormShema.safeParse({
        isAdmin: false,
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
    const { isAdmin, name, email, password } = validateFields.data

    // Hashing passord before store it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert user into the database or call an Auth librairy
    const data = await cp.query(`
        INSERT INTO users (is_admin, name, email, password) VALUES($1, $2, $3, $4) RETURNING *
        `, [isAdmin, name, email, hashedPassword])

    const user = data.rows[0]
    console.log(user)

    console.log(`L'utilisateur ${user.name} a bien été créé`);

    if (!user) {
        return {
            message: "Une erreur est survenue lors de la création de votre compte"
        }
    }

    // 4. Create a user session
    await createSession(user.id, user.is_admin)

    // 5. Redirect user
    if (user.is_admin === true) {
        redirect('/admin')
    } else {
        redirect('/user-account')
    }
}

export async function signIn() { /* to do */ }