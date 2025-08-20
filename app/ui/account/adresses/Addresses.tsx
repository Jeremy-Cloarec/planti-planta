import { AddressType } from "@/app/lib/definitions"
import { Fragment, use, useEffect, useState } from "react"
import { cabinBold } from "../../fonts"
import HeadingSection from "../HeadingSection"
import AddressesInfos from "./GetAddressInfos"
import UpdateAddressInfos from "./UpdateAddressInfos"
import CreateAddressInfos from "./CreateAdressInfos"

type AddressesProps = {
    addressPromise: Promise<AddressType[]>,
    userId: string
}

export default function Addresses({ addressPromise, userId }: AddressesProps) {
    const addresses = use(addressPromise)
    const [isChangeAdresses, setIsChangeAdresses] = useState<{ [key: string]: boolean }>(() =>
        Object.fromEntries(addresses.map((a) => [a.id, false])))
    const [isCreateAddress, setIsCreateAddress] = useState(false)

    const toogleAddresses = (key: string, value: boolean) => {
        setIsChangeAdresses({
            ...isChangeAdresses,
            [key]: !value
        })
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

    if (isCreateAddress) {
        return (
            <CreateAddressInfos
                setIsCreateAddress={setIsCreateAddress}
                userId={userId}
                setIsChangeAdresses={setIsChangeAdresses}
            />
        )
    }

    return (
        <>
            <h2 className={`${cabinBold.className} mb-3`}>Adresses</h2>
            <div className="flex flex-col gap-3">
                {addresses.map((a, index) => (
                    <Fragment key={a.id}>
                        {isChangeAdresses[a.id] === false ?
                            (
                                <AddressesInfos
                                    a={a}
                                    index={index}
                                    isChangeAdresses={isChangeAdresses}
                                    toogleAddresses={toogleAddresses}
                                />
                            ) : (
                                <UpdateAddressInfos
                                    a={a}
                                    index={index}
                                    isChangeAdresses={isChangeAdresses}
                                    toogleAddresses={toogleAddresses}
                                />
                            )}
                    </Fragment>
                ))}
            </div>
            <button
                className={`self-start ${cabinBold.className} 0hover:text-slate-700 text-sm`}
                onClick={() => setIsCreateAddress(true)}
            >
                + Ajouter une adresse
            </button>
        </>
    )
}