"use client"
import {TrashIcon} from "@heroicons/react/24/outline"
import {usePlantsBasketDispatch} from "@/app/context/PlantsBasketContext";

interface ButtonDeleteProps {
    text: string
    plantId: string
}

export default function ButtonDeleteToBasket({text, plantId}: ButtonDeleteProps) {
    const dispatch = usePlantsBasketDispatch()

    const handleDeleteOneToBasket = () => {
        if (dispatch
        ) {
            dispatch({type: "remove", id: plantId})
        }
    }

    return (
        <button
            onClick={handleDeleteOneToBasket}
            className="flex gap-1 items-center text-dark2 hover:text-red-opacity transition duration-300 mt-auto"
        >
            <TrashIcon width={16}/>
            {text}
        </button>
    )
}

/*
   const buttonContent = (isPending: boolean, text: string) => {
       if (isPending) return <div className="flex justify-center">
           <svg className="size-5 animate-spin"
               xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
               <path d="M11 1V5.167M11 16.833V21M21 11H16.834M5.167 11H1M18.209 3.792L15.292 6.709M6.708 15.292L3.791 18.208M18.209 18.208L15.292 15.292M6.708 6.709L3.791 3.792" stroke="#ff5252d6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
       </div>
       return text
   }
   */
