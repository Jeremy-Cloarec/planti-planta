'use client'
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {signIn} from "@/app/lib/auth-client";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState
        (false)

    function showPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleForgetPassword = () => {
        alert("la récupération de mot de passe est en cours de construction")
    }

    return (
        <>
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
                            className="block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Entrez votre email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="mb-3 mt-5 flex items-center justify-between">
                        <label
                            className="text-sm"
                            htmlFor="password"
                        >
                            Mot de passe
                        </label>
                        <button onClick={handleForgetPassword} className="text-sm hover:opacity-80 transition-none duration-300 ">Mot de passe oublié ?</button>
                    </div>

                    <div className="relative">
                        <input
                            className="peer block w-full  border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="password"
                            type={`${!isPasswordVisible ? ("password") : ("text")}`}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='absolute text-dark2 top-2 right-1 ' onClick={(e) => showPassword(e)} >
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={async () => {
                    await signIn.email(
                        {
                            email,
                            password
                        },
                        {
                            onRequest: () => {
                                setIsPending(true);
                            },
                            onResponse: () => {
                                setIsPending(false);
                            },
                        },
                    );
                }}
            >
                {isPending ? (
                    <p>...connexion ...</p>
                ) : (
                    <p> Se connecter </p>
                )}
            </button>
        </>
    )
}