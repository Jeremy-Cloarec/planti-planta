import { totalPriceInBasket } from "@/app/actions/basket.action";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId")

    if (!userId) {
        return new Response(
            JSON.stringify({ success: false, message: "Missing plantId or userId" }),
            { status: 400 }
        )
    }

    try {
        const totalPrice = await totalPriceInBasket(userId)
        console.log("total price ", totalPrice);
        
        return new Response(JSON.stringify(totalPrice), {
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
