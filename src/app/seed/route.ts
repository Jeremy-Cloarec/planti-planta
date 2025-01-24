import { db } from '@vercel/postgres';

const client = await db.connect();

async function seedPlants() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        CREATE TABLE IF NOT EXISTS "plants" (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            shop BOOLEAN NOT NULL
        )
    `
    const insertPlants = await client.sql`
            INSERT INTO "plants" (title, price, shop)
            VALUES
                ('Iridaceae', 16, FALSE),
                ('Ericaceae', 24, FALSE),
                ('Geraniaceae', 8, FALSE),
                ('Aizoaceae', 12, FALSE),
                ('Liliaceae', 31, FALSE),
                ('Campanulaceae', 24, FALSE)
            ON CONFLICT (id) DO NOTHING;
        `;
    return insertPlants
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedPlants();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}


