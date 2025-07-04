import {betterAuth} from "better-auth";
import {connectionPool as cp} from "@/app/db"
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)
export const auth = betterAuth({
    database: cp,
    emailAndPassword: {
        enabled: true,

        sendResetPassword: async ({user, url, token}, request) => {
            await resend.emails.send({
                from: 'Dancing Plants <noreply@jeremycloarec.com>',
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },

    },
    user: {
        deleteUser: {
            enabled: true
        }
    }
})