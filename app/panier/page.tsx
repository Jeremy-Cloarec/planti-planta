"use client"
import Link from "next/link"

export default function PanelCard({ setIsOrder }: { setIsOrder: (isOrder: boolean) => void }) {
    return (
        <main className="flex-1 flex flex-col justify-center pt-[72px]">
            <Link href='./'>Accueil</Link>
            <h1>Hello panier</h1>
        </main>
    )
}