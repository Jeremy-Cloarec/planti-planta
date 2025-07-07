'use client'
import { useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {authClient, signIn} from "@/app/lib/auth-client";
import {useRouter} from "next/navigation";
import {FormErrors, SignInFormShema, ResendFormShema} from "@/app/lib/definitions";
import {handlePasswordVisibility} from "@/app/utils/utils";
import {authErrorMessages} from "@/app/lib/auth-translation";

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState
    (false)
    const router = useRouter();
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formSucces, setFormSucces] = useState<FormErrors>({});

    const handleForgetPassword = async (email: null | string) => {
        setFormErrors({});

        if (email === "") {
            setFormErrors({reset: "Vous devez renseigner l'email"})
            return;
        }

        if (!email) { return }

        const validatedData = ResendFormShema.safeParse({
            email,
        })

        if(!validatedData.success) {
            setFormErrors(validatedData.error.flatten().fieldErrors);
            return;
        }

        try {
            await authClient.requestPasswordReset({
                email: validatedData.data.email,
                redirectTo: "/reset-password",
            });

            setFormSucces({ general: ["Si votre mail existe, vous recevrez un lien de réinitialisation."] });

        } catch (error) {
            setFormErrors({ general: ["Erreur lors de la demande de réinitialisation."] });
            console.error("Erreur lors de la demande de réinitialisation :", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const validatedData = SignInFormShema.safeParse({
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
                callbackURL: "/compte",
                fetchOptions: {
                    onResponse: () => {
                        setLoading(false);
                    },
                    onRequest: () => {
                        setLoading(true);
                    },
                    onError: (ctx) => {
                        const code = ctx.error.code
                        const msg = authErrorMessages[code] ?? ctx.error.message;
                        setFormErrors({general: [msg]});
                    },
                    onSuccess: async () => {
                        router.push("/compte");
                    },
                }
            })
        } catch (e) {
            console.log(e);
            setFormErrors({general: ["Une erreur inconnue est survenue."]});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
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
                        <div>
                            <button type="button" onClick={() => handleForgetPassword(email)}
                                    className="text-sm hover:opacity-80 transition-none duration-300 ">Mot de passe
                                oublié ?
                            </button>
                            {formErrors.reset && <p className="text-red text-sm">{formErrors.reset}</p>}
                        </div>

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
                        <button className="absolute text-dark2 top-2 right-1"
                                onClick={(e) => handlePasswordVisibility(e, setIsPasswordVisible)}>
                            {!isPasswordVisible ? (<EyeIcon width={24}/>) : (<EyeSlashIcon width={24}/>)}
                        </button>
                        {formErrors.password &&
                            <ul className="text-sm text-red"> Le mot de passe doit :
                                {formErrors.password.map((err: string) => <li key={err}>- {err} </li>)}
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
            {formErrors && <p className="text-red text-sm">{formErrors.general}</p>}
            {formSucces && <p className="text-green-900 text-sm">{formSucces.general}</p>}
        </form>
    )
}