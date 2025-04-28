import { z } from 'zod'
export const PlantShema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    quantity: z.number()
})

export const SigninFormShema = z.object({
    email: z.string().email({ message: "Entrz un email valide svp" }),
    password: z
        .string()
        .min(8, { message: 'Doit avoir au moins 6 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'Doit contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'Doit contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Doit contenir au moins un caractère spécial',
        })
        .trim(),
})

export const SignupFormShema = z.object({
    isAdmin: z
        .boolean(),
    name: z
        .string()
        .min(1, { message: "Le nom doit avoir au moins un caractère de long" })
        .trim(),
    email: z.string().email({ message: "Entrz un email valide svp" }),
    password: z
        .string()
        .min(8, { message: 'Doit avoir au moins 6 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'Doit contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'Doit contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Doit contenir au moins un caractère spécial',
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
    isAdmin?: boolean
}

export type Plant = {
    id: string
    title: string
    price: number
    quantity: number
}

export type Basket = {
    plantId: number,
    userId: number
}

export type User = {
    id?: number
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

export type Discount = {
    isDiscount: boolean,
    discountInput: string,
    message: string
}

