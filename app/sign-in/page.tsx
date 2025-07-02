import { SignInForm } from "@/app/ui/SignInForm"
import NavForms from "../ui/nav/NavForms"
import Link from "next/link"
import { cabinBold } from "../ui/fonts"

export default function SignInPage() {
    return (
        <>
            <NavForms />
            <div className="flex-1 flex flex-col justify-center w-full p-3 md:p-4 max-w-2xl" >
                <div className="ring-1 ring-slate-200 rounded-xs p-3">
                    <header className="flex items-center justify-between flex-wrap gap-3">
                        <h1 className={`md:text-lg ${cabinBold.className}`}>Connexion</h1>
                        <p className='text-sm'>Pas encore de compte ? <Link href={'./sign-up'}><span className={`${cabinBold.className} hover:opacity-80 transition-all duration-300`}> Inscrivez-vous </span></Link></p>
                    </header>
                    <main >
                        <SignInForm />
                    </main>
                </div>
            </div>
        </>
    )
}