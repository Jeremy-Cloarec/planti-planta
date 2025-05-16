import { fetchPlants } from "@/app/actions/plants.actions"

export async function GET() {
    const plants = await fetchPlants()
    return new Response(JSON.stringify(plants), {
        status:200,
        headers: {'Content-Type': 'application/json'}
    })
}