import Heading from "./ui/Heading"
import { ListCardsPlants } from "./ui/ListCards"
import Nav from "./ui/nav/Nav"
import { Footer } from "./ui/Footer"
import { fetchPlants, fetchUserInfos } from "./actions"
import { Plant, User } from "./lib/definitions"

export default async function Home() {
  const plantsData = await fetchPlants()
  const plants: Plant[] = plantsData ? plantsData : []
  const user: User = await fetchUserInfos()

  return (
    <>
      <Nav userId={user.id} />
      <div className="max-w-4xl flex flex-col flex-1 w-full">
        <Heading title="Planti Planta" />
        <main className="flex-1">
          <ListCardsPlants plants={plants} userId={user.id} />
        </main>
      </div>
      <Footer />
    </>
  );
}
