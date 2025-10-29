import pool from "@/lib/db"

export const GetProductos = async()=>{
    const result = await pool.query(
        'SELECT*FROM PRODUCTO;'
    )
    return result.rows;
}

//Servicio de Vista de Porducto Segun Categoria
export const getFilterProduct = async(category) => {
    try {
        const result = await pool.query(
            'SELECT * FROM filter_by_Category WHERE CATEGORY = ($1);',
            [category]
        );
        return result.rows;
    } catch (error) {
        console.log('error from getFilterProduct.service: ', error)
        return error;
    }
}

//Servicio Obtener Detalles de Producto Seleccionado
export const getProductById = async(idProduct) => {
    try {
        const result = await pool.query(
            'SELECT * FROM PRODUCT WHERE IDPRODUCT = ($1);',
            [idProduct]
        );
        return result.rows[0]    
    } catch (error) {
        console.log('Error from getProductById: ', error)
        return error;
    }
}

//Servicio de Registro de Productos
export const RegisterProductos = async(nombre, stock, precio, category)=>{
    return await pool.query(
    'CALL p_insert_productos($1,$2,$3,$4);',
    [nombre, stock, precio, category]
    )
}

//Servicio de Actualizacion de Datos de Productos
export const updateProduct = async(idProduct, stock, precio) => {
    return await pool.query(
        'CALL p_update_producto($1,$2,$3);',
        [idProduct, stock, precio]
    );
}

//Servicio de Eliminacion de Datos de Productos
export const deleteProduct = async(idProduct) => {
    return await pool.query(
        'CALL p_delete_producto($1);',
        [idProduct]
    );
}