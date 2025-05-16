"use client"
import Heading from "./ui/Heading"
import Nav from "./ui/nav/Nav"
import { Footer } from "./ui/Footer"
import ListCardsPlants from "./ui/ListCardsPlants"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function Home() {
  // const user: User = await fetchUserInfos()
  const user = { id: "cfc5cf6c-4bb8-4d14-befd-e44626bb7a64" }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {user && < Nav userId={user.id} />}
        <div className="max-w-4xl flex flex-col flex-1 w-full">
          <Heading title="Planti Planta" />
          <main className="flex-1">
            <ListCardsPlants userId={user.id} />
          </main>
        </div>
        <Footer />
      </QueryClientProvider>
    </>
  );
}
