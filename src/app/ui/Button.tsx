interface ButtonProps {
    text: string,
    handleClick?: () => void
}

export default function Button({ text, handleClick }: ButtonProps) {
    return (
        <button
            className="inline-block px-4 py-2 rounded-2xl transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-white"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}