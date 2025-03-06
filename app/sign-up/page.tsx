import Link from "next/link"
import { SignUpForm } from "../ui/SignUpForm"
export default function SignUpPage() {
    return (
        <main className="flex-1 flex flex-col justify-center pt-[72px]">
            <Link href='./'>Accueil</Link>
            <SignUpForm />
        </main>
    )
}