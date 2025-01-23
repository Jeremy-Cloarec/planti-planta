import { sql } from "@vercel/postgres";
import { Plants } from "./definitions";

export async function fetchPlants() {
    try {
        const data = await sql<Plants>`SELECT * FROM public.plants`;
        return data.rows;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}