import Heading from "./ui/Heading";
import { fetchPlants } from "./lib/data";
import CardPlant from "./ui/CardPlant";

import Nav from "./ui/Nav";

export default async function Home() {
  const dateYear = new Date();
  const plants = await fetchPlants();

  const listPlants = plants.map(plant =>
    <CardPlant
      title={plant.title}
      price={plant.price.toString()}
      key={plant.id}
    />
  )

  return (
    <>
      <Nav/>
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <Heading title="Planti Planta"/>
        <main className="flex-1 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4
      ">
          {listPlants}
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
