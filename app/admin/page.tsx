"use client"
import { useEffect, useState } from "react"
import { fetchUserInfos } from "../lib/data"
import { UserInfoType } from "../lib/definitions"
import { H1Layout } from "../ui/admin/H1Layout"

export default function Page() {
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
            <H1Layout title={`Bonjour ${user?.name} `} />
        </>

    )
}