import Link from "next/link"
import { LogoLink } from "./LogoLink"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

export default function NavForms({ hrefString = "/", content = "Accueil" }: { hrefString?: string, content?: string }) {
    return (
        <nav className='w-full fixed top-0 left-0 z-30 border-b border-slate-200'>
            <div className="flex items-center justify-center bg-white px-3 md:px-4 h-16 relative max-w-2xl m-auto">
                <Link href={hrefString} className="text-xs flex items-center absolute left-3 gap-2" >
                    <ArrowLeftIcon width={16} />
                    {content}
                </Link>
                <LogoLink />

            </div>
        </nav>
    )
}
