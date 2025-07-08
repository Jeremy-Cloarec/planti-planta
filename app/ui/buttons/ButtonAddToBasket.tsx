"use client"
import { useState} from "react"
import Button from "./Button"
import { addPlantToBasket, checkIfPlantIsInBasket } from "@/app/actions/plants.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Response {
    message: string
    success: boolean
}

interface ButtonProps {
    text: string
    plantId: string
    userId: string
    disabled: boolean
    addReponse: (res: Response) => void
}

export default function ButtonAddToBasket({ text, plantId, userId, disabled, addReponse }: ButtonProps) {

    const [isDisable, setIsDisable] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const insertPlantInLocalStorage = () => {
        const stored = localStorage.getItem("plantsInBasket")
        const plantIds: string[] = stored ? JSON.parse(stored) : []

        if (!plantIds.includes(plantId)) {
            plantIds.push(plantId)
            localStorage.setItem("plantsInBasket", JSON.stringify(plantIds))
        }
    }

    const handleAddToBasket = async () => {
        const isGuest = userId === "1" || !userId

        if (isGuest) {
            insertPlantInLocalStorage()
            addReponse({ message: "Plante ajoutée au panier", success: true })
            setIsDisable(true)
            return
        }

        const res = await addPlantToBasket(plantId, userId)

        if (!res) {
            addReponse({ message: "Un problème inconnu est survenu", success: false })
            return
        }

        if (!res.success) {
            addReponse({ message: res.message, success: false })
        }

        if (res.success) {
            setIsDisable(true)
            addReponse({ message: res.message, success: true })

            deleteMutation.mutate();
        }

        const basket = await checkIfPlantIsInBasket(plantId, userId)
        if (basket) setIsDisable(true)
    }


    const deleteMutation = useMutation({
        mutationFn: () => addPlantToBasket(plantId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['countBasket', userId] })
        }
    })

    const buttonContent = (isPending: boolean, text: string) => {
        if (isDisable || disabled) return "Ajoutée au panier"
        if (isPending) return <div className="flex justify-center">
            <svg className="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                <path d="M11 1V5.167M11 16.833V21M21 11H16.834M5.167 11H1M18.209 3.792L15.292 6.709M6.708 15.292L3.791 18.208M18.209 18.208L15.292 15.292M6.708 6.709L3.791 3.792" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        return text
    }

    return (
        <Button onClick={() => handleAddToBasket()} disabled={isDisable || disabled} className={deleteMutation.isPending ? "animate-pulse h-[40px]" : ""}>
            {buttonContent(deleteMutation.isPending, text)}
        </Button>
    )
}
