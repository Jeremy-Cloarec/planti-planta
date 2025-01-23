import CardPlant from "./ui/CardPlant";
import { UserIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const dateYear = new Date();

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
          <CardPlant
            title="Iridaceae"
            price="20"
          />
          <CardPlant
            title="Iridaceae"
            price="20"
          />
          <CardPlant
            title="Iridaceae"
            price="20"
          />
          <CardPlant
            title="Iridaceae"
            price="20"
          />
        </main>
      </div>
      <footer className="w-full mt-10">
        <p>
          Jérémy - {dateYear.getFullYear()}
        </p>
      </footer>
    </>
  );
}
