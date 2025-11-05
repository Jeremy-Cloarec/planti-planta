'use client'
import { ReactNode } from "react"
import { PopupProvider } from "@/app/context/PopupContext"
import { PlantsBasketProvider } from "@/app/context/PlantsBasketContext"

export default function Providers({ children }: { children: ReactNode }) {
    return (
            <PlantsBasketProvider>
                <PopupProvider>
                    {children}
                </PopupProvider>
            </PlantsBasketProvider>
    )
}
