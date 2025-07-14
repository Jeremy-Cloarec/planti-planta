import {cabinBold} from "@/app/ui/fonts";
import ButtonChangeInfo from "@/app/ui/buttons/ButtonChangeInfo";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import {User} from "@/app/lib/definitions";

export default function Infos ({user}: { user: User}) {
    return (
        <section className="px-3 flex flex-col gap-3">
            <div className="p-3 ring-1 ring-slate-200 rounded-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 className={`${cabinBold.className}`}>Informations personnelles</h2>
                    <ButtonChangeInfo />
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                    <p>{user.name}</p>
                </div>
                <div>
                    <p className={`${cabinBold.className} text-sm`}>Mail : </p>
                    <p>{user.email}</p>
                </div>
            </div>
            <div className="p-3 ring-1 ring-slate-200 rounded-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 className={`${cabinBold.className}`}>Supprimer le compte</h2>
                    <ButtonDeleteUser/>
                </div>
            </div>
        </section>
    )
}