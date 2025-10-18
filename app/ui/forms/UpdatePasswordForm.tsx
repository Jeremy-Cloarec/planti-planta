'use client'
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormErrors, UpdatePasswordFormShema } from "@/app/lib/definitions";
import { handlePasswordVisibility } from "@/app/utils/utils";

export function UpdatePasswordForm() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState
        (false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState
        (false)
    const [isNewPasswordConfirmationVisible, setIsNewPasswordConfirmationVisible] = useState
        (false)
    const router = useRouter();
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [formSucces, setFormSucces] = useState<FormErrors>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        const validatedData = UpdatePasswordFormShema.safeParse({
            password,
            newPassword,
            newPasswordConfirmation
        });

        if (!validatedData.success) {
            setFormErrors(validatedData.error.flatten().fieldErrors);
            setLoading(false);
            return;
        }

        try {
            await authClient.changePassword({
                newPassword: validatedData.data.newPassword,
                currentPassword: validatedData.data.password,
                revokeOtherSessions: true,
            });

            setLoading(false);
            setFormSucces({ general: ["Mot de passe mis à jour avec succès."] });
            setPassword("");
            setNewPassword("");
            setNewPasswordConfirmation("");
            router.push("/infos")

        } catch (e) {
            console.log(e);
            setFormErrors({ general: ["Une erreur inconnue est survenue."] });
            setLoading(false);
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
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                        {formErrors.password &&
                            <ul className="text-sm text-red"> Le mot de passe doit :
                                {formErrors.password.map((err: string) => <li key={err}>- {err} </li>)}
                            </ul>
                        }
                    </div>
                </div>
                {/* New pass */}
                <div className="mt-4">
                    <label className="mb-3 mt-5 block text-sm" htmlFor="newPassword">Nouveau mot de passe</label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="pasnewPasswordsword"
                            type={!isNewPasswordVisible ? "password" : "text"}
                            name="newPassword"
                            placeholder="Entrez votre mot de passe"
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button className="absolute text-dark2 top-2 right-1" onClick={(e) => handlePasswordVisibility(e, setIsNewPasswordVisible)}>
                            {!isPasswordVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                    {formErrors.newPassword &&
                        <ul className="text-sm text-red"> Le mot de passe doit :
                            {formErrors.newPassword.map((err: string) => <li key={err}>- {err} </li>)}
                        </ul>
                    }
                </div>

                {/* New Pass confirmation*/}
                <div className="mt-4">
                    <label className="mb-3 mt-5 block text-sm" htmlFor="newPasswordConfirmation">Confirmer le mot de passe</label>
                    <div className="relative">
                        <input
                            className="peer block w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500"
                            id="newPasswordConfirmation"
                            type={!isNewPasswordConfirmationVisible ? "password" : "text"}
                            name="newPasswordConfirmation"
                            placeholder="Confirmez votre mot de passe"
                            required
                            minLength={6}
                            value={newPasswordConfirmation}
                            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                        />
                        <button className="absolute text-dark2 top-2 right-1" onClick={(e) => handlePasswordVisibility(e, setIsNewPasswordConfirmationVisible)}>
                            {!isNewPasswordConfirmationVisible ? (<EyeIcon width={24} />) : (<EyeSlashIcon width={24} />)}
                        </button>
                    </div>
                    {formErrors.newPasswordConfirmation &&
                        <ul className="text-sm text-red"> Le mot de passe doit : {formErrors.newPasswordConfirmation.map((err: string) => <li key={err}>- {err} </li>)}</ul>}
                </div>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 transition delay-75 duration-300 ease-in-out bg-green hover:bg-green-hover text-dark mt-4"
                disabled={loading}
            >
                {loading ? "Envoi en cours..." : "Mettre à jour"}
            </button>
            {formErrors && <p className="text-red text-sm">{formErrors.general}</p>}
            {formSucces && <p className="text-green-900 text-sm">{formSucces.general}</p>}
        </form>
    )
}