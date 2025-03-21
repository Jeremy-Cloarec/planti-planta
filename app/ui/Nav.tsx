"use client"
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import { useContext, useState, useEffect } from "react"
import { IsShopContext } from "app/context/IsShopContext"
import { StoreContext } from "../context/StoreContext"
import { storeScrollPosition } from "../functions/functions"
import Link from "next/link"
import { fetchUserInfos } from "../lib/data"
import { UserInfoType } from "../lib/definitions"
import Button from "./Button"
import { LogoLink } from "./LogoLink"

export default function Nav() {
    const { setIsShop } = useContext(IsShopContext)
    const { storePlants } = useContext(StoreContext)
    const [isScrolled, setIsScrolled] = useState(false)
    const [user, setUser] = useState<UserInfoType | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        };

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, [])

    useEffect(() => {
        async function getUser() {
            const fetchedUser = await fetchUserInfos()
            setUser(fetchedUser)
        }
        getUser()
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

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
            <LogoLink isScrolled={isScrolled} />
            <ul className="flex gap-3">
                <li className="flex items-center">
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        <UserIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </Link>
                </li>
                <li onClick={handleSearchClick} className="flex items-center">
                    <a href="#">
                        <MagnifyingGlassIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </a>
                </li>
                <li className="relative flex items-center" onClick={handleShopClick}>
                    {storePlants.length > 0 && notif}
                    <a href="#">
                        <ShoppingCartIcon className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </a>
                </li>
                {user?.is_admin === true &&
                    <li className="ml-3">
                        <Link href="/admin">
                            <Button text="Admin"/>
                        </Link>
                    </li>}
            </ul>
        </nav>
    )
}
