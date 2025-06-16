"use client"
import { Footer } from "../ui/Footer";
import Nav from "../ui/nav/Nav";

export default function QuiSuisJe() {
    return (
        <>
            <Nav numberOfPlants={":)"} />
            <main className="flex-1 flex flex-col justify-center pt-[72px]">
                <h1>Qui suis-je ?</h1>
            </main>
            <Footer />
        </>
    )
}