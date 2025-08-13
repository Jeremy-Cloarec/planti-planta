import { connectionPool as cp } from 'app/db'
import { plants } from 'app/lib/placeholder-data'

async function betterAuthMigration() {
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "user"
            (
                "id" text not null primary key, 
                "name" text not null, 
                "email" text not null unique, 
                "emailVerified" boolean not null, 
                "image" text, 
                "createdAt" timestamp not null, 
                "updatedAt" timestamp not null
            )
        `)
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "session"
            (
                "id" text not null primary key, 
                "expiresAt" timestamp not null, 
                "token" text not null unique, 
                "createdAt" timestamp not null, 
                "updatedAt" timestamp not null, 
                "ipAddress" text, 
                "userAgent" text, 
                "userId" text not null references "user" ("id")
            )
        `)
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "account" 
            (
                "id" text not null primary key, 
                "accountId" text not null, 
                "providerId" text not null, 
                "userId" text not null references "user" ("id"), 
                "accessToken" text, 
                "refreshToken" text, 
                "idToken" text, 
                "accessTokenExpiresAt" timestamp, 
                "refreshTokenExpiresAt" timestamp, 
                "scope" text, 
                "password" text, 
                "createdAt" timestamp not null, 
                "updatedAt" timestamp not null)
        `)
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "verification" 
            (
                "id" text not null primary key, 
                "identifier" text not null, 
                "value" text not null, 
                "expiresAt" timestamp not null, 
                "createdAt" timestamp, 
                "updatedAt" timestamp)
        `)
}

async function seedAddress() {
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "address" (
                "id" text not null primary key, 
                "nameAddress" text not null,
                "name" text not null,
                "address" text not null,
                "postcode" int not null,
                "city" text not null,
                "userId" text not null references "user" ("id"), 
                "createdAt" timestamp not null, 
                "updatedAt" timestamp not null
            )
        `)
}

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

async function deleteTables() {
    await cp.query(`DROP TABLE IF EXISTS plants`);
}

export async function GET() {
    try {
        await deleteTables()
        await betterAuthMigration()
        await seedAddress()
        await seedPlants()
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error(error)
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
