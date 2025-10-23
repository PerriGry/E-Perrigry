import { Pool } from "pg";

const pool = new Pool({
    user:"postgres",
    password:"cr434953",
    port:5432,
    host:"localhost",
    database:"Eperrigry",
});

export default pool;