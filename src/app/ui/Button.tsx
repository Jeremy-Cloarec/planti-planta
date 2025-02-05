interface ButtonProps {
    text: string,
    onClick?: () => void
}

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            className="inline-block w-full  px-2 py-2 rounded-md transition delay-75 duration-300 ease-in-out  bg-green group-hover:bg-greenHover text-white"
            onClick={onClick}
        >
            {text}
        </button>
    )
}