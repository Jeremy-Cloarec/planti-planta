import Nav from "../ui/nav/Nav";
import Footer from "../ui/Footer";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cormorant } from "@/app/ui/fonts";

export default async function Commandes() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in")
    }

    return (
        <>
            <Nav />
            <header className="px-3 mt-[72px] w-full py-6 flex items-center max-w-[768px]">
                <h1 className={`${cormorant.className} text-3xl`}>Mes commandes</h1>
            </header>
            <main className="w-full flex-1 max-w-[768px]">
                <p className="px-3">Vous n'avez pas encore de commandes</p>
            </main>
            <Footer />
        </>
    )
}
