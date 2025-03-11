import bcrypt from 'bcrypt'
import { connectionPool as cp } from 'app/db'
import { plants, users } from 'app/lib/placeholder-data'

async function seedPlants() {
    await cp.query(`DROP TABLE IF EXISTS plants`)
    await cp.query(`
            CREATE TABLE IF NOT EXISTS plants (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                price NUMERIC NOT NULL,
                quantity NUMERIC NOT NULL
            )
        `);
    const insertPlants = await Promise.all(
        plants.map((plant) => {
            cp.query(`
                INSERT INTO plants (title, price, quantity) VALUES ($1, $2, $3)`, [plant.title, plant.price, plant.quantity])
        })
    );

    return insertPlants;
}

async function seedUsers() {
    await cp.query(`DROP TABLE IF EXISTS users`);
    await cp.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            is_admin BOOLEAN NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
        `);

    const insertUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10)
            return cp.query(`
                INSERT INTO users (is_admin, name, email, password) VALUES ($1, $2, $3, $4)`, [user.isAdmin, user.name, user.email, hashedPassword])
        })
    );
    return insertUsers;
}

// Fonction GET pour initialiser la base de données
export async function GET() {
    try {
        await seedPlants();
        await seedUsers();
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
