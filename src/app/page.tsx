"use client"
import Heading from "./ui/Heading"
import Nav from "./ui/Nav"
import { ListCardsPlants } from "./ui/ListCardsPlants"
import { PanelCard } from "./ui/PanelCard"
import { useContext, useEffect, useState } from "react"
import { IsShopContext } from "./context/IsShopContext"
import { getScrollPosition } from "./functions/functions"
import { PopUpOrder } from "./ui/PopUp"

export default function Home() {
  const dateYear = new Date()
  const { isShop } = useContext(IsShopContext)
  const [isOrder, setIsOrder] = useState(false)

  useEffect(() => {
    getScrollPosition()
  }, [isShop])

  useEffect(() => {
    setTimeout(() => {
      setIsOrder(false)
    }, 3000)
  }, [isOrder])

  return (
    <>
      <Nav />
      {isShop && <PanelCard setIsOrder={setIsOrder} />}
      <div className="max-w-4xl flex flex-col flex-1 w-full">

        <Heading title="Planti Planta" />
        <main className="flex-1
      ">
          <ListCardsPlants />
          { isOrder && <PopUpOrder />}
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
