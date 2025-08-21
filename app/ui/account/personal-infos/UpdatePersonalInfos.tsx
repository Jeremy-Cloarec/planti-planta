import { useState } from "react";
import { ChangePersonnalInfosShema, FormErrors, User } from "@/app/lib/definitions"
import HeadingSection from "../HeadingSection";
import { toogleChangeInfos } from "@/app/utils/utils";
import { authClient } from "@/app/lib/auth-client";

type ChangePersonalInfosProps = {
    user: User,
    isChangePersonnalInfos: boolean,
    setIsChangePersonnalInfos: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function ChangePersonalInfos({ user, isChangePersonnalInfos, setIsChangePersonnalInfos }: ChangePersonalInfosProps) {
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const handleChangeinfos = async () => {
        setFormErrors({})

        const validateData = ChangePersonnalInfosShema.safeParse({
            name,
            email
        })

        if (!validateData.success) {
            setFormErrors(validateData.error.flatten().fieldErrors)
            return
        }

        if (user.name !== validateData.data.name) {
            await authClient.updateUser({
                name: validateData.data.name,
            })
        }

        if (user.email !== validateData.data.email) {
            await authClient.changeEmail({
                newEmail: validateData.data.email,
            })
        }

        toogleChangeInfos(isChangePersonnalInfos, setIsChangePersonnalInfos)
    };

    return (
        <>
            <HeadingSection text={"Informations personnelles"}
                onClick={handleChangeinfos}
                textButton={"Enregistrer"}
            />
            <form className="flex flex-col gap-3">
                <label className="text-sm">
                    Votre nom
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        id="name"
                        type="name"
                        name="name"
                        placeholder="Entrez votre nom"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {formErrors.name && <p className="text-red text-sm">{formErrors.name[0]}</p>}
                </label>
                <label className="text-sm">
                    Votre email
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Entrez votre email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {formErrors.email && <p className="text-red text-sm">{formErrors.email[0]}</p>}
                </label>
            </form>
        </>
    )
}