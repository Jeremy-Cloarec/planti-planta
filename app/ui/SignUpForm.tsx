'use client'
import { signUp } from '@/app/actions/auth.action'
import { useActionState, useState } from "react"
import ButtonAuth from "./buttons/ButtonAuth"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

export function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, action, isPending] = useActionState(signUp, undefined)

    const [isPasswordVisible, setIsPasswordVisible] = useState
        (false)

    function showPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <form action={action}>
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-sm"
                        htmlFor="name"
                    >
                        Nom
                    </label>
                    <div>
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
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
                        className="mb-3 mt-5 block text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
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
                        className="mb-3 mt-5 block text-sm"
                        htmlFor="password"
                    >
                        Mot de passe
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="password"
                            type={`${!isPasswordVisible ? ("password") : ("text")}`}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='absolute text-dark2 top-2 right-1 ' onClick={(e) => showPassword(e)} >
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                    {state?.errors?.password && (
                        <div className='text-red'>
                            <p className='text-sm mt-3'>Le mot de passe doit : </p>
                            <ul>
                                {state.errors.password.map((error) => (
                                    <li className='text-sm' key={error}>- {error}</li>
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
                className="w-full mt-5"
            />
        </form>
    )
}