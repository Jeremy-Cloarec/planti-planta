"use client"
import { createContext } from "react"

interface IsShopProps {
    isShop: boolean,
    setIsShop: (shop: boolean) => void
}

export const IsShopContext = createContext<IsShopProps>({
    isShop: false,
    setIsShop: () => { }
})