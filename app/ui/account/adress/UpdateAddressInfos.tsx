import { AddressType } from "@/app/lib/definitions";
import ContainerInfos from "../ContainerInfos";
import ButtonChangeInfo from "../../buttons/ButtonChangeInfo";
import { updateAddress } from "@/app/actions/adress.action";
import { useFormState } from "react-dom";

type UpdatePersonalInfosProps = {
    a: AddressType,
    index: number,
    isChangeAdresses: { [key: number]: boolean },
    toogleAddresses: (key: number, value: boolean) => void,
}

export default function UpdatePersonalInfos(
    {
        a,
        index,
        isChangeAdresses,
        toogleAddresses,
    }: UpdatePersonalInfosProps
) {
    const [state, formAction] = useFormState(updateAddress, { success: false, errors: {} })

    return (
        <ContainerInfos>
            <form className="flex flex-col gap-3" action={async (formData) => {
                await formAction(formData)
                if (!state.errors || Object.keys(state.errors).length === 0) {
                    toogleAddresses(index, isChangeAdresses[index])
                }
            }}>
                <input type="hidden" name="id" value={a.id} />
                <ButtonChangeInfo textButton="Enregistrer" />
                <label className="text-sm">
                    Entrez le nom de l'adresse
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        type="text"
                        name="nameAddress"
                        required
                        defaultValue={a.nameAddress}
                    />
                    {state.errors?.nameAddress && <p className="text-red text-sm">{state.errors.nameAddress[0]}</p>}
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

                    {state.errors?.name && <p className="text-red text-sm">{state.errors.name[0]}</p>}
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
                    {state.errors?.address && <p className="text-red text-sm">{state.errors.address[0]}</p>}
                </label>
                <label>
                    Votre code postal
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        type="number"
                        name="postcode"
                        placeholder="Entrez votre code postal"
                        required
                        defaultValue={a.postcode}
                    />
                    {state.errors?.postcode && <p className="text-red text-sm">{state.errors.postcode[0]}</p>}
                </label>
                <label>
                    Votre ville
                    <input
                        className="w-full border-2 border-green px-3 py-2 text-sm focus:outline-2 outline-green placeholder:text-gray-500 mt-2"
                        type="text"
                        name="city"
                        placeholder="Entrez votre ville"
                        required
                        defaultValue={a.city}
                    />
                    {state.errors?.city && <p className="text-red text-sm">{state.errors.city[0]}</p>}
                </label>
            </form>
        </ContainerInfos>
    )
}
