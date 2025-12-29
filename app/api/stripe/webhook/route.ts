import { NextRequest, NextResponse } from "next/server";
import stripe from "@/app/lib/stripe";

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
        return new NextResponse("Invalid signature", { status: 400 });
    }

    switch (event.type) {
        case "charge.updated":
            console.log("Payment completed");
            console.log(event);
            break;

        default:
            console.log(`Unhandled event: ${event.type}`);
    }

    return new NextResponse("OK", { status: 200 });
}
