"use client"
import { deletePlant } from "../actions"

interface ButtonProps {
    text: string
    id:number
}

export default function Button({ text, id}: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 rounded-2xl transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-white`}
            onClick={() => deletePlant(id)}
        >
            {text}
        </button>
    )
}