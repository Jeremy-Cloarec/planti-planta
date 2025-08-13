import { AddressType } from "@/app/lib/definitions"
import { Fragment, use, useEffect, useState } from "react"
import { cabinBold } from "../../fonts"
import HeadingSection from "../HeadingSection"
import ChangePersonalInfos from "./AddressInfos"
import UpdatePersonalInfos from "./UpdateAddressInfos"

type AddressesProps = {
    addressPromise: Promise<AddressType[]>,
}

export default function Address({ addressPromise }: AddressesProps) {
    const addresses = use(addressPromise)
    const [isChangeAdresses, setIsChangeAdresses] = useState<{ [key: number]: boolean }>(() =>
        Object.fromEntries(addresses.map((_, i) => [i, false])))

    const toogleAddresses = (key: number, value: boolean) => {
        setIsChangeAdresses({
            ...isChangeAdresses,
            [key]: !value
        })
    }

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
                    <Fragment key={a.id}>
                        {isChangeAdresses[index] === false ?
                            (
                                <ChangePersonalInfos
                                    a={a}
                                    index={index}
                                    isChangeAdresses={isChangeAdresses}
                                    toogleAddresses={toogleAddresses}
                                />
                            ) : (
                                <UpdatePersonalInfos
                                    a={a}
                                    index={index}
                                    isChangeAdresses={isChangeAdresses}
                                    toogleAddresses={toogleAddresses}
                                />
                            )}
                    </Fragment>
                ))}
            </div>
        </div>

    )
}