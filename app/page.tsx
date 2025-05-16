"use client"
import { useQuery } from "@tanstack/react-query"
import Nav from "./ui/nav/Nav"
import Heading from "./ui/Heading"
import ListCardsPlants from "./ui/ListCardsPlants"
import { Footer } from "./ui/Footer"
import LoadingPlants from "./ui/skeleton/loading"

export default function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  })

  const user = data

  const countNav = useQuery({
    queryKey: ['countBasket', user?.id],
    queryFn: () =>
      fetch(`/api/basket/count_basket?userId=${user.id}`).then((res) => res.json()),
    enabled: !!user?.id
  })

  if (isPending) return <LoadingPlants />
  if (error) return <div>Erreur de chargement utilisateur</div>

  return (
    <>
      {user && < Nav numberOfPlants={countNav.data} />}
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <Heading title="Planti Planta" />
        <main className="flex-1">
          <ListCardsPlants userId={user.id} />
        </main>
      </div>
      <Footer />
    </>
  )
}
