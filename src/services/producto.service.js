import pool from "@/lib/db"

export const GetProductos = async()=>{
    const result = await pool.query(
        'SELECT*FROM PRODUCTO;'
    )
    return result.rows;
}

export const RegisterProductos = async(nombre, stock, precio)=>{
    return await pool.query(
    'CALL p_insert_productos($1,$2,$3);',
    [nombre, stock, precio]
    )
}