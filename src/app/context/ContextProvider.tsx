"use client";
import { PlantsContext } from "./PlantsContext"
import { StoreContext } from "./StoreContext"
import { ReactNode, useState } from "react"
import { Plant } from "../lib/definitions"
import { IsShopContext } from "./IsShopContext"

interface ContextProviderProps {
    children: ReactNode,
}

export function ContextProvider({ children }: ContextProviderProps) {
    const [storePlants, setStorePlants] = useState<Plant[]>([])
    const [isShop, setIsShop] = useState(false)

    return (
        <IsShopContext.Provider value={{
            isShop,
            setIsShop
        }} >
            <StoreContext.Provider value={{
                storePlants,
                setStorePlants,
            }}>
                {children}
            </StoreContext.Provider>
        </IsShopContext.Provider>
    );
}