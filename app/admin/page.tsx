"use client"
import Link from "next/link"
import { Footer } from "../ui/Footer"
import { useEffect, useState } from "react"
import { fetchUserInfos } from "../lib/data"
import { UserInfoType } from "../lib/definitions"
import NavAdmin from "../ui/NavAdmin"

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
            <NavAdmin />
            <main className=" w-full flex-1 flex flex-col mt-[72px] pt-8">
                <Link href='./'>Accueil</Link>
                <h1>Hello {user?.name} </h1>
            </main>
            <Footer />
        </>

    )
}