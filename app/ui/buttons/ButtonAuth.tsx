"use client"
import Button from "./Button"

interface ButtonProps {
    text: string
    className: string
    pending: boolean
}

export default function ButtonAuth({ text, className, pending }: ButtonProps) {
    return (
        <>
            <Button 
                className={className}   
                disabled={pending}
            >
                {text}
            </Button>
        </>
    )
    }
