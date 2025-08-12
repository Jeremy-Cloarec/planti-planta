import { toogleChangeInfos } from "@/app/utils/utils"
import H2Section from "../H2Section"
import { AddressType } from "@/app/lib/definitions"
import { use } from "react"
import { cabinBold } from "../../fonts"

type AddressProps = {
    addressPromise: Promise<AddressType[]>,
    isChangeAdress: boolean,
    setIsChangeAdress: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function Address({ addressPromise, isChangeAdress, setIsChangeAdress }: AddressProps) {
    const addresses = use(addressPromise);

    if (!addresses || addresses.length === 0) return (
        <>
            <H2Section
                text={"Adresse"}
                onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}
                textButton="Ajouter"
            />
            <p>Vous n&apos;avez pas encore d&apos;adresse</p>
        </>
    )

    return (
        <div>
            {addresses.map((a) => (
                <div key={a.id} className="flex flex-col gap-3">
                    <H2Section text="Informations personnelles"
                        onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}
                        textButton="Modifier"
                    />
                    <div>
                        <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                        <p>{a.name}</p>
                    </div>
                    <div>
                        <p className={`${cabinBold.className} text-sm`}>Addresse : </p>
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
            ))}
        </div>
    )
}