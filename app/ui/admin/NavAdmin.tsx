"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { usePathname } from "next/navigation"
import { LogoLink } from "../nav/LogoLink"
import ButtonLogout from "../buttons/ButtonLogout"

export default function NavAdmin() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isNav, setIsNav] = useState(false)
    const pathname = usePathname()
    console.log(pathname);


    const handleIsNav = () => setIsNav(!isNav)

    const iconMenu = isNav ? <XMarkIcon width={24} /> : <Bars3Icon width={24} />

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        };

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const links = [
        {
            key: "Plantes",
            href: "/admin/plantes"
        },
        {
            key: "Utilisateurs",
            href: "/admin/utilisateurs"
        },
        {
            key: "Commandes",
            href: "/admin/commandes"
        },
    ]

    const navClass = isNav ? "flex" : "hidden sm:flex"

    return (
        <nav className={`transition duration-500 flex items-center justify-between w-full fixed top-0 px-[18px] md:px-[25px] py-2 z-30 bg-white ${isScrolled && "shadow-md shadow-dark/10"}`}>
            <LogoLink isScrolled={isScrolled} />
            <div
                className="z-40 sm:hidden cursor-pointer"
                onClick={handleIsNav}
            >
                {iconMenu}
            </div>
            <ul className={
                `${navClass} flex-col gap-4 items-center absolute top-0 right-0 bg-white w-full pt-16 pb-6 shadow-md shadow-dark/10 
                sm:static sm:flex-row sm:w-fit sm:pt-0 sm:shadow-none sm:pb-0 sm:gap-6`
            }>
                {links.map(link =>
                    <li className="text-xl" key={link.key}>
                        <Link
                            className={`h-[44px] block leading-[44px] border-b-4   ${pathname === link.href ? "border-green hover:border-green" : "border-transparent hover:border-greenLight"} duration-300 transition-all hover:border-greenLight`}
                            key={link.key}
                            href={link.href}
                            onClick={handleIsNav}
                        >
                            {link.key}

                        </Link>
                    </li>
                )}
                <li className="text-xl mt-4 sm:mt-0 sm:ml-4">
                    <ButtonLogout />
                </li>
            </ul>
        </nav>
    )
}
