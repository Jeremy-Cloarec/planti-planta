import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"

export default async function Nav() {
    const isScrolled = false

    const notif = (
        <div className="absolute -right-2 -top-1 bg-greenLight text-sm h-5 w-5 text-center rounded-full">
            3
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
                <li className="relative flex items-center">
                    {notif}
                    <Link
                        key={"Panier"}
                        href="/panier">
                        <ShoppingCartIcon
                            className={`transition-all duration-500 ${isScrolled ? "size-7" : "size-9"}`} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
