import pool from "@/lib/db";

export const googleLogin = async(name, email, googleId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM f_login_google($1,$2,$3);',
            [name, email, googleId]
        );
        return result.rows[0];
    } catch (error) {
        console.log("Error en googleLogin.google.service: ", error)
    }
}