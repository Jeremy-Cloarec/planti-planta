import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"

export default function Nav({ numberOfPlants }: { numberOfPlants: string }) {
    const notif = (
        <div className="absolute -right-2 -top-1 bg-greenLight text-sm h-5 w-5 text-center rounded-full">
            {numberOfPlants}
        </div>
    )

    return (
        <nav className='w-full max-w-80 fixed top-0 py-2 z-30 px-3'>
            <div className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full">
                <LogoLink />
                <ul className="flex gap-3">
                    <li className="flex items-center">
                        <Link
                            key={"Sin In"}
                            href="/sign-in">
                            <UserIcon className="size-7" />
                        </Link>
                    </li>
                    <li className="relative flex items-center">
                        {numberOfPlants != "0" && notif}
                        <Link
                            key={"Panier"}
                            href="/panier">
                            <ShoppingCartIcon
                                className="size-7" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
