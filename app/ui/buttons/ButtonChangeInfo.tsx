"use client"
import Button from "@/app/ui/buttons/Button";

export default function ButtonChangeInfo({onClick, textButton }: { onClick: () => void, textButton: string }) {
    return (
        <Button className="text-sm"
                onClick={onClick}>
            {textButton}
        </Button>
    )
}