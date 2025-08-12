import { fetchAdress } from "@/app/actions/adress.action"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
        return new Response("Missing userId", { status: 400 });
    }

    const adress = await fetchAdress(userId)
    return Response.json(adress);
}