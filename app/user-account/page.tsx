
import { redirect } from "next/navigation"
import Nav from "../ui/Nav"
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
                <h2>Informations personnelles</h2>
                <h2>Commandes</h2>
            </main>
            <Footer />
        </>
    )
}
