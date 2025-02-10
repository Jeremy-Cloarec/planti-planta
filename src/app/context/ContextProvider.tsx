"use client";
import { PlantsContext } from "./PlantsContext"
import { StoreContext } from "./StoreContext"
import { ReactNode, useState } from "react"
import { Plant } from "../lib/definitions"

interface ContextProviderProps {
    children: ReactNode,
    plants: Plant[],
}

export function ContextProvider({ children, plants }: ContextProviderProps) {
    const [storePlants, setStorePlants] = useState<Plant[]>([])

    return (
        <StoreContext.Provider value={{ storePlants, setStorePlants }}>
            <PlantsContext.Provider value={plants}>
                {children}
            </PlantsContext.Provider>
        </StoreContext.Provider>
    );
}