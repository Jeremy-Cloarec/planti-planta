"use client"
import Button from "@/app/ui/buttons/Button";

export default function ButtonChangeInfo({ onClick, textButton, style }: { onClick?: () => void, textButton: string, style?: string }) {
    return (
        <Button className={`text-sm ${style}`}
            onClick={onClick}>
            {textButton}
        </Button>
    )
}