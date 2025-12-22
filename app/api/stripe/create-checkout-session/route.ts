import { PlantInBasket } from "@/app/lib/definitions";
import stripe from "@/app/lib/stripe";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: PlantInBasket[] = await req.json();

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

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: plantsPayment,
            mode: "payment",
            ui_mode: "custom",
            payment_method_types: ["card"],
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`
        })

        const cookieStore = await cookies();
        if(!session.client_secret) {
            throw new Error('Failed to create secret client');
        };

        cookieStore.set('secretClientStripe', session.client_secret)
        
        return NextResponse.json({ statut: session.status });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}