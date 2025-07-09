"use client"
import Button from "@/app/ui/buttons/Button";

export default function ButtonChangeInfo() {
    return (
        <Button className="text-sm"
                onClick={() => alert("La modification de votre compte est en cours de développement")}>
            Modifier
        </Button>
    )
}