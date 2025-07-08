
import Footer from "../ui/Footer";
import Nav from "../ui/nav/Nav";
import {ResetPasswordForm} from "@/app/ui/ResetPasswordForm";

export default async function ReinitialiserMotDePasse() {
    return (
        <>
            <Nav />
            <main className="flex-1 flex flex-col justify-center pt-[72px]">
                <h1>Réinitialiser le mot de passe</h1>
                <ResetPasswordForm />
            </main>
            <Footer />
        </>
    )
}