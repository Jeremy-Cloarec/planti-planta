"use client"
import { useQuery } from "@tanstack/react-query"
import Nav from "./ui/nav/Nav"
import Heading from "./ui/Hero"
import ListCardsPlants from "./ui/ListCardsPlants"
import { Footer } from "./ui/Footer"
import LoadingPlants from "./ui/skeleton/loading"

export default function Home() {
  const { data: user, isPending: isUserLoading, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  })

  const {
    data: countBasket,
    isPending: isCountLoading,
    error: countError,
  } = useQuery({
    queryKey: ['countBasket', user?.id],
    queryFn: () =>
      fetch(`/api/basket/count_basket?userId=${user.id}`).then((res) => res.json()),
    enabled: !!user?.id,
  })

  if (isUserLoading || isCountLoading) return <LoadingPlants />
  if (userError || countError) return <div>Erreur de chargement utilisateur (Home) : {userError?.message}</div>
  if (!user) return <div>Utilisateur non connecté</div>

  return (
    <>
      {user && < Nav numberOfPlants={countBasket ?? "0"} />}
      <div className="flex flex-col flex-1 w-full">
        <Heading title="Dancing Plants" />
        <main className="flex-1 p-3 md:p-4 w-full max-w-screen-lg m-auto">
          <ListCardsPlants userId={user.id} />
        </main>
      </div>
      <Footer />
    </>
  )
}
