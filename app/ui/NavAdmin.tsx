"use client"
import { } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { logout } from "@/app/actions"
import Button from "./Button"

export default function NavAdmin() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        };

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);
    return (
        <nav className={`transition duration-500 flex items-center justify-between w-full fixed top-0 px-[18px] md:px-[25px] py-2 z-30 bg-white ${isScrolled && "shadow-md shadow-dark/10"}`}>
            <Link
                key="Home"
                href="/"
                className="w-fit flex">
                <Image
                    src="/logo.svg"
                    alt="Logo du site : une petite plante mignone "
                    className={`transition-all duration-500 ${isScrolled ? "w-9 md:w-13" : "w-12 md:w-16"}`}
                    width={48}
                    height={56}
                />
            </Link>
            <ul className="flex gap-3 items-center">
                <li>
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        Plantes
                    </Link>
                </li>
                <li>
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        Utilisateurs
                    </Link>
                </li>
                <li>
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        Commandes
                    </Link>
                </li>
                <li >
                    <Button
                        text="Se déconnecter"
                        handleClick={logout}
                    />
                </li>
            </ul>
        </nav>
    )
}
