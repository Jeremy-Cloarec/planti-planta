import { Pool } from "pg";
import dotenv from "dotenv";

if(process.env.NODE_ENV === 'development') {
    console.log('Loading development environment variables');
    dotenv.config({ path: '.env.development' });
}

export const connectionPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
})



