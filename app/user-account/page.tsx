"use client"
import { useContext, useEffect, useState } from "react"
import { logout } from "../actions"
import Button from "../ui/Button"
import { fetchUserInfos } from "../lib/data"
import { UserInfoType } from "../lib/definitions"
import Nav from "../ui/Nav"
import { Footer } from "../ui/Footer"
import { PanelCard } from "../ui/PanelCard"
import { IsShopContext } from "../context/IsShopContext"
import { PopUpOrder } from "../ui/PopUp"

export default function UserAccount() {
    const [user, setUser] = useState<UserInfoType | null>(null)
    const { isShop } = useContext(IsShopContext)
    const [isOrder, setIsOrder] = useState(false)

    console.log(isOrder);

    useEffect(() => {
        async function getUser() {
            const fetchedUser = await fetchUserInfos()
            setUser(fetchedUser)
        }
        getUser()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsOrder(false)
        }, 3000)
    }, [isOrder])

    return (
        <>
            <Nav />
            {isShop && <PanelCard setIsOrder={setIsOrder} />}
            <main className="w-full flex-1 pt-[72px]">
                <h1>Bonjour {user?.name}</h1>
                <Button
                    text="Se déconnecter"
                    handleClick={logout}
                />
                {isOrder && <PopUpOrder />}
            </main>
            <Footer />
        </>

    )
}