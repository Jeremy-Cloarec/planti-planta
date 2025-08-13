"use client"
import {UserIcon, ShoppingCartIcon} from "@heroicons/react/24/solid"
import Link from "next/link"
import {LogoLink} from "./LogoLink"
import {usePathname} from "next/navigation"
import {usePlantsBasket} from "@/app/context/PlantsBasketContext";
import {authClient} from "@/app/lib/auth-client";

export default function Nav() {
    const pathname = usePathname()
    const { data: session } = authClient.useSession()
    const userName = session?.user?.name ? session.user.name : "Connexion"

    const plantsBasket = usePlantsBasket()
    const numberOfPlants = plantsBasket.map(plant => plant.basketQuantity).reduce((acc, current) => acc + current, 0)

    const notif = (
        <div
            className="absolute -right-2 -top-1 bg-violet-light text-sm text-dark h-5 w-5 text-center rounded-full z-20">
            {numberOfPlants}
        </div>
    )

    return (
        <nav className='w-full fixed top-0 z-30'>
            <div
                className="flex items-center justify-between bg-white border-b border-slate-200 p-3 md:p-4 h-16 relative">
                <LogoLink/>
                <ul className="flex gap-4">
                    <li>
                        <Link
                            key={"Infos"}
                            href="/infos"
                            className={`hover:text-violet transition duration-300 flex flex-col items-center ${pathname === "/sign-in" || pathname === "/infos" ? "text-violet" : "text-dark"}`}>
                            <UserIcon className="size-8"/>
                            <span className="text-xs text-center">{userName}</span>
                        </Link>
                    </li>
                    <li className="relative">
                        { plantsBasket.length > 0 && notif}
                        <Link
                            key={"Panier"}
                            href="/panier"
                            className={`z-10 flex flex-col items-center hover:text-violet transition duration-300 relative ${pathname === "/panier" ? "text-violet" : "text-dark"}`}>
                            <ShoppingCartIcon
                                className="size-8"/>
                            <span className="text-xs">Panier</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
