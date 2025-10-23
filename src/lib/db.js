import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.db_url
})

export default pool;