import NavForms from "@/app/ui/nav/NavForms";
import { cabinBold } from "@/app/ui/fonts";
import { UpdatePasswordForm } from "../ui/forms/UpdatePasswordForm";

export default async function UpdatePassword() {
    return (
        <>
            <NavForms content="Retour" hrefString="/infos" />
            <div className="flex-1 flex flex-col justify-center w-full p-3 md:p-4 max-w-2xl" >
                <div className="ring-1 ring-slate-200 rounded-xs p-3">
                    <header className="flex items-center justify-between flex-wrap gap-3">
                        <h1 className={`md:text-lg ${cabinBold.className}`}>Modifier le mot de passe</h1>
                    </header>
                    <main >
                        <UpdatePasswordForm/>
                    </main>
                </div>
            </div>
        </>
    )
}