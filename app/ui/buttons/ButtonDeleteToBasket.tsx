"use client"
import { deletePlantFromBasket } from "@/app/actions/basket.action"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon } from "@heroicons/react/24/outline"

interface ButtonDeleteProps {
    text: string
    plantId: string
    userId: string | undefined
}

export default function ButtonDeleteToBasket({ text, plantId, userId }: ButtonDeleteProps) {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => deletePlantFromBasket(plantId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plantsInBasket'] })
            queryClient.invalidateQueries({ queryKey: ['countBasket', userId] })
            queryClient.invalidateQueries({ queryKey: ['totalPrice', userId] })
        },
    })

    const buttonContent = (isPending: boolean, text: string) => {
        if (isPending) return <div className="flex justify-center">
            <svg className="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                <path d="M11 1V5.167M11 16.833V21M21 11H16.834M5.167 11H1M18.209 3.792L15.292 6.709M6.708 15.292L3.791 18.208M18.209 18.208L15.292 15.292M6.708 6.709L3.791 3.792" stroke="#ff5252d6" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        return text
    }

    return (
        <button
            onClick={() => deleteMutation.mutate()}
            className={`${deleteMutation.isPending ? "animate-pulse w-[96px]" : ""} flex gap-1 items-center text-dark2 hover:text-redOpacity transition delay-150 duration-300 mt-auto`} 
        >
            <TrashIcon width={16}/>
            {buttonContent(deleteMutation.isPending, text)}
        </button>
    )
} 
