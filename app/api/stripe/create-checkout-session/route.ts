import { auth } from "@/app/lib/auth";
import { PlantInBasket } from "@/app/lib/definitions";
import stripe from "@/app/lib/stripe";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { connectionPool as cp } from "app/db";


export async function POST(req: NextRequest) {
    const dataPlants: PlantInBasket[] = await req.json();

    //Create stripe client
    const cookieStore = await cookies();

    const session = await auth.api.getSession({
        headers: {
            cookie: cookieStore.toString(),
        },
    });

    let stripeCustomerId: string | undefined;

    if (session?.user?.email) {
        // Check if user have a stripeCustomerId
        stripeCustomerId = ((await cp.query(`SELECT "stripeCustomerId" FROM "user" WHERE "id"=$1`, [session.user.id])).rows[0]).stripeCustomerId;

        console.log(stripeCustomerId);

        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                name: session.user.name,
                email: session.user.email,
                metadata: {
                    userId: session.user.id,
                },
            });

            stripeCustomerId = customer.id;

            await cp.query(`UPDATE "user" SET "stripeCustomerId" = $1 WHERE "id" = $2`, [stripeCustomerId, session.user.id]);
        }
    }

    console.log(stripeCustomerId);

    const plantsPayment = dataPlants.map(plant => ({
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
        if (!session.client_secret) {
            throw new Error('Failed to create secret client');
        };

        cookieStore.set('secretClientStripe', session.client_secret)

        return NextResponse.json({ status: session.status });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}