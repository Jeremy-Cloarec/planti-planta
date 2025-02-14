interface ButtonProps {
    text: string,
    handleClick?: () => void
}

export default function ButtonNoStock({ text, handleClick }: ButtonProps) {
    return (
        <button
            className="cursor-default inline-block w-full px-2 py-2 rounded-md bg-greenHover text-white"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}