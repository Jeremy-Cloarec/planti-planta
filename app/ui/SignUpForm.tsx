'use client'
import { signUp } from "@/app/lib/auth-client"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import {useRouter} from "next/navigation";
import {useState} from "react";

export function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState
    (false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState
        (false)
    const router = useRouter();

    const handlePasswordVisibility = (
        e: React.MouseEvent<HTMLButtonElement>,
        setter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        e.preventDefault();
        setter(prev => !prev);
    };


    return (
        <>
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
                        <button className='absolute text-dark2 top-2 right-1 '  onClick={(e) => handlePasswordVisibility(e, setIsPasswordVisible)}
                        >
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-sm"
                        htmlFor="password"
                    >
                        Confirmer le mot de passe
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="password"
                            type={`${!isConfirmPasswordVisible ? ("password") : ("text")}`}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={8}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <button className='absolute text-dark2 top-2 right-1 '  onClick={(e) => handlePasswordVisibility(e, setIsConfirmPasswordVisible)}
                        >
                            {!isConfirmPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="w-full"
                disabled={loading}
                onClick={async () => {
                    await signUp.email({
                        email,
                        password,
                        name: name,
                        callbackURL: "/",
                        fetchOptions: {
                            onResponse: () => {
                                setLoading(false);
                            },
                            onRequest: () => {
                                setLoading(true);
                            },
                            onError: (ctx) => {
                                setErrors(ctx.error.message);
                            },
                            onSuccess: async () => {
                                router.push("/");
                            },
                        },
                    });
                }}
            >
                {loading ? (
                    <p>..envoie...</p>
                ) : (
                    "Create an account"
                )}
            </button>
            {errors && <p className="text-red-500">{errors}</p>}
        </>
    )
}