"use client"
import { useContext } from "react"
import { IsShopContext } from "../context/IsShopContext"

export function PanelCard() {
    const { setIsShop } = useContext(IsShopContext)

    const handleClick = () => {
        setIsShop(false)
    }

    return (
        <div onClick={handleClick} className="bg-yellow-100">
            <p>Panel Card</p>
        </div>
    )
}