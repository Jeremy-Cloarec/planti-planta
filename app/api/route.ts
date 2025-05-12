import { cookies } from "next/headers"
import { connectionPool as cp } from "@/app/db"

export async function GET() {
    try {
        const cookieStore = await cookies()
        if(cookieStore.get('guestUserId')){
            cookieStore.delete('guestUserId')
        }

        const email = `guest-${crypto.randomUUID()}@guest.local`
        const user = (await cp.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email`,
            ['guest', email]
        )).rows[0]

        cookieStore.set('guestUserId', user.id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            secure: true,
        })
        return Response.json(user)

    } catch (err) {
        console.error("Failed to insert guest user. ", err);
        
    }
}