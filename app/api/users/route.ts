"use server";
import { NextResponse } from "next/server"
import { connectionPool as cp } from "app/db"
import { getSession } from "@/app/lib/session";

export async function GET() {
    const userSession = await getSession()
    
    if (!userSession) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    console.log("userSession");

    try {
        const data = await cp.query(`SELECT name, email FROM users WHERE id = (${userSession.userId})`)
        const user = data.rows[0]
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("Database Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch user data." },
            { status: 500 }
        );
    }
}