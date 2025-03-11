"use client"
import Link from "next/link"
import Nav from "../ui/Nav"
import { Footer } from "../ui/Footer"
import { useEffect, useState } from "react"
import { fetchUserInfos } from "../lib/data"
import { UserInfoType } from "../lib/definitions"
import Button from "../ui/Button"
import { logout } from "../actions"

export default function AdminPage() {
    const [user, setUser] = useState<UserInfoType | null>(null)

    useEffect(() => {
        async function getUser() {
            const fetchedUser = await fetchUserInfos()
            setUser(fetchedUser)
        }
        getUser()
    }, [])

    return (
        <>
            <Nav />
            <main className="w-ful flex-1 flex flex-col pt-[72px]">
                <Link href='./'>Accueil</Link>
                <h1>Hello {user?.name} </h1>
                <Button
                    text="Se déconnecter"
                    handleClick={logout}
                />
            </main>
            <Footer />
        </>

    )
}