import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
    });

    return NextResponse.json({
        status: session.status,
        payment_status: session.payment_status,
        payment_intent_id: session.payment_intent?.id,
        payment_intent_status: session.payment_intent?.status
    })
}