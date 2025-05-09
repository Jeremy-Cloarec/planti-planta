
import { redirect } from "next/navigation"
import Nav from "../ui/nav/Nav"
import { fetchUserInfos } from "../actions"
import { Footer } from "../ui/Footer"
import ButtonLogout from "../ui/buttons/ButtonLogout"

export default async function UserAccount() {
    const user = await fetchUserInfos()

    if (!user) {
        redirect("/api/logout")
    }

    return (
        <>
            <Nav userId={user.id} />
            <main className="w-full flex-1 pt-[72px]">
                <h1>Bonjour {user.name}</h1>
                <h2>Informations personnelles</h2>
                <h2>Commandes</h2>
                <ButtonLogout />
            </main>
            <Footer />
        </>
    )
}
