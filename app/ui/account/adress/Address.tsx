import { toogleChangeInfos } from "@/app/utils/utils"
import H2Section from "../H2Section"
import { useQuery } from "@tanstack/react-query"
import { Adress } from "@/app/lib/definitions"

type AddressProps = {
    userId: string,
    isChangeAdress: boolean,
    setIsChangeAdress: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function Address({ userId, isChangeAdress, setIsChangeAdress }: AddressProps) {
    const { isPending, error, data } = useQuery({
        queryKey: ['address'],
        queryFn: () => fetch(`/api/address/?userId=${userId}`).then(res => res.json())
    })

    if (isPending) return <div>Chargement...</div>

    if (error) return <div>Un erreur est survenue: {error.message}</div>

    const address: Adress[] = data
    console.log(address)

    return (
        <>
            {
                address && address.length === 0 ?
                    (
                        <>
                            <H2Section
                                text={"Adresse"}
                                onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}
                                textButton="Ajouter"
                            />
                            <p>Vous n&apos;avez pas encore d&apos;adresse</p>
                        </>

                    ) :
                    (
                        <>
                            <h2>Adresses</h2>
                        </>
                    )

            }
        </>
    )
}