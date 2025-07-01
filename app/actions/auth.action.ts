'use server'
import {
    SignupFormShema,
    FormState,
    SigninFormShema,
} from "app/lib/definitions"
import { cookies } from 'next/headers'
import { connectionPool as cp } from "app/db"
import bcrypt from 'bcrypt'
import { createSession, decrypt } from "../lib/session"
import { redirect } from "next/navigation"
import { fetchPlantInBasket } from "./basket.action"
import {emailInscriptionAction} from "@/app/actions/email-inscription.action";

export async function logout() {
    const cookieStore = await cookies()
    console.log("cookieStore", cookieStore);

    cookieStore.delete('session')
    console.log("cookieStoreDeleted", cookieStore);
    if (cookieStore.get('session')?.value === "") {
        return { message: "Vous êtes bien déconnecté" }
    }
    return { error: "Une erreur est survenue lors de la déconnexion, supprimer le cookie manuellement" }
}

export async function signUp(state: FormState, formData: FormData) {
    // Validate form fields
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

    // Prepare data for insertion into database
    const { isAdmin, name, email, password } = validateFields.data

    // Check if user already exist
    const existingUser = await cp.query(
        `SELECT 1 FROM users WHERE email = $1`,
        [email]
    )

    if (existingUser.rows.length > 0) {
        return { message: "Cet email est déjà utilisé. Veuillez en choisir un autre." };
    }

    // Hashing passord before store it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user into the database or call an Auth librairy
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

    // Create a user session
    await createSession(user.id, user.is_admin)

    //send email to user
    const sendEmail = await emailInscriptionAction(user.name)

    if(sendEmail.status === 200) {
        console.log(`Le mail a bie été envoyé à ${user.email}`)
    }  else {
        console.log(`Un probleme est survenue dans l'envoie du mail ${user.email}}`)
    }


    // Redirect user
    if (user.is_admin) {
        redirect('/admin')
    } else {
        redirect('/user-account')
    }
}

export async function signIn(state: FormState, formData: FormData) {
    // Validate form fields
    const validateFields = SigninFormShema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    // If any form invalid, return early
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    // Prepare date to compare in db
    const { email, password } = validateFields.data

    // If no mail in db, return early
    const data = await cp.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])
    const user = data.rows[0]

    if (!user) return { message: "Le mail n'existe pas" }

    // Compare password
    const isPasswordOk = await bcrypt.compare(password, user.password)

    if (!isPasswordOk) return { message: "Le mot de passe n'est pas correct" }

    // Create a user session
    await createSession(user.id, user.is_admin)

    // Synchronize user guest basket and user connected basket
    const cookieStore = await cookies()
    const userGuestId = cookieStore.get('userId')?.value

    if (userGuestId) {
        synchronizeBaskets(userGuestId)

        cookieStore.delete('userId')
        await cp.query(`DELETE FROM users WHERE id = $1`, [userGuestId])
    }

    // Redirect user
    if (user.is_admin === true) {
        redirect('/admin')
    } else {
        redirect('/user-account')
    }
}

async function synchronizeBaskets(userGuestId: string) {
    const guestBasket = await fetchPlantInBasket(userGuestId)
    if (!guestBasket || guestBasket.length === 0) return

    const cookieStore = await cookies()
    const cookiesConnected = cookieStore.get('session')?.value

    if (!cookiesConnected) return

    const userConnected = await decrypt(cookiesConnected)

    if (!userConnected) return

    const userId = typeof userConnected.userId === 'string' ? userConnected.userId : ''

    if (userId === '') return

    const userConnectedBasket = await fetchPlantInBasket(userId)

    if (!userConnectedBasket) return

    const userBasketPlantIds = new Set(userConnectedBasket.map(user => user.id))

    await Promise.all(
        guestBasket
            .filter(item => !userBasketPlantIds.has(item.id))
            .map(item =>
                cp.query(`INSERT INTO basket (plant_id, user_id) VALUES ($1, $2)`, [item.id, userId])
            )
    )
}






