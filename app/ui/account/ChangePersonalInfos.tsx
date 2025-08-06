import {useState} from "react";
import {User} from "@/app/lib/definitions"

export type ChangePersonalInfosProps = {
    user: User,
}

export default function ChangePersonalInfos({
                                                user,
                                            }: ChangePersonalInfosProps) {
    const [name, setName] = useState<string>(user.name)

    return (
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
    )
}