"use client"
import { logout } from "@/app/actions"
import Button from "./Button"

export default function ButtonLogout() {
    return (
        <>
            <Button onClick={logout}>
                Se déconnecter
            </Button>
        </>
    )
}
