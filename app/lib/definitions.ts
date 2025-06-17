import { z } from 'zod'
export const PlantShema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    quantity: z.number(),
    legend: z.string()
})

export const SigninFormShema = z.object({
    email: z.string().email({ message: "Entrez un email valide svp" }).trim(),
    password: z.string().trim(),
})

export const SignupFormShema = z.object({
    isAdmin: z
        .boolean(),
    name: z
        .string()
        .min(1, { message: "Le nom doit avoir au moins un caractère de long" })
        .trim(),
    email: z.string().email({ message: "Entrez un email valide svp" }),
    password: z
        .string()
        .min(8, { message: 'avoir au moins 8 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenir au moins un caractère spécial',
        })
        .trim(),
})

export type FormState =
    | {
        error?: {
            name?: string[],
            email?: string[],
            password?: string[]
        }
        message?: string
    }
    | undefined

export type SessionPayload = {
    userId: string
    expiresAt: Date
    isAdmin: boolean
}

export type Plant = {
    id: string
    title: string
    price: number
    quantity: number
    legend:string
}

export type Basket = {
    plantId: number,
    userId: number
}

export type User = {
    id: string
    isAdmin: boolean
    name: string
    email: string
    password: string
}

export type UserInfoType = {
    name: string
    email: string
    is_admin: boolean
}


