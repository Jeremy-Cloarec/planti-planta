"use server";
import { NextResponse } from "next/server"
import { connectionPool as cp } from "app/db"

export async function GET() {
    try {
        const data = await cp.query(`SELECT * FROM plants`)
        const formattedData = data.rows.map((row) => ({
            ...row,
            price: Number(row.price),
            quantity: Number(row.quantity),
        }));

        console.log(formattedData);

        return NextResponse.json(formattedData, { status: 200 })
    } catch (error) {
        console.error("Database Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch plants data." },
            { status: 500 }
        );
    }
}