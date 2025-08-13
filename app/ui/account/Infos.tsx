import { cabinBold } from "@/app/ui/fonts";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import { User } from "@/app/lib/definitions";
import HeadingSection from "@/app/ui/account/HeadingSection";
import ContainerInfos from "@/app/ui/account/ContainerInfos";
import { useState } from "react";
import ChangePersonalInfos from "@/app/ui/account/personal-infos/UpdatePersonalInfos";
import { toogleChangeInfos } from "@/app/utils/utils";
import PersonalInfos from "./personal-infos/PersonnalInfos";
import Address from "./adress/Addresses";

export default function Infos({ user }: { user: User }) {
    const [isChangePersonnalInfos, setIsChangePersonnalInfos] = useState<boolean>(false)
    const [isChangeAdress, setIsChangeAdress] = useState<boolean>(false)
    const [isChangePayment, setIsChangePayment] = useState<boolean>(false)
    const [isChangeMDP, setIsChangeMDP] = useState<boolean>(false)

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
                        <ChangePersonalInfos
                            user={user}
                            isChangePersonnalInfos={isChangePersonnalInfos}
                            setIsChangePersonnalInfos={setIsChangePersonnalInfos}
                        />
                    )}
            </ContainerInfos>
            <ContainerInfos>
                <Address
                    isChangeAdress={isChangeAdress}
                    setIsChangeAdress={setIsChangeAdress}
                    userId={user.id}
                />
            </ContainerInfos>
            <ContainerInfos>
                <HeadingSection
                    text={"Information de paiement"}
                    onClick={() => toogleChangeInfos(isChangePayment, setIsChangePayment)}
                    textButton="Modifier"
                />
                <p>Vous n&apos;avez pas ajouté de moyen de paiement</p>
            </ContainerInfos>
            <ContainerInfos>
                <HeadingSection
                    text={"Changer le mot de passe"}
                    onClick={() => toogleChangeInfos(isChangeMDP, setIsChangeMDP)}
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