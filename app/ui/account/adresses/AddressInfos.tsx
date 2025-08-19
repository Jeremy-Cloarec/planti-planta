import { AddressType } from "@/app/lib/definitions";
import { cabinBold } from "../../fonts";
import ContainerInfos from "../ContainerInfos";
import HeadingSection from "../HeadingSection";

type ChangePersonalInfosProps = {
    a: AddressType,
    index: number,
    isChangeAdresses: { [key: number]: boolean },
    toogleAddresses: (index: number, value: boolean) => void
}
export default function AddressesInfos({ a, index, isChangeAdresses, toogleAddresses }: ChangePersonalInfosProps) {
    return (
        <ContainerInfos>
            <div key={a.id} className="flex flex-col gap-3">
                <HeadingSection text={a.nameAddress}
                    onClick={() => toogleAddresses(index, isChangeAdresses[index])}
                    textButton="Modifier"
                    as="h3"
                    style="text-sm"
                />
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