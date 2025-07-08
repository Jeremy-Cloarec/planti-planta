'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactNode, useEffect, useState} from "react"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {BasketContext} from "@/app/context/BasketContext";
import {authClient} from "@/app/lib/auth-client";
import {UserContext} from "@/app/context/UserContext";
import {PopupProvider} from "@/app/context/PopupContext";

export default function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    const [plantsInLocalStorages, setPlantsInLocalStorages] = useState<string[]>([])

    const {data: session} = authClient.useSession()
    const userId = session ? session?.user?.id : "1"

    useEffect(() => {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("plantsInBasket")
            if (data) {
                try {
                    const parsed = JSON.parse(data)
                    setPlantsInLocalStorages(parsed)
                } catch (e) {
                    console.error("Erreur parsing localStorage", e)
                }
            }
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <PopupProvider>
                <UserContext.Provider value={userId}>
                    <BasketContext.Provider value={plantsInLocalStorages}>
                        {children}
                    </BasketContext.Provider>
                </UserContext.Provider>
            </PopupProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
