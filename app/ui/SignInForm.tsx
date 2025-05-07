'use client'
import { startTransition, useActionState, useState } from "react";
import Button from "./buttons/ButtonAddToBasket";
import Link from 'next/link';
import { signIn } from "../actions";

export function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, action, isPending] = useActionState(signIn, undefined)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        startTransition(() => {
            action(formData);
        })
    }

    return (
        <>
            <form
                className="space-y-3"
                onSubmit={handleSubmit}
            >
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1>Connectez-vous pour continuer</h1>
                    <div className="w-full mb-5">
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
                    <Button
                        text="Se connecter"
                        isPending={isPending}
                        classAdded="w-full"
                    />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live='polite'
                        aria-atomic="true"
                    >
                    </div>
                </div>
            </form>
            <p className='mt-5'>Pas encore de compte ? <Link href={'./sign-up'}><span className='text-green font-semibold hover:text-greenHover transition-all duration-300'> Inscrivez-vous </span></Link></p>
        </>
    )
}