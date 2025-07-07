import { z } from 'zod'

export const ResetPasswordFormShema = z.object({
    password: z
        .string()
        .min(6, { message: 'avoir au moins 6 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenir au moins un caractère spécial',
        })
        .trim(),
    passwordConfirmation: z.string().trim(),
})

export const SignInFormShema = z.object({
    email: z.string({message: "Entrez un email svp"}).email({ message: "Entrez un email valide svp" }).trim(),
    password: z.string().min(1, {message: "être présent"}).trim(),
})

export const ResendFormShema = z.object({
    email: z.string({message: "Entrez un email svp"}).email({ message: "Entrez un email valide svp" }).trim(),
})

export const SignupFormShema = z.object({
    name: z
        .string({message: "Entrez un nom svp"})
        .min(1, { message: "Le nom doit avoir au moins un caractère de long" })
        .trim(),
    email: z.string({message: "Entrez un email svp"}).email({ message: "Entrez un email valide svp" }),
    password: z
        .string({message: "être présent"})
        .min(6, { message: 'avoir au moins 6 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenir au moins un caractère spécial',
        })
        .trim(),
    passwordConfirmation: z.string().trim(),
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

export type FormErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
    general?: string[];
    reset?: string;
};


