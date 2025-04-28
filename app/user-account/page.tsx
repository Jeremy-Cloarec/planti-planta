import { verifySession } from "../lib/dal"
import { cookies } from "next/headers"
import { connectionPool as cp } from "app/db"
import { redirect } from "next/navigation"
import Nav from "../ui/Nav"
import Heading from "../ui/Heading"
import { fetchUserInfos } from "../actions"
import { Footer } from "../ui/Footer"

export default async function UserAccount() {
    const user = await fetchUserInfos()

    if (!user) {
        redirect("/api/logout")
    }

    console.log(user);

    return (
        <>
            <Nav />
            <main className="w-full flex-1 pt-[72px]">
                <h1>Bonjour {user.name}</h1>
            </main>
            <Footer />
        </>
    )
}
