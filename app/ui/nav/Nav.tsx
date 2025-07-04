import { UserIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"
import { useState } from "react"
import { usePathname } from "next/navigation"

const links = [
    {
        key: "Plantes",
        href: "/",
        text: "Plantes",
    },
    {
        key: "Qui suis-je ?",
        href: "/qui-suis-je",
        text: "Qui suis-je ?",
    },
    {
        key: "Contact",
        href: "/contact",
        text: "Contact",
    },
]

export default function Nav({ numberOfPlants }: { numberOfPlants: string }) {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const notif = (
        <div className="absolute -right-2 -top-1 bg-violet-light text-sm text-dark h-5 w-5 text-center rounded-full z-20">
            {numberOfPlants}
        </div>
    )

    const menuIcon = showMenu ? (
        <XMarkIcon className="size-8 md:hidden " />
    ) : (
        <Bars3Icon className="size-8 md:hidden " />
    )

    const pathname = usePathname()

    return (
        <nav className='w-full fixed top-0 z-30'>
            <div className="flex items-center justify-between bg-white border-b border-slate-200 p-3 md:p-4 h-16 relative">
                <div className="flex items-center gap-1">
                    <button
                        role="Ouvrir ou fermer le menu"
                        onClick={toggleMenu}
                    >
                        {menuIcon}
                    </button>
                    <LogoLink />
                </div>
                <ul className={`
                        flex flex-col h-32 absolute justify-between top-16 text-center bg-white w-full left-0 py-3 border-b border-slate-200 
                        overflow-hidden transition-all duration-700 ease-in-out
                        ${showMenu ? 'text-base max-h-32 opacity-100' : 'max-h-0 opacity-0 text-[0px]'}

                        md:relative  md:top-0 md:justify-center md:items-center md:gap-5 md:flex-row md:bg-transparent md:border-none md:opacity-100 md:text-base  
                    `}>
                    {
                        links.map(link =>
                            <li key={link.key}>
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className={`hover:text-violet transition duration-300 uppercase ${pathname === link.href ? "text-violet" : "text-dark"}`}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        )
                    }
                </ul>
                <ul className="flex gap-4">
                    <li>
                        <Link
                            key={"Sign In"}
                            href="/sign-in"
                            className={`hover:text-violet transition duration-300 flex flex-col items-center ${pathname === "/sign-in" ? "text-violet" : "text-dark"}`}>
                            <UserIcon className="size-8" />
                            <span className="text-xs">Connexion</span>
                        </Link>
                    </li>
                    <li className="relative">
                        {numberOfPlants != "0" && notif}
                        <Link
                            key={"Panier"}
                            href="/panier"
                            className={`z-10 flex flex-col items-center hover:text-violet transition duration-300 relative ${pathname === "/panier" ? "text-violet" : "text-dark"}`}>
                            <ShoppingCartIcon
                                className="size-8" />
                            <span className="text-xs">Panier</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
