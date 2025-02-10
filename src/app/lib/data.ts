import { connectionPool as cp } from "@/app/db";

export async function fetchPlants() {
    try {
        const data = await cp.query(`SELECT * FROM plants`);
        return data.rows;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch plants data.");
    }
}
