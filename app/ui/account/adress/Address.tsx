import { toogleChangeInfos } from "@/app/utils/utils"
import H2Section from "../H2Section"
import { AddressType } from "@/app/lib/definitions"
import { use } from "react"

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
                <div key={a.id}>
                    <p>{a.name}</p>
                    <p>{a.address} — {a.postcode} {a.city}</p>
                </div>
            ))}
        </div>
    )
}