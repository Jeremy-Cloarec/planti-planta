"use client"
import Link from "next/link"
import Nav from "../ui/Nav"
import { Footer } from "../ui/Footer"
import { useEffect, useState } from "react"
import { fetchUserInfos } from "../lib/data"
import { UserInfo } from "../lib/definitions"

export default function AdminPage() {
    const[user, setUser] = useState<UserInfo | null>(null)

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
            <main className="flex-1 flex flex-col pt-[72px]">
                <Link href='./'>Accueil</Link>
                <h1>Hello {user?.name} </h1>

            </main>
            <Footer />
        </>

    )
}