import { neon } from "@neondatabase/serverless";

export async function fetchPlants() {
    try {
        if (!process.env.POSTGRES_URL) {
            throw new Error('DATABASE_URL is not defined');
        }
        const sql = neon(process.env.POSTGRES_URL);
        const data = await sql`SELECT * FROM plants`;
        
        console.log(data);
        
        return data
    }catch(error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch plants data.')
    }
}