import Button from "./Button"

interface ButtonProps {
    text: string,
    handleClick?: () => void
}

export default function ButtonNoStock({ text, handleClick }: ButtonProps) {
    return (
        <Button
            onClick={handleClick}
            disabled={true}
            className="bg-green opacity-50 hover:bg-greenHover cursor-not-allowed"
        >
            {text}
        </Button>
    )
}