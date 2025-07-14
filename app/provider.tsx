'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactNode, useState} from "react"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {PopupProvider} from "@/app/context/PopupContext";
import {PlantsBasketProvider} from "@/app/context/PlantsBasketContext";

export default function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <PlantsBasketProvider>
                <PopupProvider>
                        {children}
                </PopupProvider>
            </PlantsBasketProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
