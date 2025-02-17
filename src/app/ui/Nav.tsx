"use client"
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useContext } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { StoreContext } from "../context/StoreContext"

export default function Nav() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants } = useContext(StoreContext)

    const handleShopClick = () => {
        setIsShop(true)
    }

    const handleSearchClick = () => {
        alert('La recherche est en cours de construction')
    }
    const handleUserClick = () => {
        alert('La connexion/inscription est en cours de construction')
    }

    const notif = <div className="absolute -right-2 -top-1 bg-greenLight text-sm h-5 w-5 text-center rounded-full">
        {storePlants.length}
    </div>

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
                <li onClick={handleUserClick}>
                    <a href="#">
                        <UserIcon className="size-9 text-dark" />
                    </a>
                </li>
                <li onClick={handleSearchClick}>
                    <a href="#">
                        <MagnifyingGlassIcon className="size-9 text-dark" />
                    </a>
                </li>
                <li className="relative" onClick={handleShopClick}>
                    {storePlants.length > 0 && notif}
                    <a
                        href="#" >
                        <ShoppingCartIcon className="size-9 text-dark" />
                    </a>
                </li>
            </ul>
        </nav>
    )
}