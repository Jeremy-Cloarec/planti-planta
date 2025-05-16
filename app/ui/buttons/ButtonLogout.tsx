"use client"
import { logout } from "@/app/actions/auth.action"
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
