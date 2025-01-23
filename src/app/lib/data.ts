import { sql } from "@vercel/postgres";
import { Plants } from "./definitions";

export async function fetchPlants() {
    try {
        const data = await sql`SELECT * FROM plants`;
        return data.rows;

    } catch (error:any) {
        console.error('Database Error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        throw new Error('Failed to fetch revenue data.');
    }
}