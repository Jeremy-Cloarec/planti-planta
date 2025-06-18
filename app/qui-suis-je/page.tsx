"use client"
import { cormorant } from "../ui/fonts";
import { Footer } from "../ui/Footer";
import Nav from "../ui/nav/Nav";

export default function QuiSuisJe() {
    return (
        <>
            <Nav numberOfPlants={":)"} />
            <main className="flex-1 flex flex-col justify-center pt-[72px]">
                <h1 className={`${cormorant.className} text-3xl`}>Qui suis-je ?</h1>
            </main>
            <Footer />
        </>
    )
}