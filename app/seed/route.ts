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
                "updatedAt" timestamp not null,
                "stripeCustomerId" text
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

    await cp.query(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT ;`)
}

async function seedOrder() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await cp.query(`
        CREATE TABLE IF NOT EXISTS "order" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "userId" TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,

        -- Références Stripe
        "stripeSessionId" TEXT UNIQUE,
        "stripePaymentIntentId" TEXT,
        "stripeCustomerId" TEXT,

        -- Montant et statut
        "totalAmount" NUMERIC NOT NULL,
        "currency" VARCHAR(10) DEFAULT 'eur',
        "status" VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded, etc.

        -- Références vers les adresses
        "billingAddressId" UUID REFERENCES "address" ("id") ON DELETE SET NULL,
        "shippingAddressId" UUID REFERENCES "address" ("id") ON DELETE SET NULL,

        -- Suivi et infos complémentaires
        "delivered" BOOLEAN DEFAULT FALSE,

        -- Timestamps
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
        );
    `);
}

async function seedOrderItems() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    await cp.query(`
        CREATE TABLE IF NOT EXISTS "order_items" (
        "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        "orderId" UUID NOT NULL REFERENCES "order" ("id") ON DELETE CASCADE,
        "plantId" UUID NOT NULL REFERENCES "plants" ("id") ON DELETE CASCADE,

        "quantity" INTEGER NOT NULL DEFAULT 1,
        "unitPrice" NUMERIC NOT NULL,       -- prix unitaire au moment de l'achat
        "totalPrice" NUMERIC NOT NULL,      -- quantité × prix unitaire

        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
        );
    `);
}
async function seedAddress() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)
    await cp.query(`
        CREATE TABLE IF NOT EXISTS "address" (
                "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                "nameAddress" text not null,
                "name" text not null,
                "address" text not null,
                "postcode" int not null,
                "city" text not null,
                "userId" text not null references "user" ("id") ON DELETE CASCADE, 
                "createdAt" timestamp not null, 
                "updatedAt" timestamp not null
            )
        `)
}

async function seedPlants() {
    await cp.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    await cp.query(`
        CREATE TABLE IF NOT EXISTS plants
        (
            id       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title    TEXT    NOT NULL,
            price    NUMERIC NOT NULL,
            quantity NUMERIC NOT NULL,
            legend   TEXT    NOT NULL
        )
    `);

    const { rows } = await cp.query(`SELECT COUNT(*) AS count FROM plants`);
    const count = parseInt(rows[0].count, 10);

    if (count > 0) {
        return;
    }

    await Promise.all(
        plants.map((plant) =>
            cp.query(
                `INSERT INTO plants (title, price, quantity, legend)
                VALUES ($1, $2, $3, $4)`,
                [plant.title, plant.price, plant.quantity, plant.legend]
            )
        )
    );
}

// async function deleteTables() {
//     await cp.query(`DROP TABLE IF EXISTS plants`);
// }

export async function GET() {
    try {
        // await deleteTables()
        await betterAuthMigration()
        await seedAddress()
        await seedPlants()
        await seedOrder()
        await seedOrderItems()
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error(error)
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
