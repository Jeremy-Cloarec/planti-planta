import { AddressFormState, AddressType } from "@/app/lib/definitions";
import ContainerInfos from "../ContainerInfos";
import ButtonChangeInfo from "../../buttons/ButtonChangeInfo";
import { updateAddress } from "@/app/actions/adress.action";
import { useActionState, useEffect, useState } from "react";
import { cabinBold } from "../../fonts";

type UpdatePersonalInfosProps = {
    a: AddressType,
    toogleAddresses: (key: string, value: boolean) => void,
}

export default function UpdateAddressInfos(
    {
        a,
        toogleAddresses
    }: UpdatePersonalInfosProps
) {

    const [state, formAction] = useActionState<AddressFormState, FormData>(
        updateAddress, { success: false, errors: {} }
    )

    const [cancel, setCancel] = useState<boolean>(false)

    useEffect(() => {
        if (cancel) {
            toogleAddresses(a.id, false);
        }
    }, [cancel]);

    useEffect(() => {
        if (state.success) toogleAddresses(a.id, false)
    }, [state, a.id, toogleAddresses])

    return (
        <ContainerInfos>
            <form className="flex flex-col gap-3" action={formAction}>
                <input type="hidden" name="id" value={a.id} />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-3">
                    <h3 className={`${cabinBold.className}`}>Modifier l&apos; adresse {a.nameAddress}</h3>
                    <div className="flex md:justify-end gap-3 items-center">
                        <button type="button" className="hover:text-slate-700 text-sm" onClick={() => setCancel(true)}>Annuler</button>
                        <ButtonChangeInfo textButton="Enregistrer" style="w-fit" />
                    </div>
                </div>
                <label className="text-sm">
                    Entrez le nom de l&apos; adresse
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        type="text"
                        name="nameAddress"
                        required
                        defaultValue={a.nameAddress}
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
                        defaultValue={a.name}
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
                        defaultValue={a.address}
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
                        defaultValue={a.postcode}
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
                        defaultValue={a.city}
                    />
                    {state?.errors?.city && <p className="text-red text-sm">{state.errors.city[0]}</p>}
                </label>
            </form>
        </ContainerInfos>
    )
}
