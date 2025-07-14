import {cabinBold} from "@/app/ui/fonts";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import {User} from "@/app/lib/definitions";
import H2Section from "@/app/ui/account/H2Section";
import ContainerInfos from "@/app/ui/account/ContainerInfos";

export default function Infos({user}: { user: User }) {
    const handleAlert = () => {
        alert("En cours de developpement")
    }

    return (
        <section className="px-3 flex flex-col gap-3">
            <ContainerInfos>
                <H2Section text="Informations personnelle" onClick={handleAlert}/>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                    <p>{user.name}</p>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Mail : </p>
                    <p>{user.email}</p>
                </div>
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Adresse"} onClick={handleAlert}/>
                <p>Vous n&apos;avez pas encore d&apos;adresse</p>
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Information de paiement"} onClick={handleAlert}/>
                <p>Vous n&apos;avez pas ajouté de moyen de paiement</p>
            </ContainerInfos>
            <ContainerInfos>
                <H2Section text={"Changer le mot de passe"} onClick={handleAlert}/>
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