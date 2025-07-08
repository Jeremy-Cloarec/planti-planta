"use client"
import Button from "./Button"
import {usePopup} from "@/app/context/PopupContext";

interface ButtonProps {
    text: string
    plantTitle: string
}

export default function ButtonAddToBasket({text, plantTitle}: ButtonProps) {
    const popup = usePopup()

    const handleAddToBasket = () => {
        console.log(plantTitle)
        popup({
            success: true,
            message: `${plantTitle} ajoutée au panier !`,
            classStyle: "bg-violet-light"
        })
    }

    const buttonContent = (isPending: boolean, text: string) => {
        if (isPending) return <div className="flex justify-center">
            <svg className="size-5 animate-spin"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 22 22" fill="none">
                <path
                    d="M11 1V5.167M11 16.833V21M21 11H16.834M5.167 11H1M18.209 3.792L15.292 6.709M6.708 15.292L3.791 18.208M18.209 18.208L15.292 15.292M6.708 6.709L3.791 3.792"
                    stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
        </div>
        return text
    }

    return (
        <Button onClick={handleAddToBasket}>
            {buttonContent(false, text)}
        </Button>
    )
}
