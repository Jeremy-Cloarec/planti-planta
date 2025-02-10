import Heading from "./ui/Heading"
import Nav from "./ui/Nav"
import { ListCardsPlants } from "./ui/ListCardsPlants"
import { fetchPlants } from "./lib/data"
import { ContextProvider } from "./context/ContextProvider"
import { PanelCard } from "./ui/PanelCard"

export default async function Home() {
  const plants = await fetchPlants()
  const dateYear = new Date()

  return (
    <>
      <ContextProvider plants={plants} >
        <Nav />
        <PanelCard />
        <div className="max-w-4xl flex flex-col flex-1 w-full">
          <Heading title="Planti Planta" />
          <main className="flex-1
      ">
            <ListCardsPlants />
          </main>
        </div>
        <footer className="w-full mt-10">
          <p>
            {dateYear.getFullYear()} -
            <a href="https://github.com/Jeremy-Cloarec" target="_blank"> Jérémy</a>
          </p>
        </footer>
      </ContextProvider>
    </>
  );
}
