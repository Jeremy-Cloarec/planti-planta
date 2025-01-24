import { sql } from "@vercel/postgres";

async function seedData() {
    try {
        await sql`DROP TABLE IF EXISTS plants`; 
        await sql`
        CREATE TABLE IF NOT EXISTS plants (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            price NUMERIC NOT NULL,
            shop BOOLEAN NOT NULL
        )
    `;
        await sql`
        INSERT INTO plants (title, price, shop) VALUES
            ('Iridaceae', 16, FALSE),
            ('Ericaceae', 24, FALSE),
            ('Geraniaceae', 8, FALSE),
            ('Aizoaceae', 12, FALSE),
            ('Liliaceae', 31, FALSE),
            ('Campanulaceae', 24, FALSE)
    `;
        console.log('Database seeding successful');
        Response.json({ message: 'Database seeded successfully' });

    } catch (error) {
        throw new Error(`Database seeding failed: ${error}`);
    }
}

// Fonction GET pour initialiser la base de données
export async function GET() {
    try {
        await sql`BEGIN`;
        await seedData();
        await sql`COMMIT`;
        Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        await sql`ROLLBACK`;
        throw new Error('Failed to fetch data.');
    }
}


