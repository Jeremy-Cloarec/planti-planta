"use client"
import { createContext } from "react"
import { Plant } from "../lib/definitions"


interface StoreContextType {
    storePlants: Plant[];
    setStorePlants: (plants: Plant[]) => void;
}

export const StoreContext = createContext<StoreContextType>({
    storePlants: [],
    setStorePlants: () => { }
})