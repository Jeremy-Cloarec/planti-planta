'use client'
import { startTransition, useActionState, useState } from "react";
import { signIn } from "../actions/auth.action";
import ButtonAuth from "./buttons/ButtonAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, action, isPending] = useActionState(signIn, undefined)
    const [isPasswordVisible, setIsPasswordVisible] = useState
        (false)

    function showPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        startTransition(() => {
            action(formData);
        })
    }

    const handleForgetPassword = () => {
        alert("la récupération de mot de passe est en cours de construction")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div>
                        <input
                            className="peer block w-full border border-green px-3 py-2 text-sm outline-2 outline-green placeholder:text-gray-500"
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
                    <div className="mb-3 mt-5 flex items-center justify-between">
                        <label
                            className=" text-sm"
                            htmlFor="password"
                        >
                            Mot de passe
                        </label>
                        <button onClick={handleForgetPassword} className="text-sm hover:opacity-80 transition-none duration-300">Mot de passe oublié ?</button>
                    </div>

                    <div className="relative">
                        <input
                            className="peer block w-full  border border-green px-3 py-2 text-sm outline-2 outline-green placeholder:text-gray-500"
                            id="password"
                            type={`${!isPasswordVisible ? ("password") : ("text")}`}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='absolute text-dark2 top-2 right-1' onClick={(e) => showPassword(e)} >
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
                text="Se connecter"
                pending={isPending}
                className="w-full mt-5"
            />
        </form>
    )
}