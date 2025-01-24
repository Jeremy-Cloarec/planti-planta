import { db } from "@vercel/postgres";

const client = await db.connect();

async function seedPlants() {
    try {
        await client.sql`DROP TABLE IF EXISTS plants`; 
        await client.sql`
        CREATE TABLE IF NOT EXISTS plants (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            price NUMERIC NOT NULL,
            shop BOOLEAN NOT NULL
        )
    `;
        await client.sql`
        INSERT INTO plants (title, price, shop) VALUES
            ('Iridaceae', 16, FALSE),
            ('Ericaceae', 24, FALSE),
            ('Geraniaceae', 8, FALSE),
            ('Aizoaceae', 12, FALSE),
            ('Liliaceae', 31, FALSE),
            ('Campanulaceae', 24, FALSE)
            ON CONFLICT DO NOTHING;
    `;
        console.log('Database seeding successful');
        Response.json({ message: 'Database seeded successfully' });

    } catch (error) {
        throw new Error(`Database seeding failed: ${error}`);
    }
}

async function seedUsers(){
    try {
        await client.sql`DROP TABLE IF EXISTS users`;
        await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    `;
        await client.sql`
        INSERT INTO users (name, email) VALUES
            ('John Doe', 'johndoe@gmail.com')
        `;  

    } catch (error){
        console.log('Database seeding successful');
        Response.json({ message: 'Database seeded successfully' });
    }
}

// Fonction GET pour initialiser la base de données
export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedPlants();
        await seedUsers();
        await client.sql`COMMIT`;
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        await client.sql`ROLLBACK`;
        return Response.json({error}, {status: 500});
    }
}
