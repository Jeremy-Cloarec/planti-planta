import { SignInForm } from "@/app/ui/SignInForm";
import Link from "next/link";

export default function SingInPage() {
    return (
        <main className="flex-1 flex flex-col justify-center pt-[72px]">
            <Link href='./'>Accueil</Link>
            <SignInForm />
        </main>
    )
}