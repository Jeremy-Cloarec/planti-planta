import Heading from "./ui/Heading";
import { fetchPlants } from "./lib/data";
import Nav from "./ui/Nav";
import { ListCardsPlants } from "./ui/ListCardsPlants";
import { Plants } from "./lib/definitions";

export default async function Home() {
  const dateYear = new Date();
  const plants: Plants[] = await fetchPlants();

  return (
    <>
      <Nav />
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <Heading title="Planti Planta" />
        <main className="flex-1
      ">
          <ListCardsPlants plants={plants} />
        </main>
      </div>
      <footer className="w-full mt-10">
        <p>
          {dateYear.getFullYear()} -
          <a href="https://github.com/Jeremy-Cloarec" target="_blank"> Jérémy</a>
        </p>
      </footer>
    </>
  );
}
