import { connectionPool as cp } from "app/db"

export async function fetchOrders(userId: string) {
    try {
        const data = await cp.query(
            `SELECT 
                "stripe_session_id",
                "stripe_payment_intent", 
                "stripe_customer_id",
                "amount_total",
                "currency",
                "status",
                "billing_name",
                "billing_line1",
                "billing_line2",
                "billing_city",
                "billing_postal_code",
                "billing_country",
                "created_at"
            FROM "orders"
            JOIN "user" ON "orders"."user_id" = "user"."id"
            WHERE "user"."id" = $1
            `, [userId])
        const orders = data.rows
        return orders;
    } catch (error) {
        console.error("Failed to fetch orders. " + error)
        return []
    }
}


