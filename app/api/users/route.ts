"use server";
import { NextResponse } from "next/server"
import { connectionPool as cp } from "app/db"
import { verifySession } from "@/app/lib/dal";

export async function GET() {
    const session = await verifySession()
    
    if (!session) {
        console.log("no session");
        
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    console.log("Session validate by DAL");
    console.log(session);
    
    try {
        const data = await cp.query(`SELECT is_admin, name, email FROM users WHERE id = (${session.userId})`)
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