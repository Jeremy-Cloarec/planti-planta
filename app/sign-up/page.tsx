import Link from "next/link"
import { SignUpForm } from "../ui/SignUpForm"
import { cabinBold } from "../ui/fonts"
import NavForms from "../ui/nav/NavForms"

export default function SignUpPage() {
    return (
        <>
            <NavForms />
            <div className="flex-1 flex flex-col justify-center w-full p-4 max-w-2xl" >
                <div className="ring-1 ring-slate-200 rounded-sm p-3">
                    <header className="flex items-center justify-between flex-wrap gap-3">
                        <h1 className={`${cabinBold.className} text-lg`}>Inscription</h1>
                        <p className='text-sm'>Déjà un compte ? <Link href={'./sign-in'}><span className={`${cabinBold.className} hover:opacity-80 transition-all duration-300`}> Connectez-vous </span></Link></p>
                    </header>
                    <main >
                        <SignUpForm />
                    </main>
                </div>
            </div>
        </>
    )
}