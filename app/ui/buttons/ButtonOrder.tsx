"use client"
import Button from "./Button"

interface ButtonOrderProps {
    text: string
}

export default function ButtonOrder({ text }: ButtonOrderProps) {
    return (
        <Button className="w-full" onClick={() => alert("La fonctionnalité est en cours de construction")}>{text}</Button>
    )
} 