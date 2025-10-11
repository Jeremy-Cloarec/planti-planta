// context/PopupContext.tsx
"use client"
import {createContext, useState, useContext} from "react"

interface Response {
    message: string
    success: boolean
    classStyle: string
}

const PopupContext = createContext<(res: Response) => void>(() => {})

export const PopupProvider = ({children}: {children: React.ReactNode}) => {
    const [responses, setResponses] = useState<Response[]>([])

    const addPopup = (res: Response) => {
        setResponses(prev => [...prev, res])
        setTimeout(() => {
            setResponses(prev => prev.filter(r => r !== res))
        }, 2000)
    }

    return (
        <PopupContext.Provider value={addPopup}>
            <ul className="fixed bottom-4 left-4 z-50 w-fit ">
                {responses.map((r, i) => (
                    <div key={i} className={`p-2 shadow w-fit text-center rounded-lg mb-1 ${r.classStyle}`}>{r.message}</div>
                ))}
            </ul>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext)
