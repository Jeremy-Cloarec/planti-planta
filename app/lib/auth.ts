import { betterAuth } from "better-auth";
import { connectionPool as cp } from "@/app/db"
import { Resend } from "resend";
import { EmailResetPassword } from "@/emails/EmailResetPassword";
import { createAuthMiddleware } from "better-auth/api";
import stripe from "./stripe";
const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
    database: cp,
    hooks: {
        // Create stripe client in user creation
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith("/sign-up")) {
                const newSession = ctx.context.newSession;
                if (newSession) {
                    const user = newSession.user;

                    if (!user.email) return;

                    const existing = await cp.query(
                        `SELECT "stripeCustomerId" FROM "user" WHERE id = $1`,
                        [user.id]
                    );

                    if (existing.rows?.[0]?.stripeCustomerId) return;

                    const customer = await stripe.customers.create({
                        email: user.email,
                        name: user.name ?? undefined,
                        metadata: {
                            userId: user.id,
                        },
                    });

                    await cp.query(
                        `UPDATE "user" SET "stripeCustomerId"=$1 WHERE id=$2`,
                        [customer.id, user.id]
                    );
                }
            }
        }),
    },

    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Dancing Plants <noreply@jeremycloarec.com>',
                to: user.email,
                subject: "Reset your password",
                react: EmailResetPassword({ url })
            });
        },
    },
    user: {
        changeEmail: {
            enabled: true,
        },
        deleteUser: {
            enabled: true
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
})