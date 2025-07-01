import {Resend} from "resend"
import {EmailInscription} from "@/emails/EmailInscription"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    if (!process.env.RESEND_API_KEY) {
        return Response.json(
            { error: "Clé API Resend non définie" },
            { status: 500 }
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Dancing Plants <noreply@jeremycloarec.com>',
            to: ['jeremycloarec@msn.com'],
            subject: 'Hello world',
            react: EmailInscription()
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}