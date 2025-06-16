import { UserIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"
import { useState } from "react"

export default function Nav({ numberOfPlants }: { numberOfPlants: string }) {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const notif = (
        <div className="absolute -right-2 -top-1 bg-[#c1aeda] text-sm text-dark h-5 w-5 text-center rounded-full">
            {numberOfPlants}
        </div>
    )

    const menuIcon = showMenu ? (
        <XMarkIcon className="size-8 md:hidden cursor-pointer" />
    ) : (
        <Bars3Icon className="size-8 md:hidden cursor-pointer" />
    )

    return (
        <nav className='w-full fixed top-0 z-30'>
            <div className="flex items-center justify-between bg-[#ffffff97] border-b border-violetLight px-4 h-16 relative">
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
                        flex flex-col h-32 absolute justify-between top-16 text-center bg-white w-full left-0 py-3 border-b border-violetLight 
                        overflow-hidden transition-all duration-700 ease-in-out
                        ${showMenu ? 'text-lg max-h-32 opacity-100' : 'max-h-0 opacity-0 text-[0px]'}

                        md:relative  md:top-0 md:justify-center md:items-center md:gap-5 md:flex-row md:bg-transparent md:border-none md:opacity-100 md:text-lg  
                    `}>
                    <li className="hover:text-violet transition duration-300 uppercase">
                        <Link
                            key={"Plantes"}
                            href="/"
                        >
                            Plantes
                        </Link>
                    </li>
                    <li className="hover:text-violet transition duration-300 uppercase">
                        <Link
                            key={"Qui suis-je ?"}
                            href="/qui-suis-je"
                        >
                            Qui suis-je ?
                        </Link>
                    </li>
                    <li className="hover:text-violet transition duration-300 uppercase">
                        <Link
                            key={"Contact"}
                            href="/contact"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                <ul className="flex gap-4">
                    <li className="hover:text-violet transition duration-300">
                        <Link
                            key={"Sign In"}
                            href="/sign-in"
                            className="flex flex-col items-center">
                            <UserIcon className="size-8" />
                            <span className="text-xs">Connexion</span>
                        </Link>
                    </li>
                    <li className="hover:text-violet transition duration-300 relative">
                        {numberOfPlants != "0" && notif}
                        <Link
                            key={"Panier"}
                            href="/panier"
                            className="flex flex-col items-center">
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
