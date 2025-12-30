import Nav from "./ui/nav/Nav"
import Heading from "./ui/Hero"
import ListCardsPlants from "./ui/ListCardsPlants"
import Footer from "./ui/Footer"
import { fetchPlants } from "./actions/plants.actions"
import { Suspense } from "react"
import LoadingPlants from "./ui/skeleton/loading"

export default function Home() {
    const promisePlants = fetchPlants();
    return (
        <>
            <Nav />
            <div className="flex flex-col flex-1 w-full">
                <Heading title="Dancing Plants" />
                <main className="flex-1 w-full relative">
                    <div id="list-cards-section" className="absolute -top-16 z-50"></div>
                    <Suspense fallback={<LoadingPlants />}>
                        <ListCardsPlants promisePlants={promisePlants} />
                    </Suspense>
                </main>
            </div>
            <Footer />
        </>
    )
}
