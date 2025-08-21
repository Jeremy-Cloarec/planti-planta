import Nav from "../ui/nav/Nav";
import Footer from "../ui/Footer";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cormorant } from "@/app/ui/fonts";
import InfosUI from "@/app/ui/account/InfosUI";
import { fetchAdress } from "../actions/adress.action";

export default async function Infos() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }

    const addressPromise = fetchAdress(session.user.id)

    return (
        <>
            <Nav />
            <header className="px-3 mt-[72px] w-full py-6 flex items-center max-w-[768px]">
                <h1 className={`${cormorant.className} text-3xl`}>Mes infos</h1>
            </header>
            <main className="w-full flex-1 max-w-[768px]">
                <InfosUI addressPromise={addressPromise} />
            </main>
            <Footer />
        </>
    )
}
