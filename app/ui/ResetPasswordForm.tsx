'use client'
import {useEffect} from "react";
import {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {authClient} from "@/app/lib/auth-client";
import {useRouter} from "next/navigation";
import {FormErrors, ResetPasswordFormShema} from "@/app/lib/definitions";
import {handlePasswordVisibility} from "@/app/utils/utils";

export function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState
    (false)
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState
    (false);
    const [token, setToken] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        console.log("formErrors",formErrors)
    }, [formErrors]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = searchParams.get("token");
        console.log("token ", tokenFromUrl);

        if (!tokenFromUrl) {
            router.push("/");
        } else {
            setToken(tokenFromUrl);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const validatedData = ResetPasswordFormShema.safeParse({
            password,
            passwordConfirmation
        });

        if (!validatedData.success) {
            setFormErrors(validatedData.error.flatten().fieldErrors);
            setLoading(false);
            return;
        }

        if (password !== passwordConfirmation) {
            setFormErrors({
                passwordConfirmation: ["Les mots de passe ne correspondent pas"]
            });
            setLoading(false);
            return
        }

        try {
            const {data, error} = await authClient.resetPassword({
                newPassword: validatedData.data.password,
                token,
            });
            router.push("/compte");
        } catch (e: unknown) {
            setFormErrors({general: ["Une erreur inconnue est survenue.", String(e)]});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full">

                {/* Password */}
                <div className="mt-4">
                    <div className="mb-3 mt-5 flex items-center justify-between">
                        <label
                            className="text-sm"
                            htmlFor="password"
                        >
                            Mot de passe
                        </label>
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
                {/* Champ Confirmation mot de passe */}
                <div className="mt-4">
                    <label className="mb-3 mt-5 block text-sm" htmlFor="passwordConfirmation">Confirmer le mot de
                        passe</label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="passwordConfirmation"
                            type={!isConfirmPasswordVisible ? "password" : "text"}
                            name="passwordConfirmation"
                            placeholder="Confirmez votre mot de passe"
                            required
                            minLength={6}
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <button className="absolute text-dark2 top-2 right-1"
                                onClick={(e) => handlePasswordVisibility(e, setIsConfirmPasswordVisible)}>
                            {!isConfirmPasswordVisible ? (<EyeIcon width={24}/>) : (<EyeSlashIcon width={24}/>)}
                        </button>
                    </div>
                    {formErrors.passwordConfirmation &&
                        <p className="text-red text-sm">{formErrors.passwordConfirmation[0]}</p>}
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