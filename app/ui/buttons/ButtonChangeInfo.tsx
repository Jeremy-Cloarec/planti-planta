"use client"
import Button from "@/app/ui/buttons/Button";

export default function ButtonChangeInfo({onClick}: { onClick: () => void }) {
    return (
        <Button className="text-sm"
                onClick={onClick}>
            Modifier
        </Button>
    )
}