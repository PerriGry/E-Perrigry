import pool from "@/lib/db";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//SERVICIO HASHEAR PASSWORDS
export const hashed = async(pwd)=>{
    return await bcrypt.hash(pwd, 8);
}
//SERVICIO COMPARAR PASSWORDS HASHEADAS
export const compare_pwd = async(pwd, pwdhashed)=>{
    return await bcrypt.compare(pwd, pwdhashed);
}
//SERVICIO REGISTRAR CLIENTE
export const insert_cliente = async(nombre, email,  pwd)=>{
    const result = await pool.query(
        'SELECT * FROM f_registar_cliente($1,$2,$3);',
        [nombre, email, pwd]
    );
    return result.rows[0]; 
}
//SERVICIO LOGIN CLIENTE
export const find_email = async(email)=>{
    const result = await pool.query(
        'SELECT * FROM f_login_cliente($1);',
        [email]
    );
    return result.rows[0];
}
//SERVICIO BUSQUEDA DE USER BY ID
export const find_id = async(id)=>{
    const result = await pool.query(
        'SELECT idcliente FROM CLIENTE WHERE IDCLIENTE = ($1);',
        [id]
    )
    return result.rows[0];
}
//SERVICIO GENERAR TOKENS (ACCESS, REFRESH)
export const generate_token = (user)=>{
    const access_token = JWT.sign({
        id:user.idcliente,
    },
    process.env.ACCESS_SECRET_KEY_JWT,
    {expiresIn:process.env.ACCESS_EXPIRE_IN}
    );
    const refresh_token = JWT.sign({
        id:user.idcliente,
    },
    process.env.REFRESH_SECRET_KEY_JWT,
    {expiresIn:process.env.REFRESH_EXPIRE_IN}
    );
    return { access_token, refresh_token};
}
//SERVICIO VERIFICAR REFRESH TOKEN
export const verify_refresh_token = (token) =>{
    try {
        return JWT.verify(token, process.env.REFRESH_SECRET_KEY_JWT);    
    } catch (error) {
        return null;
    }
}
//SERVICIO VERIFICAR ACCESS TOKEN
export const verify_access_token = (token) =>{
    return JWT.verify(token, process.env.ACCESS_SECRET_KEY_JWT);
}
