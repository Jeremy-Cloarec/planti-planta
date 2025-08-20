import { AddressType } from "@/app/lib/definitions";
import { cabinBold } from "../../fonts";
import ContainerInfos from "../ContainerInfos";
import ButtonChangeInfo from "../../buttons/ButtonChangeInfo";
import { deleteAddress } from "@/app/actions/adress.action";

type ChangePersonalInfosProps = {
    a: AddressType,
    isChangeAdresses: { [key: string]: boolean },
    toogleAddresses: (index: string, value: boolean) => void
    setIsChangeAdresses: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,

}
export default function AddressesInfos({ a, toogleAddresses, setIsChangeAdresses }: ChangePersonalInfosProps) {
    const handleDeleteAddress = (id: string) => {
        deleteAddress(a.id)
        setIsChangeAdresses(prev => {
            const { [id]: _, ...rest } = prev
            return rest
        });
    }

    return (
        <ContainerInfos>
            <div key={a.id} className="flex flex-col gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-wrap gap-3">
                    <h3 className={`${cabinBold.className}`}>Modifier l'adresse {a.nameAddress}</h3>
                    <div className="flex md:justify-end gap-3 items-center">
                        <button type="button"
                            className="hover:text-slate-700 text-sm"
                            onClick={() => { handleDeleteAddress(a.id) }}
                        >
                            Supprimer
                        </button>
                        <ButtonChangeInfo textButton="Modifier" style="w-fit" onClick={() => toogleAddresses(a.id, true)} />
                    </div>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                    <p>{a.name}</p>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Rue : </p>
                    <p>{a.address}</p>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Code Postal : </p>
                    <p>{a.postcode}</p>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Ville : </p>
                    <p>{a.city}</p>
                </div>
            </div>
        </ContainerInfos>
    )
}