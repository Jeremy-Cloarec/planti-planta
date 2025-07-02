'use client'
import { signUp } from "@/app/lib/auth-client"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {SignupFormShema} from "@/app/lib/definitions";
import {authErrorMessages} from "@/app/lib/auth-translation";
import  {FormErrors} from  "@/app/lib/definitions"


export function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
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

    useEffect(() => {
        console.log(formErrors);
    }, [formErrors]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const validatedData = SignupFormShema.safeParse({
            name,
            email,
            password,
            passwordConfirmation
        });

        if (!validatedData.success) {
            setFormErrors(validatedData.error.flatten().fieldErrors);
            setLoading(false);
            return;
        }

        if(password !== passwordConfirmation) {
            setFormErrors({
                passwordConfirmation: ["Les mots de passe ne correspondent pas"]
            });
            setLoading(false);
            return
        }

        try {
            await signUp.email({
                email: validatedData.data.email,
                password: validatedData.data.password,
                name: validatedData.data.name,
                callbackURL: "/",
                fetchOptions: {
                    onResponse: () => {
                        setLoading(false);
                    },
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
                },
            });
        } catch (e) {
            console.log(e);
            setFormErrors({ general: ["Une erreur inconnue est survenue."] });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full">
                {/* Champ Nom */}
                <div>
                    <label className="mb-3 mt-5 block text-sm" htmlFor="name">Nom</label>
                    <input
                        className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Entrez votre nom"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {formErrors.name && <p className="text-red text-sm">{formErrors.name[0]}</p>}
                </div>

                {/* Champ Email */}
                <div>
                    <label className="mb-3 mt-5 block text-sm" htmlFor="email">Email</label>
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
                    {formErrors.email && <p className="text-red text-sm">{formErrors.email[0]}</p>}
                </div>

                {/* Champ Mot de passe */}
                <div className="mt-4">
                    <label className="mb-3 mt-5 block text-sm" htmlFor="password">Mot de passe</label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="password"
                            type={!isPasswordVisible ? "password" : "text"}
                            name="password"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="absolute text-dark2 top-2 right-1" onClick={(e) => handlePasswordVisibility(e, setIsPasswordVisible)}>
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                    {formErrors.password &&
                        <ul className="text-sm text-red"> Le mot de passe doit :
                            { formErrors.password.map(err => <li key={err}>- {err} </li>)}
                        </ul>
                    }
                </div>

                {/* Champ Confirmation mot de passe */}
                <div className="mt-4">
                    <label className="mb-3 mt-5 block text-sm" htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="passwordConfirmation"
                            type={!isConfirmPasswordVisible ? "password" : "text"}
                            name="passwordConfirmation"
                            placeholder="Confirmez votre mot de passe"
                            required
                            minLength={8}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <button className="absolute text-dark2 top-2 right-1" onClick={(e) => handlePasswordVisibility(e, setIsConfirmPasswordVisible)}>
                            {!isConfirmPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                    {formErrors.passwordConfirmation && <p className="text-red text-sm">{formErrors.passwordConfirmation[0]}</p>}
                </div>

                {/* Erreur générale */}
                {formErrors.general && <p className="text-red text-sm mt-4">{formErrors.general[0]}</p>}
            </div>

            <button
                type="submit"
                className="w-full mt-5"
                disabled={loading}
            >
                {loading ? "Envoi en cours..." : "Créer un compte"}
            </button>
        </form>
    )
}