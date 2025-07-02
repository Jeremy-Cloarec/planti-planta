'use client'
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {signIn} from "@/app/lib/auth-client";
import {useRouter} from "next/navigation";
import {FormErrors, SigninFormShema} from "@/app/lib/definitions";
import {handlePasswordVisibility} from "@/app/utils/utils";
import {authErrorMessages} from "@/app/lib/auth-translation";


export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState
        (false)
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const router = useRouter();


    const handleForgetPassword = () => {
        alert("la récupération de mot de passe est en cours de construction")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const validatedData = SigninFormShema.safeParse({
            email,
            password,
        });

        if (!validatedData.success) {
            setFormErrors(validatedData.error.flatten().fieldErrors);
            setLoading(false);
            return;
        }

        try {
            await signIn.email({
                email: validatedData.data.email,
                password: validatedData.data.password,
                callbackURL: "/",
                fetchOptions: {
                    onResponse: () => {
                        setLoading(false);
                    }
                    ,
                    onRequest: () => {
                        setLoading(true);
                    },
                    onError: (ctx) => {
                        const code = ctx.error.code
                        console.log(code)
                        const msg = authErrorMessages[code] ?? ctx.error.message;
                        setFormErrors({general: [msg]});
                    },
                    onSuccess: async () => {
                        router.push("/");
                    },
                }
            })
        } catch (e) {
            console.log(e);
            setFormErrors({ general: ["Une erreur inconnue est survenue."] });
        }
    };

    return (
        <form  onSubmit={handleSubmit} className="w-full">
            <div className="w-full">

                {/* email */}
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
                    {formErrors.email && <p className="text-red text-sm">{formErrors.email[0]}</p>}
                </div>

                {/* Password */}
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
                        <button className="absolute text-dark2 top-2 right-1" onClick={(e) => handlePasswordVisibility(e, setIsPasswordVisible)}>
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                        {formErrors.password &&
                            <ul className="text-sm text-red"> Le mot de passe doit :
                                { formErrors.password.map((err:string) => <li key={err}>- {err} </li>)}
                            </ul>
                        }
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-5"
                disabled={loading}
            >
                {loading ? "Envoi en cours..." : "Se connecter"}
            </button>
            {formErrors && <p className="text-red">{formErrors.general}</p>}
        </form>
    )
}