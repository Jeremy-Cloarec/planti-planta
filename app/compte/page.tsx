import Nav from "../ui/nav/Nav";
import Footer from "../ui/Footer";
import {cormorant, cabinBold} from "../ui/fonts";
import {auth} from "@/app/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import ButtonLogout from "@/app/ui/buttons/ButtonLogout";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";
import ButtonChangeInfo from "@/app/ui/buttons/ButtonChangeInfo";

export default async function UserAccount() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <>
            <Nav/>
            <header className="px-3 mt-[72px] w-full py-6 flex items-center justify-between max-w-[768px]">
                <h1 className={`${cormorant.className} text-3xl`}>Mon compte</h1>
                <ButtonLogout/>
            </header>
            <main className="w-full flex-1 max-w-[768px]">
                <section className="bg-green p-3 flex gap-3  justify-center items-center md:mx-3 md:rounded-xs mb-6">
                    <button className="underline underline-offset-2">Mes infos</button>
                    <button>Mes Commandes</button>
                </section>
                <section className="px-3 flex flex-col gap-3">
                    <div className="p-3 ring-1 ring-slate-200 rounded-xs flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className={`${cabinBold.className}`}>Informations personnelles</h2>
                         <ButtonChangeInfo />
                        </div>
                        <div>
                            <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                            <p>{session.user.name}</p>
                        </div>
                        <div>
                            <p className={`${cabinBold.className} text-sm`}>Mail : </p>
                            <p>{session.user.email}</p>
                        </div>
                    </div>
                    <div className="p-3 ring-1 ring-slate-200 rounded-xs flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className={`${cabinBold.className}`}>Supprimer le compte</h2>
                            <ButtonDeleteUser/>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}
