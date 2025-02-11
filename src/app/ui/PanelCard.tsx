"use client"
import { useContext } from "react"
import { IsShopContext } from "@/app/context/IsShopContext"
import { XMarkIcon } from "@heroicons/react/24/solid"
export function PanelCard() {
    const { setIsShop } = useContext(IsShopContext)

    const handleClick = () => {
        setIsShop(false)
    }

    return (
        <div className="panel-card absolute top-0 right-0 w-full h-dvh bg-black/5 flex justify-end" onClick={handleClick}>

            <div className="w-4/5 bg-white h-dvh p-3" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between">
                    <h3>Mon panier</h3>
                    <button
                        name="Fermer le menu"
                        className="cursor-pointer hover:bg-slate-200 rounded-md transition duration-300"
                        onClick={handleClick}
                    >
                        <XMarkIcon
                            width={24}
                        />
                    </button>
                </header>
            </div>
        </div>
    )
}