// import { connectionPool as cp } from "@/app/db"
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     console.log("trying to create cookies")

//     const url = new URL(request.url)

//     const email = `guest-${crypto.randomUUID()}@guest.local`
//     const user = (await cp.query(
//         `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email`,
//         ['guest', email]
//     )).rows[0]

//     const response = NextResponse.redirect(url.origin)

//     response.cookies.set("userId", user.id.toString(), {
//         path:url.origin,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         maxAge: 60 * 60 * 24 * 7,
//     })

//     return response
// }



