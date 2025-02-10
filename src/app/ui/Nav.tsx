"use client"
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useContext } from "react"
import { IsShopContext } from "../context/IsShopContext"

export default function Nav() {
    const { setIsShop } = useContext(IsShopContext)

    const handleClick = () => {
        setIsShop(true)
    }

    return (
        <nav className="flex items-center justify-between w-full">
            <a href="#" className="w-fit flex">
                <Image
                    src="/logo.svg"
                    alt="Logo du site : une petite plante mignone "
                    className="w-12 h-auto md:w-16"
                    width={48}
                    height={56}
                />
            </a>
            <ul className="flex gap-3">
                <li>
                    <a href="#">
                        <UserIcon className="size-9 text-dark" />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <MagnifyingGlassIcon className="size-9 text-dark" />
                    </a>
                </li>
                <li>
                    <a href="#" onClick={handleClick}>
                        <ShoppingCartIcon className="size-9 text-dark" />
                    </a>
                </li>
            </ul>
        </nav>
    )
}