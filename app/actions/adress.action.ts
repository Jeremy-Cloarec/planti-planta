"use server"
import { connectionPool as cp } from "app/db"
import { UpdateAddressSchema } from "../lib/definitions";
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

export async function updateAddress(state: AddressFormState, formData: FormData):Promise<AddressFormState> {
    console.log("formData", formData)

    const id = formData.get("id")
    const name = formData.get("name")
    const nameAddress = formData.get("nameAddress")
    const address = formData.get("address")
    const postcode = parseInt(formData.get("postcode") as string, 10) || null
    const city = formData.get("city")

    const validateData = UpdateAddressSchema.safeParse({
        name,
        nameAddress,
        address,
        postcode,
        city
    })

    if (!validateData.success) {
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
                "city" = $5
            WHERE "id" = $6
        `, [validateData.data.name, validateData.data.nameAddress, validateData.data.address, validateData.data.postcode, validateData.data.city, id]);
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