"use client"
import Nav from "./ui/nav/Nav"
import Heading from "./ui/Hero"
import ListCardsPlants from "./ui/ListCardsPlants"
import { Footer } from "./ui/Footer"
import {useQuery} from "@tanstack/react-query";
import {authClient} from "@/app/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession()
  const userId = session?.user?.id

  const {
    data: countBasket,
    isPending: isCountLoading,
    error: countError,
  } = useQuery({
    queryKey: ['countBasket', userId],
    queryFn: () =>
      fetch(`/api/basket/count_basket?userId=${userId}`).then((res) => res.json()),
    enabled: !!userId,
  })

  if (isCountLoading) return <div> Chargement du nombre de plantes dans le panier </div>
  if (countError) return <div>Erreur de chargement utilisateur (Home)</div>
  if (!userId) return <div>Utilisateur non connecté</div>


  return (
    <>
    < Nav numberOfPlants={countBasket ? countBasket : "0"} />
      <div className="flex flex-col flex-1 w-full">
        <Heading title="Dancing Plants" />
        <main className="flex-1 p-3 md:p-4 w-full max-w-(--breakpoint-lg) m-auto">
          <ListCardsPlants userId={userId}/>
        </main>
      </div>
      <Footer />
    </>
  )
}
