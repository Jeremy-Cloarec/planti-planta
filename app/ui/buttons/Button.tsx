interface Button {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
}

export default function Button({
    children,
    onClick,
    className,
    disabled=false,
}: Button) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 transition delay-75 duration-300 ease-in-out bg-green hover:bg-greenHover text-dark ${disabled && "opacity-70 cursor-not-allowed"} ${className}`} 
            disabled={disabled}
        >
            {children}
        </button>
    )
}