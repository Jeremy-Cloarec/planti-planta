import {cabinBold} from "@/app/ui/fonts";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import {User} from "@/app/lib/definitions";
import H2Section from "@/app/ui/account/H2Section";
import ContainerInfos from "@/app/ui/account/ContainerInfos";
import {useState} from "react";
import ChangePersonalInfos from "@/app/ui/account/ChangePersonalInfos";
import {toogleChangeInfos} from "@/app/utils/utils";

export default function Infos({user}: { user: User }) {
    const [isChangePersonnalInfos, setIsChangePersonnalInfos] = useState<boolean>(false)
    const [isChangeAdress, setIsChangeAdress] = useState<boolean>(false)
    const [isChangePayment, setIsChangePayment] = useState<boolean>(false)
    const [isChangeMDP, setIsChangeMDP] = useState<boolean>(false)


    return (
        <section className="px-3 flex flex-col gap-3">
            <ContainerInfos>
                {!isChangePersonnalInfos ?
                    (
                        <>
                            <H2Section text="Informations personnelles"
                                       onClick={() => toogleChangeInfos(isChangePersonnalInfos, setIsChangePersonnalInfos)}
                            />
                            <div>
                                <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <p className={`${cabinBold.className} text-sm`}>Mail : </p>
                                <p>{user.email}</p>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <H2Section text={"Informations personnelles"}
                                       onClick={() => toogleChangeInfos(isChangePersonnalInfos, setIsChangePersonnalInfos)}
                                       textButton={"Enregistrer"}
                            />
                            <ChangePersonalInfos user={user}/>
                        </>

                    )}
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Adresse"} onClick={() => toogleChangeInfos(isChangeAdress, setIsChangeAdress)}/>
                <p>Vous n&apos;avez pas encore d&apos;adresse</p>
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Information de paiement"}
                           onClick={() => toogleChangeInfos(isChangePayment, setIsChangePayment)}
                />
                <p>Vous n&apos;avez pas ajouté de moyen de paiement</p>
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Changer le mot de passe"} onClick={() => toogleChangeInfos(isChangeMDP, setIsChangeMDP)}/>
            </ContainerInfos>
            <ContainerInfos>
                <div className="flex items-center justify-between">
                    <h2 className={`${cabinBold.className}`}>Supprimer le compte</h2>
                    <ButtonDeleteUser/>
                </div>
            </ContainerInfos>
        </section>
    )
}