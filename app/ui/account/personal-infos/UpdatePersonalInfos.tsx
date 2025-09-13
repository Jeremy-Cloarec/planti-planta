import { useState } from "react";
import { ChangePersonnalInfosShema, FormErrors, User } from "@/app/lib/definitions"
import { authClient } from "@/app/lib/auth-client";
import { cabinBold } from "../../fonts";
import ButtonChangeInfo from "../../buttons/ButtonChangeInfo";

type UpdatePersonalInfosProps = {
    user: User,
    isChangePersonnalInfos: boolean,
    setIsChangePersonnalInfos: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function UpdatePersonalInfos({ user, isChangePersonnalInfos, setIsChangePersonnalInfos }: UpdatePersonalInfosProps) {
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
            user.email = validateData.data.email
        }

        setIsChangePersonnalInfos(false)
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-3">
                <h3 className={`${cabinBold.className}`}>Informations Personnelles</h3>
                <div className="flex md:justify-end gap-3 items-center">
                    <button type="button" className="hover:text-slate-700 text-sm" onClick={() => setIsChangePersonnalInfos(false)}>Annuler</button>
                    <ButtonChangeInfo 
                        textButton="Enregistrer" 
                        onClick={handleChangeinfos}
                        style="w-fit" 
                        />
                </div>
            </div> 
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