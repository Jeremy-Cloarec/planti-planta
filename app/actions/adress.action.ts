import { connectionPool as cp } from "app/db"

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
            `, [userId]);

        return data.rows
    } catch (error) {
        console.error("Failed to fetch address. " + error)
        return []
    }
}