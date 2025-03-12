"use client"
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { IsShopContext } from "app/context/IsShopContext"
import { StoreContext } from "../context/StoreContext"
import { storeScrollPosition } from "../functions/functions"
import Link from "next/link"

export default function Nav() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants } = useContext(StoreContext)
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

    const handleShopClick = () => {
        storeScrollPosition()
        setIsShop(true)
    }

    const handleSearchClick = () => {
        alert('La recherche est en cours de construction')
    }


    const countStoreProduct = () => {
        const productNumberStore = storePlants.reduce((prev, curr) => prev + curr.quantity, 0)
        return productNumberStore
    }

    const notif = (
        <div className="absolute -right-2 -top-1 bg-greenLight text-sm h-5 w-5 text-center rounded-full">
            {countStoreProduct()}
        </div>
    )

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
            <ul className="flex gap-3">
                <li>
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        <UserIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </Link>
                </li>
                <li onClick={handleSearchClick}>
                    <a href="#">
                        <MagnifyingGlassIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </a>
                </li>
                <li className="relative" onClick={handleShopClick}>
                    {storePlants.length > 0 && notif}
                    <a href="#">
                        <ShoppingCartIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </a>
                </li>
            </ul>
        </nav>
    )
}
