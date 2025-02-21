"use server";
import { NextResponse } from "next/server"
import { connectionPool as cp } from "@/app/db"
import { Plant } from "@/app/lib/definitions";

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

export async function updateStoreProduct (storePlants : Plant[] ) {
    for (const plant of storePlants) {
        cp.query(`UPDATE plants SET quantity = quantity - '${plant.quantity}' WHERE id = '${plant.id}'`)
    }
}