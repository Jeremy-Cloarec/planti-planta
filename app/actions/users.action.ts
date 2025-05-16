'use server'
import { connectionPool as cp } from "app/db"

import { cookies } from "next/headers"
import { verifySession } from "../lib/dal"

export async function fetchUserInfos() {
    try {
        const userId = (await verifySession())?.userId
        if (userId) {
            const user = (await cp.query(`SELECT id, name, email FROM users WHERE id=$1`, [userId])).rows[0]
            return user
        }

        // Create guest user
        const cookieStore = await cookies()
        const cookieUserId = (cookieStore.get('userId'))?.value

        if (cookieUserId) {
            console.log("compare cookie guest");
            const user = (await cp.query(`SELECT id, name, email FROM users WHERE id=$1`, [cookieUserId])).rows[0]
            console.log(user)

            if (user) return user
        }

        const email = `guest-${crypto.randomUUID()}@guest.local`
        const user = (await cp.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email`,
            ['guest', email]
        )).rows[0]

        cookieStore.set("userId", user.id.toString(), {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        return user

    } catch (error) {
        console.log("User not connected. ", error);
    }
}