"use client"
import { Footer } from "../ui/Footer";
import Nav from "../ui/nav/Nav";

export default function Cgv() {
    return (
        <>
            <Nav numberOfPlants={":)"} />
            <main className="flex-1 flex flex-col justify-center pt-[72px]">
                <h1>CGV</h1>
            </main>
            <Footer />
        </>
    )
}