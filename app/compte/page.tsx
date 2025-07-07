import Nav from "../ui/nav/Nav";
import {Footer} from "../ui/Footer";
import {cormorant} from "../ui/fonts";
import {auth} from "@/app/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import ButtonLogout from "@/app/ui/buttons/ButtonLogout";
import ButtonDeleteUser from "@/app/ui/buttons/ButtonDeleteUser";

export default async function UserAccount() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <>
            <Nav numberOfPlants={"0"}/>
            <main className="w-full flex-1 pt-[72px]">
                <h1 className={`${cormorant.className} text-3xl`}>Bonjour {session.user.name}</h1>
                <h2>Informations personnelles</h2>
                <p>Mail : {session.user.email} </p>
                <h2>Commandes</h2>
                <ButtonLogout/>
                <ButtonDeleteUser/>
            </main>
            <Footer/>
        </>
    )
}
