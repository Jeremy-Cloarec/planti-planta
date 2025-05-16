"use client"
import { H1Layout } from "../ui/admin/H1Layout"

export default function Page() {
    const user= "Pascal"
    return (
        <>
            <H1Layout title={`Bonjour ${user} `} />
        </>
    )
}