interface ButtonProps {
    text: string,
    handleClick?: () => void
}

export default function Button({ text, handleClick }: ButtonProps) {
    return (
        <button
            className="inline-block w-full  px-2 py-2 rounded-md transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-white"
            onClick={handleClick}
        >
            {text}
        </button>
    )
}