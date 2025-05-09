import { addPlantToBasket } from "../../actions"
import Button from "./Button"

interface ButtonProps {
    text: string
    plantId: string
    userId: string
    setMessagesSuccess: (value: (prev: string[]) => string[]) => void
    setMessagesError: (value: (prev: string[]) => string[]) => void
}

export default function ButtonAddToBasket({ text, plantId, userId, setMessagesError, setMessagesSuccess }: ButtonProps) {

    const handleAddToBasket = async () => {
        const res = await addPlantToBasket(plantId, userId)
        console.log(res)

        if (!res) {
            setMessagesError(prev => [...prev, "Un problème inconnu est survenu"])
            return
        }

        if (!res.success) {
            setMessagesError(prev => [...prev, res.message])
        }

        if (res.success) {
            setMessagesSuccess(prev => [...prev, res.message])
        }
    }

    return (
        <>
            <Button
                onClick={() => handleAddToBasket()}
            >
                {text}
            </Button>
        </>
    )
}
