import Heading from "./ui/Heading"
import { ListCardsPlants } from "./ui/ListCardsPlants"
import Nav from "./ui/Nav"
import { Footer } from "./ui/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <Heading title="Planti Planta" />
        <main className="flex-1
      ">
          <ListCardsPlants />
        </main>
      </div>
      <Footer />
    </>
  );
}
