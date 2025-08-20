"use server"
import { connectionPool as cp } from "app/db"
import { AddressFormState, UpdateAddressSchema } from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

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

export async function createAddress(state: any, formData: FormData,) {
    const id = randomUUID()
    const name = formData.get("name")
    const nameAddress = formData.get("nameAddress")
    const address = formData.get("address")
    const postcode = parseInt(formData.get("postcode") as string, 10) || null
    const city = formData.get("city")
    const userId = formData.get("userId")

    const date = (new Date().toISOString().split('T').join(' ').slice(0, - 1))
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
    } catch (error) {
        console.error("Failed to update address. " + error)
    }

    revalidatePath('/infos')

    return {
        success: true,
        errors: {},
        message: "Adresse modifiée avec succès"
    }
}