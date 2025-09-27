import Nav from "./ui/nav/Nav"
import Heading from "./ui/Hero"
import ListCardsPlants from "./ui/ListCardsPlants"
import Footer from "./ui/Footer"
import { fetchPlants } from "./actions/plants.actions"
import { Suspense } from "react"
import LoadingPlants from "./ui/skeleton/loading"

export default function Home() {
    const promisePlants = fetchPlants()
    return (
        <>
            <Nav />
            <Heading title="Dancing Plants" />
            <main className="flex-1 p-3 md:p-4 w-full relative">
                <Suspense fallback={<LoadingPlants />}>
                    <ListCardsPlants promisePlants={promisePlants} />
                </Suspense>
            </main>
            <Footer />
        </>
    )
}
