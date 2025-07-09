'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactNode, useState} from "react"
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {authClient} from "@/app/lib/auth-client";
import {UserContext} from "@/app/context/UserContext";
import {PopupProvider} from "@/app/context/PopupContext";
import {PlantsBasketProvider} from "@/app/context/PlantsBasketContext";

export default function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const {data: session} = authClient.useSession()
    const userId = session ? session?.user?.id : "1"

    return (
        <QueryClientProvider client={queryClient}>
            <PlantsBasketProvider>
                <PopupProvider>
                    <UserContext.Provider value={userId}>
                        {children}
                    </UserContext.Provider>
                </PopupProvider>
            </PlantsBasketProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
