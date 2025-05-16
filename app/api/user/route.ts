import { fetchUserInfos } from "@/app/actions/users.action"

export async function GET() {
    const user = await fetchUserInfos()
    return new Response(JSON.stringify(user), {
        status:200,
        headers: {'Content-Type': 'application/json'}
    })
}