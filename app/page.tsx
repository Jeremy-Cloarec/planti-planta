"use client"
import Heading from "./ui/Heading"
import { ListCardsPlants } from "./ui/ListCardsPlants"
import { PanelCard } from "./ui/PanelCard"
import { useContext, useEffect, useState } from "react"
import { IsShopContext } from "./context/IsShopContext"
import { getScrollPosition } from "./functions/functions"
import { PopUpOrder } from "./ui/PopUp"
import Nav from "./ui/Nav"

export default function Home() {
  const { isShop } = useContext(IsShopContext)
  const [isOrder, setIsOrder] = useState(false)
  const dateYear = new Date()

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
          {isOrder && <PopUpOrder />}
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
