import { betterAuth } from "better-auth";
import {connectionPool as cp} from "@/app/db"

export const auth = betterAuth({
    database: cp,
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data, request) {
            // Send an email to the user with a link to reset their password

        },
    },
})