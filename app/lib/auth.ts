import { betterAuth } from "better-auth";
import { connectionPool as cp } from "@/app/db";
import { Resend } from "resend";
import { EmailResetPassword } from "@/emails/EmailResetPassword";
import stripe from "./stripe";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: cp,
    databaseHooks: {
        // Create stripe client when user is creating
        user: {
            create: {
                after: async (user) => {
                    try {
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
                    } catch (e) {
                        console.error("Stripe creation failed", e)
                    }
                }
            },
        },
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
            enabled: true,
            beforeDelete: async (user) => {
                try {
                    const customerStripeId = (await cp.query(`SELECT "stripeCustomerId" FROM "user" WHERE id=$1`, [user.id])).rows[0].stripeCustomerId;

                    const sessions = await stripe.checkout.sessions.list({
                        customer: customerStripeId,
                    })

                    if (sessions.data.length === 0) {
                        const deleted = await stripe.customers.del(customerStripeId);
                        console.log("User deleted: ", deleted)
                    } else {
                        await stripe.customers.update(customerStripeId, {
                            name: "Deleted user",
                            email: "deleteduser@example.com",
                            metadata: { deletedAt: new Date().toISOString() }
                        });

                        console.log(`User ${user.email} deleted. Keep payments info`);
                    }
                } catch (e) {
                    console.error("Failed to check customerStipeId")
                }
            }
        },
        additionalFields: {
            stripeCustomerId: {
                type: "string",
                required: false,
                defaultValue: "undefined",
            },
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