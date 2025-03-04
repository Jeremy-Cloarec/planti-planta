import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { unknown, z } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'
import { connectionPool as cp } from '@/app/db'

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await cp.query<User>(`SELECT * FROM users WHERE email=$1`, [email])
        return user.rows[0] || null
    } catch (error) {
        console.error('Failed to fetch user', error)
        throw new Error('Failded to fetch user')
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials)

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null
                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) return {
                        ...user,
                        id: String(user.id)
                    }
                }
                console.log('Invalid credentials')

                return null
            },
        }),
    ],
});
