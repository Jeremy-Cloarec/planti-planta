'use client'

import { useActionState } from "react"
import { authenticate } from "../actions"
import { useSearchParams } from "next/navigation"
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Button from "./Button";

export function LoginForm() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/user-account'
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    )
    return (
        <form action={formAction} className="space-y-3">
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
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
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
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
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
                    {/* Add form errors here */}
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
                            <p className='text-sm text-red-500'>{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}