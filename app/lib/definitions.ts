import { z } from 'zod'

export const UpdateAddressSchema = z.object({
    id: z
        .string().uuid({message: "Le format de l'id n'est pas correct"}),
    name: z
        .string({ message: "Le nom ne peut pas être vide" })
        .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
        .max(100, { message: "Le nom doit contenir au maximum 100 caractères" }),
    nameAddress: z
        .string({ message: "Le nom de l'adresse ne peut pas être vide" })
        .min(2, { message: "Le nom de l'adresse doit contenir au moins 2 caractères" })
        .max(100, { message: "Le nom de l'adresse doit contenir au maximum 100 caractères" }),
    address: z
        .string({ message: "L'adresse ne peut pas être vide" })
        .min(5, { message: "L'adresse doit contenir au moins 5 caractères" })
        .max(200, { message: "L'adresse doit contenir au maximum 200 caractères" }),
    postcode: z
        .number({ message: "Le code postal ne peut pas être vide" })
        .gte(5, { message: "Le code postal doit contenir au moins 5 chiffres" })
        .lte(99999, {
            message: "Le code postal doit contenir au maximum 5 chiffres"
        }),
    city: z
        .string({ message: "La ville ne peut pas être vide" })
        .min(2, { message: "La ville doit contenir au moins 2 caractères" })
        .max(100, { message: "La ville doit contenir au maximum 100 caractères" }),
    updateAt: z.string().datetime({ message: "Le format de updateAt n'est pas valide" })
})

export const CreateAddressSchema = z.object({
    id: z
        .string().uuid({message: "Le format de l'id n'est pas correct"}),
    name: z
        .string({ message: "Le nom ne peut pas être vide" })
        .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
        .max(100, { message: "Le nom doit contenir au maximum 100 caractères" }),
    nameAddress: z
        .string({ message: "Le nom de l'adresse ne peut pas être vide" })
        .min(2, { message: "Le nom de l'adresse doit contenir au moins 2 caractères" })
        .max(100, { message: "Le nom de l'adresse doit contenir au maximum 100 caractères" }),
    address: z
        .string({ message: "L'adresse ne peut pas être vide" })
        .min(5, { message: "L'adresse doit contenir au moins 5 caractères" })
        .max(200, { message: "L'adresse doit contenir au maximum 200 caractères" }),
    postcode: z
        .number({ message: "Le code postal ne peut pas être vide" })
        .gte(5, { message: "Le code postal doit contenir au moins 5 chiffres" })
        .lte(99999, {
            message: "Le code postal doit contenir au maximum 5 chiffres"
        }),
    city: z
        .string({ message: "La ville ne peut pas être vide" })
        .min(2, { message: "La ville doit contenir au moins 2 caractères" })
        .max(100, { message: "La ville doit contenir au maximum 100 caractères" }),
    updateAt: z.string().datetime({ message: "Le format de la date n'est pas valide" }),
    createAt: z.string().datetime({ message: "Le format de la date n'est pas valide" }),
    userId: z.string().uuid({message: "Le format userId n'est pas correct"})
})

export const ChangePersonnalInfosShema = z.object({
    name: z
        .string({ message: "Le nom ne peut pas être vide" })
        .min(1, { message: 'Le nom ne doit pas être vide' })
        .trim(),
    email: z.string({ message: "Entrez un email svp" }).email({ message: "Entrez un email valide svp" }).trim(),

})

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

export const ResendFormShema = z.object({
    email: z.string({ message: "Entrez un email svp" }).email({ message: "Entrez un email valide svp" }).trim(),
})

export const SignInFormShema = z.object({
    email: z.string({ message: "Entrez un email svp" }).email({ message: "Entrez un email valide svp" }).trim(),
    password: z.string().min(1, { message: "être présent" }).trim(),
})

export const SignupFormShema = z.object({
    name: z
        .string({ message: "Entrez un nom svp" })
        .min(1, { message: "Le nom doit avoir au moins un caractère de long" })
        .trim(),
    email: z.string({ message: "Entrez un email svp" }).email({ message: "Entrez un email valide svp" }),
    password: z
        .string({ message: "être présent" })
        .min(6, { message: 'avoir au moins 6 caractère de long' })
        .regex(/[a-zA-Z]/, { message: 'contenir au moins une lettre' })
        .regex(/[0-9]/, { message: 'contenir au moins un nombre' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenir au moins un caractère spécial',
        })
        .trim(),
    passwordConfirmation: z.string().trim(),
})

export type Session = {
    session: {
        id: string
        token: string
        userId: string
        expiresAt: Date
        createdAt: Date
        updatedAt: Date
        ipAddress?: string | null | undefined
        userAgent?: string | null | undefined
    }
    user: {
        id: string
        name: string
        email: string
        emailVerified: boolean
        image: string | null | undefined
        createdAt: Date
        updatedAt: Date
    }
} | null

export type User = {
    id: string
    name: string
    email: string
}

export type AddressType = {
    id: string,
    name: string,
    nameAddress: string,
    address: string,
    postcode: number
    city: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}

export type Plant = {
    id: string
    title: string
    price: number
    quantity: number
    legend: string
}

export type FormErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
    general?: string[];
    reset?: string;
    address?: string[];
    city?: string[];
    postcode?: string[];
};

export type PlantsAction =
    | { type: 'add'; plant: Plant }
    | { type: 'remove'; id: string }
    | { type: 'increment', id: string }
    | { type: 'decrement', id: string }
    | { type: 'updateQuantity'; id: string; quantity: number }
    | { type: 'clear' };

export interface PlantInBasket extends Plant {
    basketQuantity: number,
    unitPrice: number,
}


export type AddressFormState = {
    success: boolean;
    message?: string;
    errors: {
        name?: string[];
        nameAddress?: string[];
        address?: string[];
        postcode?: string[];
        city?: string[];
    };
};


