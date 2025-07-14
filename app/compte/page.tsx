import Nav from "../ui/nav/Nav";
import Footer from "../ui/Footer";
import {cormorant} from "../ui/fonts";
import {auth} from "@/app/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import ButtonLogout from "@/app/ui/buttons/ButtonLogout";
import ToggleSection from "@/app/ui/account/ToggleSection";
import {User} from "@/app/lib/definitions";

export default async function UserAccount() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    const user: User = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email
    }

    return (
        <>
            <Nav/>
            <header className="px-3 mt-[72px] w-full py-6 flex items-center justify-between max-w-[768px]">
                <h1 className={`${cormorant.className} text-3xl`}>Mon compte</h1>
                <ButtonLogout/>
            </header>
            <main className="w-full flex-1 max-w-[768px]">
               <ToggleSection user={user} />
            </main>
            <Footer/>
        </>
    )
}
