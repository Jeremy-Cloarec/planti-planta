"use client"
import { logout } from "../actions"
import Button from "../ui/Button"

export default function UserAccount() {
    return (
        <main className="flex-1 pt-[72px]">
            <h1>Compte utilisateur</h1>
            <Button
                text="Se déconnecter"
                handleClick={logout}
            />
        </main>
    )
}