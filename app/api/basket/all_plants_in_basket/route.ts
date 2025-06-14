import { fetchPlantInBasket } from "@/app/actions/basket.action"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {
        const plants = await fetchPlantInBasket(userId)
        return new Response(JSON.stringify(plants), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Erreur serveur: ", error }),
            { status: 500 }
        )
    }
}