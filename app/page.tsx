import Nav from "./ui/nav/Nav"
import Heading from "./ui/Hero"
import ListCardsPlants from "./ui/ListCardsPlants"
import Footer from "./ui/Footer"

export default function Home() {
    return (
        <>
            <Nav />
            <div className="flex flex-col flex-1 w-full">
                <Heading title="Dancing Plants"/>
                <main className="flex-1 p-3 md:p-4 w-full max-w-(--breakpoint-lg) m-auto">
                    <ListCardsPlants />
                </main>
            </div>
            <Footer/>
        </>
    )
}
