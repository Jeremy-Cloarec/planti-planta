"use server"
import {Resend} from "resend"
import {EmailInscription} from "@/emails/EmailInscription"

export async function emailInscriptionAction(userName: string) {
    console.log(process.env.RESEND_API_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.NEXT_PUBLIC_SITE_RESEND_API_KEY) {
        return Response.json(
            { error: "Clé API Resend non définie" },
            { status: 500 }
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Dancing Plants <noreply@jeremycloarec.com>',
            to: ['jeremycloarec@msn.com'],
            subject: `Bienvenue sur Dancing Plants, ${userName}`,
            react: EmailInscription({userName})
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        console.log(`Email envoyer à ${userName}`)

    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}