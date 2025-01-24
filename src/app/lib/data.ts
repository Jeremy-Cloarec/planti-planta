import { sql } from "@vercel/postgres";

export async function fetchPlants() {
    try {       
        const data = await sql`SELECT * FROM plants`;
        console.log(data);
        return data.rows;
    }catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch plants data.')
    }
}