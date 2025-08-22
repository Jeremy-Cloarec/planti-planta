"use client"
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"
import { usePathname } from "next/navigation"
import { usePlantsBasket } from "@/app/context/PlantsBasketContext";
import { authClient } from "@/app/lib/auth-client";
import ButtonLogout from "../buttons/ButtonLogout"

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
                className="flex items-center justify-between bg-white border-b border-slate-200 px-3 h-16 md:px-4  relative">
                <LogoLink />
                <ul className="flex gap-4">
                    <li className="relative group cursor-pointer">
                        {
                            session?.user.name ?
                                (
                                    <>
                                        <div className={`group-hover:text-violet hover:text-violet transition duration-300 flex flex-col items-center ${pathname === "/sign-in" || pathname === "/infos" || pathname === "/commandes" ? "text-violet" : "text-dark"}`}>
                                            <UserIcon className="size-8" />
                                            <span className="text-xs text-center">{userName}</span>
                                        </div>
                                        <div className="flex-col absolute bg-transparent text-sm left-1/2 -translate-x-1/2 top-10 hidden group-hover:flex hover:flex pt-6">
                                            <div className="bg-white ring-1 ring-slate-100 shadow p-1 w-32 flex flex-col items-center justify-center gap-1 rounded-md">
                                                <Link
                                                    key={"Infos"}
                                                    href={"/infos"}
                                                    className="w-full text-center hover:bg-slate-100 transition duration-300 rounded-sm"
                                                >
                                                    Mes infos
                                                </Link>
                                                <Link
                                                    key={"Commandes"}
                                                    href={"/commandes"}
                                                    className="w-full text-center hover:bg-slate-100 transition duration-300 rounded-sm"
                                                >
                                                    Mes commandes
                                                </Link>
                                                <ButtonLogout />
                                            </div>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <Link
                                        key={"Sign-in"}
                                        href={"/sign-in"}
                                        className={`group-hover:text-violet hover:text-violet transition duration-300 flex flex-col items-center ${pathname === "/sign-in" || pathname === "/infos" || pathname === "/commandes" ? "text-violet" : "text-dark"}`}
                                    >
                                        <UserIcon className="size-8" />
                                        <span className="text-xs text-center">{userName}</span>
                                    </Link>
                                )
                        }
                    </li>
                    <li className="relative">
                        {plantsBasket.length > 0 && notif}
                        <Link
                            key={"Panier"}
                            href="/panier"
                            className={`z-10 flex flex-col items-center hover:text-violet transition duration-300 relative ${pathname === "/panier" ? "text-violet" : "text-dark"}`}>
                            <ShoppingCartIcon
                                className="size-8" />
                            <span className="text-xs">Panier</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
