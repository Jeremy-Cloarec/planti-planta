import {connectionPool as cp} from '@/app/db';

async function seedPlants() {
    try {
        await cp.query(`DROP TABLE IF EXISTS plants`); 
        await cp.query(`
        CREATE TABLE IF NOT EXISTS plants (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            price NUMERIC NOT NULL,
            shop BOOLEAN NOT NULL
        )
    `);
        await cp.query(`
        INSERT INTO plants (title, price, shop) VALUES
            ('Iridaceae', 16, FALSE),
            ('Ericaceae', 24, FALSE),
            ('Geraniaceae', 8, FALSE),
            ('Aizoaceae', 12, FALSE),
            ('Liliaceae', 31, FALSE),
            ('Campanulaceae', 24, FALSE)
            ON CONFLICT DO NOTHING;
    `);
        Response.json({ message: 'Plants seeded successfully' });

    } catch (error) {
        Response.json(error);
    }
}

async function seedUsers(){
    try {
        await cp.query(`DROP TABLE IF EXISTS users`);
        await cp.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
        `);
        await cp.query(`
        INSERT INTO users (name, email) VALUES
            ('John Doe', 'johndoe@gmail.com')
        `);  
        Response.json({ message: 'Users seeded successfully' });


    } catch (error){
        Response.json(error);
    }
}

// Fonction GET pour initialiser la base de données
export async function GET() {
    try {
        await seedPlants();
        await seedUsers();
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({error}, {status: 500});
    }
}
