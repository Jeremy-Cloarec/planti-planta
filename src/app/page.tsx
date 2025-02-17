"use client"
import Heading from "./ui/Heading"
import Nav from "./ui/Nav"
import { ListCardsPlants } from "./ui/ListCardsPlants"
import { PanelCard } from "./ui/PanelCard"
import { useContext } from "react"
import { IsShopContext } from "./context/IsShopContext"

export default function Home() {
  const dateYear = new Date()
  const { isShop } = useContext(IsShopContext)

  const storeScrollPosition = () => {
    const scroll_y = { position: window.scrollY }
    localStorage.setItem("scroll", JSON.stringify(scroll_y))
  }

  const getScrollPosition = () => {
    const storedScroll = localStorage.getItem("scroll")

    if (!storedScroll) return

    const scroll_y = JSON.parse(storedScroll)

    setTimeout(() => {
      window.scrollTo({ top: scroll_y.position, behavior: "instant" });
    }, 10)

    localStorage.removeItem("scroll")
  }

  return (
    <>
      <Nav storeScrollPosition={storeScrollPosition} />
      {isShop && <PanelCard getScrollPosition={getScrollPosition} />}
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
    </>
  );
}
