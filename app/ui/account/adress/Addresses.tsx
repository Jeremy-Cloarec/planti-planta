import { toogleChangeInfos } from "@/app/utils/utils"
import { AddressType } from "@/app/lib/definitions"
import { use, useEffect, useState } from "react"
import { cabinBold } from "../../fonts"
import HeadingSection from "../HeadingSection"
import ContainerInfos from "../ContainerInfos"

type AddressesProps = {
    addressPromise: Promise<AddressType[]>,
}

export default function Address({ addressPromise }: AddressesProps) {
    const addresses = use(addressPromise)
    const [isChangeAdresses, setIsChangeAdresses] = useState<{ [key: number]: boolean }>({ 0: true })

    function updateAddressesChangeObject() {
        const object: { [key: number]: boolean } = {}
        for (let i = 0; i < addresses.length; i++) {
            object[i] = true
        }
        setIsChangeAdresses(object)
    }

    useEffect(() => {
        updateAddressesChangeObject()
    }, [])

    const toogleAddresses = (key: number, value: boolean) => {
        setIsChangeAdresses({
            ...isChangeAdresses,
            [key]: !value
        })
    }

    const handleUpdatedAddresses = (key: number, value: boolean) => {
        toogleAddresses(key, value)
    }

    useEffect(() => {
        console.log(isChangeAdresses);
    }, [isChangeAdresses])

    if (!addresses || addresses.length === 0) return (
        <>
            <HeadingSection
                text={"Adresse"}
                onClick={() => alert("ajouter une adresse")}
                textButton="Ajouter"
            />
            <p>Vous n&apos;avez pas encore d&apos;adresse</p>
        </>
    )

    return (
        <div>
            <h2 className={`${cabinBold.className} mb-3`}>Adresses</h2>
            <div className="flex flex-col gap-3">
                {addresses.map((a, index) => (
                    <>
                        {isChangeAdresses[index] !== false ?
                            (
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
                            ) : (
                                <ContainerInfos>
                                    <HeadingSection text={a.nameAddress}
                                        onClick={() => handleUpdatedAddresses(index, isChangeAdresses[index])}
                                        textButton="Enregistrer"
                                        as="h3"
                                        style="text-sm"
                                    />
                                    <p>Formulaire de modification d&apos;adresse</p>
                                    {/* Ici vous pouvez ajouter le formulaire de modification d'adresse */}
                                </ContainerInfos>
                            )}
                    </>
                ))}
            </div>
        </div>

    )
}