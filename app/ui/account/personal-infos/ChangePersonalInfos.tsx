import { useState } from "react";
import { User } from "@/app/lib/definitions"
import H2Section from "../H2Section";
import { toogleChangeInfos } from "@/app/utils/utils";
import { authClient } from "@/app/lib/auth-client";

type ChangePersonalInfosProps = {
    user: User,
    isChangePersonnalInfos: boolean,
    setIsChangePersonnalInfos: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function ChangePersonalInfos({ user, isChangePersonnalInfos, setIsChangePersonnalInfos }: ChangePersonalInfosProps) {
    const [name, setName] = useState<string>(user.name);
    const handleChangeinfos = async () => {
        await authClient.updateUser({
            name : name
        })        
    };

    return (
        <>
            <H2Section text={"Informations personnelles"}
                onClick={() => {
                    handleChangeinfos()
                    toogleChangeInfos(isChangePersonnalInfos, setIsChangePersonnalInfos)
                }}
                textButton={"Enregistrer"}
            />
            <form>
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
                </label>
            </form>
        </>
    )
}