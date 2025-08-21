"use server"
import { connectionPool as cp } from "app/db"
import { AddressFormState, CreateAddressSchema, UpdateAddressSchema } from "../lib/definitions";
import { revalidatePath } from "next/cache";

export async function fetchAdress(userId: string) {
    try {
        const data = await cp.query(`
            SELECT 
                "address"."id", 
                "address"."nameAddress",
                "address"."name", 
                "address"."address", 
                "address"."postcode", 
                "address"."city", 
                "address"."userId", 
                "address"."createdAt", 
                "address"."updatedAt"
            FROM "address"
            JOIN "user" ON "address"."userId" = "user"."id"
            WHERE "user"."id" = $1 
            ORDER BY "address"."createdAt" ASC
            `, [userId]);

        return data.rows
    } catch (error) {
        console.error("Failed to fetch address. " + error)
        return []
    }
}

export async function createAddress(state: AddressFormState, formData: FormData): Promise<AddressFormState> {
    console.log(formData)
    const name = formData.get("name")
    const nameAddress = formData.get("nameAddress")
    const address = formData.get("address")
    const postcode = parseInt(formData.get("postcode") as string, 10) || null
    const city = formData.get("city")
    const userId = formData.get("userId")
    const date = (new Date().toISOString())
    const createdAt = date
    const updatedAt = date

    const validateData = CreateAddressSchema.safeParse({
        name,
        nameAddress,
        address,
        postcode,
        city,
        createdAt,
        updatedAt,
        userId
    })

    if (!validateData.success) {
        console.log("Invalid Created address schema", validateData.error.flatten())
        return {
            errors: validateData.error.flatten().fieldErrors,
            success: false,
            fields: Object.fromEntries(formData)
        }
    }

    try {
        const result = await cp.query(`
                INSERT INTO "address" (
                    "name",
                    "nameAddress", 
                    "address", 
                    "city", 
                    "postcode", 
                    "userId", 
                    "createdAt", 
                    "updatedAt"
                ) 
                VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8
                )
                RETURNING id
            `, [
            validateData.data.name,
            validateData.data.nameAddress,
            validateData.data.address,
            validateData.data.city,
            validateData.data.postcode,
            validateData.data.userId,
            validateData.data.createdAt,
            validateData.data.updatedAt,
        ])

        const id = result.rows[0].id

        revalidatePath('/infos')

        return {
            success: true,
            errors: {},
            message: "Adresse créée avec succès",
            fields: {
                id
            }
        }

    } catch (error) {
        console.log("Error when creating address", error);

        return {
            success: false,
            errors: { general: "Erreur dans la création de l'addresse" },
            fields: Object.fromEntries(formData)
        }
    }
}

export async function updateAddress(state: AddressFormState, formData: FormData): Promise<AddressFormState> {
    const id = formData.get("id")
    const name = formData.get("name")
    const nameAddress = formData.get("nameAddress")
    const address = formData.get("address")
    const postcode = parseInt(formData.get("postcode") as string, 10) || null
    const city = formData.get("city")
    const updateAt = (new Date()).toISOString()

    const validateData = UpdateAddressSchema.safeParse({
        id,
        name,
        nameAddress,
        address,
        postcode,
        city,
        updateAt
    })

    if (!validateData.success) {
        console.log("Invalid Update address schema", validateData.error.flatten())
        return {
            errors: validateData.error.flatten().fieldErrors,
            success: false
        }
    }

    try {
        await cp.query(`
            UPDATE "address"
            SET
                "name" = $1,
                "nameAddress" = $2,
                "address" = $3,
                "postcode" = $4,
                "city" = $5,
                "updatedAt" = $6
            WHERE "id" = $7
        `, [
            validateData.data.name,
            validateData.data.nameAddress,
            validateData.data.address,
            validateData.data.postcode,
            validateData.data.city,
            updateAt,
            id
        ]);

        revalidatePath('/infos')

        return {
            success: true,
            errors: {},
            message: "Adresse modifiée avec succès"
        }

    } catch (error) {
        console.log("Error when updating address", error);

        return {
            success: false,
            errors: { general: "Erreur dans la modification de l'addresse" },
        }
    }
}

export async function deleteAddress(addressId: string): Promise<AddressFormState> {

    try {
        cp.query(`
            DELETE FROM "address" WHERE id=$1
            `, [addressId])

        revalidatePath('/infos')

        return {
            success: true,
            errors: {},
            message: "Adresse supprimée avec succès"
        }
    } catch (error) {
        return {
            success: false,
            errors: { general: "Erreur dans la suppression de l'adresse" },
        }
    }
}