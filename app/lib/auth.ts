import { betterAuth } from "better-auth";
import { connectionPool as cp } from "@/app/db"
import { Resend } from "resend";
import { EmailResetPassword } from "@/emails/EmailResetPassword";
import Stripe from "stripe"
import {stripe} from "@better-auth/stripe"

const resend = new Resend(process.env.RESEND_API_KEY)

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2025-09-30.clover",
}) 

export const auth = betterAuth({
    database: cp,
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
    plugins: [
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
            createCustomerOnSignUp: true,   
        })
    ]
})