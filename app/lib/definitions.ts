import { z } from 'zod'

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

export type Plant = {
    id: string
    title: string
    price: number
    quantity: number
    legend:string
}

export type User = {
    id: string
    isAdmin: boolean
    name: string
    email: string
    password: string
}


