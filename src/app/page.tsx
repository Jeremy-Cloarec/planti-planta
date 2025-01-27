import { fetchPlants } from "./lib/data";
import CardPlant from "./ui/CardPlant";
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export default async function Home() {
  const dateYear = new Date();
  const plants = await fetchPlants();

  console.log(plants);

  const listPlants = plants.map(plant =>
    <CardPlant
      title={plant.title}
      price={plant.price.toString()}
      key={plant.id}
    />
  )

  return (
    <>
      <nav className="flex items-center justify-between w-full">
        <a href="#" className="w-fit flex">
          <img src="../../logo.png" alt="Logo du site : une petite plante mignone " className="w-12 h-auto" />
        </a>
        <ul className="flex gap-3">
          <li>
            <a href="#">
              <UserIcon className="size-9 text-dark" />
            </a>
          </li>
          <li>
            <a href="#">
              <MagnifyingGlassIcon className="size-9 text-dark" />
            </a>
          </li>
          <li>
            <a href="#">
              <ShoppingCartIcon className="size-9 text-dark" />
            </a>
          </li>
        </ul>
      </nav>
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <header className="my-16">
          <h1 className="text-center">Planti Planta</h1>
        </header>
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
