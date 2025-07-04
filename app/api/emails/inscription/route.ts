import { NextRequest, NextResponse } from 'next/server';
import {emailInscriptionAction} from "@/app/actions/email-inscription.action";


export async function POST(req: NextRequest) {
    const { userName, userEmail } = await req.json();
    try {
        await emailInscriptionAction(userName, userEmail)
        return NextResponse.json({success:true});
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
