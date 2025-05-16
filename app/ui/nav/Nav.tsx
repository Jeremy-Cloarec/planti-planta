import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { LogoLink } from "./LogoLink"
import { numberOfPlantsInBasket } from "@/app/actions"

export default  function Nav({ userId }: { userId: string }) {
    const numberOfPlants = "2"
    // const numberOfPlants = await numberOfPlantsInBasket(userId)

    const notif = (
        <div className="absolute -right-2 -top-1 bg-greenLight text-sm h-5 w-5 text-center rounded-full">
            {numberOfPlants}
        </div>
    )

    return (
        <nav className={`transition duration-500 flex items-center justify-between w-full fixed top-0 px-[18px] md:px-[25px] py-2 z-30 bg-white`}>
            <LogoLink />
            <ul className="flex gap-3">
                <li className="flex items-center">
                    <Link
                        key={"Sin In"}
                        href="/sign-in">
                        <UserIcon className="size-9" />
                    </Link>
                </li>
                <li className="relative flex items-center">
                    {numberOfPlants != "0" && notif}
                    <Link
                        key={"Panier"}
                        href="/panier">
                        <ShoppingCartIcon
                            className="size-9" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
