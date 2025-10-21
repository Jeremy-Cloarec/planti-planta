"use server"
import { headers } from "next/headers"
import { auth, stripeClient } from "../lib/auth"
import { PlantInBasket } from "../lib/definitions"

export async function stripePayment(items: PlantInBasket[]) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user

    if (!user) {
        throw new Error("Echec du paiement. L'utilisateur n'est pas identifié")
    }

    const lineItems = items.map((item: PlantInBasket) => ({
        
        price_data: {
            currency: "eur",
            product_data: {
                name: item.title
            },
            unit_amount: item.unitPrice * 100
        },
        quantity: item.basketQuantity
    }))    

    const sessionStripe = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: user.email,
        line_items: lineItems,
        success_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000"
    })

    return sessionStripe.url
}