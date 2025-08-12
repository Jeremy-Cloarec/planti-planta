import { toogleChangeInfos } from "@/app/utils/utils"
import { AddressType } from "@/app/lib/definitions"
import { use } from "react"
import { cabinBold } from "../../fonts"
import HeadingSection from "../HeadingSection"
import ContainerInfos from "../ContainerInfos"

type AddressProps = {
    addressPromise: Promise<AddressType[]>,
    isChangeAdress: boolean,
    setIsChangeAdress: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function Address({ addressPromise, isChangeAdress, setIsChangeAdress }: AddressProps) {
    const addresses = use(addressPromise);

    if (!addresses || addresses.length === 0) return (
        <>
            <HeadingSection
                text={"Adresse"}
                onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}
                textButton="Ajouter"
            />
            <p>Vous n&apos;avez pas encore d&apos;adresse</p>
        </>
    )

    return (
        <div>
            <h2 className={`${cabinBold.className} mb-3`}>Adresses</h2>

            {addresses.map((a) => (
                <ContainerInfos>
                    <div key={a.id} className="flex flex-col gap-3">
                        <HeadingSection text="Adresse 1"
                            onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}
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

            ))}
        </div>

    )
}