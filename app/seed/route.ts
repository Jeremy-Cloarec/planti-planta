import {connectionPool as cp} from 'app/db'
import {plants} from 'app/lib/placeholder-data'

async function seedPlants() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await cp.query(`
        CREATE TABLE IF NOT EXISTS plants
        (
            id       UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title    TEXT    NOT NULL,
            price    NUMERIC NOT NULL,
            quantity NUMERIC NOT NULL,
            legend   TEXT    NOT NULL
        )
    `);

    return await Promise.all(
        plants.map((plant) =>
            cp.query(`
                        INSERT INTO plants (title, price, quantity, legend)
                        VALUES ($1, $2, $3, $4)`,
                [plant.title, plant.price, plant.quantity, plant.legend])
        )
    );
}

async function seedBasket() {
    await cp.query(`
        CREATE TABLE IF NOT EXISTS basket
        (
            plant_id UUID REFERENCES plants (id) ON DELETE CASCADE ON UPDATE CASCADE,
            user_id  TEXT REFERENCES "user" (id) ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (plant_id, user_id)
        )
    `)
}

async function deleteTables() {
    await cp.query(`DROP TABLE IF EXISTS basket`);
    await cp.query(`DROP TABLE IF EXISTS plants`);
}

export async function GET() {
    try {
        await deleteTables()
        await seedPlants()
        await seedBasket()

        return Response.json({message: 'Database seeded successfully'});
    } catch (error) {
        console.error(error)
        return Response.json({error: String(error)}, {status: 500});
    }
}
