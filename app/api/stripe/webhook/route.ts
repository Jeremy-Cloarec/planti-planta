import { NextRequest, NextResponse } from "next/server";
import stripe from "@/app/lib/stripe";
import { connectionPool as cp } from 'app/db';


export async function POST(request: NextRequest) {
    const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

    if (!endpointSecret) {
        console.error("Missing webhook secret");
        return new NextResponse("Server error", { status: 500 });
    }

    const sig = request.headers.get("stripe-signature");

    if (!sig) {
        return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    const rawBody = await request.text();

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            endpointSecret
        );

    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const stripeSessionId = session.id;
        const userId = session.metadata?.userId;
        const paymentIntent = session.payment_intent;
        const customerId = session.customer;
        const email = session.customer_details?.email;
        const amount = session.amount_total;
        const currency = session.currency;
        const status = session.payment_status;
        const details = session.customer_details;
        const name = details?.name;
        const address = details?.address;
    
        try {
            await cp.query(
                `
        INSERT INTO orders (
            "stripe_session_id",
            "user_id",
            "stripe_payment_intent",
            "stripe_customer_id",
            "user_email",
            "amount_total",
            "currency",
            "status",
            "billing_name",
            "billing_line1",
            "billing_line2",
            "billing_city",
            "billing_postal_code",
            "billing_country"
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        ON CONFLICT (stripe_session_id) DO NOTHING
        `,
                [
                    stripeSessionId,
                    userId,
                    paymentIntent,
                    customerId,
                    email,
                    amount,
                    currency,
                    status,
                    name,
                    address?.line1,
                    address?.line2,
                    address?.city,
                    address?.postal_code,
                    address?.country
                ]
            );

            console.log("🟢 Order inserted for", email);

        } catch (e) {
            console.error("❌ DB insert failed", e);
            return NextResponse.json({ error: "db error" }, { status: 500 });
        }
    }



    return new NextResponse("OK", { status: 200 });
}
