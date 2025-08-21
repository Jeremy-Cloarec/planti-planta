import { createAddress } from "@/app/actions/adress.action"
import ButtonChangeInfo from "../../buttons/ButtonChangeInfo"
import { useActionState, useEffect } from "react"
import { AddressFormState } from "@/app/lib/definitions"
import { cabinBold } from "../../fonts"
import { v4 as uuidv4 } from 'uuid'

type CreateAddressInfosProps = {
    setIsCreateAddress: (isCreate: boolean) => void
    setIsChangeAdresses: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    userId: string
}
export default function CreateAddressInfos({ setIsCreateAddress, userId, setIsChangeAdresses }: CreateAddressInfosProps) {
    const [state, formAction] = useActionState<AddressFormState, FormData>(
        createAddress, { success: false, errors: {} }
    )
    
    useEffect(() => {
        console.log(state.message)
        console.log(state.success)
        console.log(state.errors)        

        if (state.success && state.fields) {
            setIsChangeAdresses(prev => ({
                ...prev,
                [String(state.fields?.id)]: false,
            }))            
            setIsCreateAddress(false)
            console.log(state.fields);
        }
    }, [state])

    return (
        <form className="flex flex-col gap-3" action={formAction}>
            <input type="hidden" name="userId" value={userId} />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-3">
                <h3 className={`${cabinBold.className}`}>Ajouter une adresse </h3>
                <div className="flex md:justify-end gap-3 items-center">
                    <button type="button" className="hover:text-slate-700 text-sm" onClick={() => setIsCreateAddress(false)}>Annuler</button>
                    <ButtonChangeInfo textButton="Enregistrer" style="w-fit" />
                </div>
            </div>
            <label className="text-sm">
                Entrez le nom de l'adresse
                <input
                    className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                    type="text"
                    name="nameAddress"
                    placeholder="Entrer le nom de l'adresse"
                    required
                    defaultValue={(state?.fields?.nameAddress as string) || ""}
                />
                {state?.errors?.nameAddress && <p className="text-red text-sm">{state.errors.nameAddress[0]}</p>}
            </label>
            <label className="text-sm">
                Votre nom
                <input
                    className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                    type="text"
                    name="name"
                    placeholder="Entrez votre nom"
                    required
                    defaultValue={(state?.fields?.name as string) || ""}
                />

                {state?.errors?.name && <p className="text-red text-sm">{state.errors.name[0]}</p>}
            </label>
            <label className="text-sm">
                Votre adresse
                <input
                    className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                    type="text"
                    name="address"
                    placeholder="Entrez votre adresse"
                    required
                    defaultValue={(state?.fields?.address as string) || ""}
                />
                {state?.errors?.address && <p className="text-red text-sm">{state.errors.address[0]}</p>}
            </label>
            <label className="text-sm">
                Votre code postal
                <input
                    className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                    type="number"
                    name="postcode"
                    placeholder="Entrez votre code postal"
                    required
                    defaultValue={(state?.fields?.postcode as string) || ""}
                />
                {state?.errors?.postcode && <p className="text-red text-sm">{state.errors.postcode[0]}</p>}
            </label>
            <label className="text-sm">
                Votre ville
                <input
                    className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                    type="text"
                    name="city"
                    placeholder="Entrez votre ville"
                    required
                    defaultValue={(state?.fields?.city as string) || ""}
                />
                {state?.errors?.city && <p className="text-red text-sm">{state.errors.city[0]}</p>}
            </label>
        </form>

    )
}