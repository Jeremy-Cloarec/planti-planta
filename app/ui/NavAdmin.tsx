"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { logout } from "@/app/actions"
import Button from "./Button"
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid"

export default function NavAdmin() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isNav, setIsNav] = useState(false)

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
            href: "/plantes"
        },
        {
            key: "Utilisateurs",
            href: "/utilisateurs"
        },
        {
            key: "Commandes",
            href: "/commandes"
        },
    ]

    const navClass = isNav ? "flex" : "hidden sm:flex"

    return (
        <nav className={`transition duration-500 flex items-center justify-between w-full fixed top-0 px-[18px] md:px-[25px] py-2 z-30 bg-white ${isScrolled && "shadow-md shadow-dark/10"}`}>
            <Link
                key="Home"
                href="/"
                className="w-fit flex z-40">
                <Image
                    src="/logo.svg"
                    alt="Logo du site : une petite plante mignone "
                    className={`transition-all duration-500 min-w-9 mr-3 ${isScrolled ? "w-9 md:w-13" : "w-12 md:w-16"}`}
                    width={48}
                    height={56}
                />
            </Link>
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
                    <li className="text-xl">
                        <Link
                            className="h-[44px] block leading-[44px] border-b-4 border-transparent duration-300 transition-all hover:border-greenLight"
                            key={link.key}
                            href={link.href}>
                            {link.key}
                        </Link>
                    </li>
                )}
                <li className="text-xl mt-4 sm:mt-0 sm:ml-4">
                    <Button
                        text="Se déconnecter"
                        handleClick={logout}
                    />
                </li>
            </ul>
        </nav>
    )
}
