'use client'
import Link from 'next/link'
import { signUp } from '@/app/actions'
import { useActionState, useState } from "react"
import ButtonAuth from "./buttons/ButtonAuth"

export function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, action, isPending] = useActionState(signUp, undefined)

    return (
        <>
            <form
                className="space-y-3"
                action={action}
            >
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1>Inscrivez-vous pour continuer</h1>
                    <div className="w-full mb-5">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="name"
                            >
                                Nom
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-green py-[9px] pl-10 text-sm outline-2 outline-green placeholder:text-gray-500"
                                    id="name"
                                    type="name"
                                    name="name"
                                    placeholder="Entrez votre nom"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {state?.errors?.name && <p>{state.errors.name}</p>}
                        </div>
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-green py-[9px] pl-10 text-sm outline-2 outline-green placeholder:text-gray-500"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Entrez votre email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {state?.errors?.email && <p>{state.errors.email}</p>}
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-green py-[9px] pl-10 text-sm outline-2 outline-green placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Entrez votre mot de passe"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {state?.errors?.password && (
                                <div>
                                    <p>Le mot de passe doit : </p>
                                    <ul>
                                        {state.errors.password.map((error) => (
                                            <li key={error}>- {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                    {state?.message && <p className="text-red text-sm">{state.message}</p>}
                    <ButtonAuth
                        text="S'inscrire"
                        pending={isPending}
                        className="w-full"
                    />
                </div>
            </form>
            <p className='mt-5'>Déjà un compte ? <Link href={'./sign-in'}><span className='text-green font-semibold hover:text-greenHover transition-all duration-300'> Connectez-vous </span></Link></p>
        </>
    )
}