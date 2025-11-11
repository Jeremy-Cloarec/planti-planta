import { PlantInBasket } from "@/app/lib/definitions";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
    const data: PlantInBasket[] = await req.json()

    const plantsPayment = data.map(plant => ({
        price_data: {
            currency: 'eur',
            product_data: {
                name: plant.title,
            },
            unit_amount: plant.unitPrice * 100,
        },
        quantity: plant.basketQuantity,
    }))  
    
    console.log(plantsPayment);
    

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: plantsPayment,
            mode: "payment",
            ui_mode: "custom",
            return_url: `${process.env.PUBLIC_URL}/return?session_id={CHECKOUT_SESSION_ID}`
        })

        console.log("session stripe", session);
        
        return NextResponse.json({ checkoutSessionClientSecret: session.client_secret });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}