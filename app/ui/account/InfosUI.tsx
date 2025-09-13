"use client"

import { cabinBold } from "@/app/ui/fonts";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import { AddressType, User } from "@/app/lib/definitions";
import ContainerInfos from "@/app/ui/account/ContainerInfos";
import { Suspense, useState } from "react";
import UpdatePersonalInfos from "@/app/ui/account/personal-infos/UpdatePersonalInfos";
import PersonalInfos from "./personal-infos/PersonnalInfos";
import Addresses from "./adresses/Addresses";
import { authClient } from "@/app/lib/auth-client";
import HeadingSection from "./HeadingSection";

export default function InfosUI({ addressPromise }: { addressPromise: Promise<AddressType[]> }) {
    const [isChangePersonnalInfos, setIsChangePersonnalInfos] = useState<boolean>(false)
    const [isChangePayment, setIsChangePayment] = useState<boolean>(false)
    const [isChangeMDP, setIsChangeMDP] = useState<boolean>(false)

    const { data: session } = authClient.useSession()

    if (!session) {
        return null
    }

    const user: User = {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email
    }

    return (
        <section className="px-3 flex flex-col gap-3">
            <ContainerInfos>
                {!isChangePersonnalInfos ?
                    (
                        <PersonalInfos
                            user={user}
                            isChangePersonnalInfos={isChangePersonnalInfos}
                            setIsChangePersonnalInfos={setIsChangePersonnalInfos}
                        />
                    ) :
                    (
                        <UpdatePersonalInfos
                            user={user}
                            isChangePersonnalInfos={isChangePersonnalInfos}
                            setIsChangePersonnalInfos={setIsChangePersonnalInfos}
                        />
                    )}
            </ContainerInfos>
            <ContainerInfos>
                <Suspense fallback={<div>Chargement des adresses…</div>}>
                    <Addresses
                        addressPromise={addressPromise}
                        userId={user.id}
                    />
                </Suspense>
            </ContainerInfos>
            <ContainerInfos>
                <HeadingSection
                    text={"Information de paiement"}
                    onClick={() => setIsChangePayment(false)}
                    textButton="Modifier"
                />
                <p>Vous n&apos; avez pas ajouté de moyen de paiement</p>
            </ContainerInfos>
            <ContainerInfos>
                <HeadingSection
                    text={"Changer le mot de passe"}
                    onClick={() => setIsChangeMDP(false)}
                    textButton="Modifier"
                />
            </ContainerInfos>
            <ContainerInfos>
                <div className="flex items-center justify-between">
                    <h2 className={`${cabinBold.className}`}>Supprimer le compte</h2>
                    <ButtonDeleteUser />
                </div>
            </ContainerInfos>
        </section>
    )
}