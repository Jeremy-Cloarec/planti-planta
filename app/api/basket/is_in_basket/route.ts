import { checkIfPlantIsInBasket } from "@/app/actions/plants.actions"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const plantId = req.nextUrl.searchParams.get("plantId")
    const userId = req.nextUrl.searchParams.get("userId")

    if (!plantId || !userId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing plantId or userId" }),
            { status: 400 }
        )
    }

    try {
        const quantity = await checkIfPlantIsInBasket(plantId, userId)
        return new Response(JSON.stringify({ success: true, quantity }))
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Erreur serveur ", error }),
            { status: 500 }
        )
    }
}