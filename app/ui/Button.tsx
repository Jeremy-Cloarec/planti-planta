interface ButtonProps {
    text: string,
    handleClick?: () => void
    isPending?: boolean
    classAdded?: string
}

export default function Button({ text, handleClick, isPending = false, classAdded}: ButtonProps) {
    return (
        <button
            className={`px-4 py-2 rounded-2xl transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-white ${classAdded}`}
            aria-disabled = {isPending}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}