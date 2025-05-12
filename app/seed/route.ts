import bcrypt from 'bcrypt'
import { connectionPool as cp } from 'app/db'
import { plants, users } from 'app/lib/placeholder-data'

async function seedPlants() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await cp.query(`
            CREATE TABLE IF NOT EXISTS plants (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await cp.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            is_admin BOOLEAN DEFAULT FALSE,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT
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

async function seedBasket() {
    await cp.query(`
        CREATE TABLE IF NOT EXISTS basket (
            plant_id UUID REFERENCES plants(id) ON DELETE CASCADE ON UPDATE CASCADE,
            user_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY(plant_id, user_id)
        )
    `)

    const uuidUsers = ((await cp.query(`SELECT id FROM users`)).rows).map(uuid => uuid.id)
    const uuidPlants = ((await cp.query(`SELECT id FROM plants`)).rows).map(uuid => uuid.id)
    
    await cp.query(`INSERT INTO basket (plant_id, user_id) VALUES
        ($1, $2), 
        ($3, $4), 
        ($5, $6)`, 
        [
            uuidPlants[0], uuidUsers[1],
            uuidPlants[1], uuidUsers[1],
            uuidPlants[3], uuidUsers[0]
        ]
    )
}

async function deleteTables() {
    await cp.query(`DROP TABLE IF EXISTS  basket, plants, users CASCADE`)
}

// Fonction GET pour initialiser la base de données
export async function GET() {
    try {
        await deleteTables()
        await seedPlants()
        await seedUsers()
        await seedBasket()
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
