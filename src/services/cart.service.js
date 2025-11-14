import pool from "@/lib/db";

//Servicio de Agregar Producto al Carrito
export const addProductCart = async(idCliente, idProducto, cantidad) => {
        await pool.query(
            'CALL anhadir_carrito($1,$2,$3);',
            [idCliente, idProducto, cantidad]
        );
        return true;    
}

//Servicio de Eliminar Producto del Carrito
export const deleteProductCart = async(idCliente, idProducto) => {
    await pool.query(
        'CALL p_delete_producto_from_carrito($1, $2);',
        [idCliente, idProducto]
    );
    return true;
}

//Servicio de Visualizacion de Carrito segun el cliente
export const getCartByClient = async(idClient) => {
    const result = await pool.query(
        `
        SELECT 
        P.IDPRODUCTO AS IDPRODUCTO,
        P.NOMBRE AS PRODUCTO,
        P.PRECIO AS PRECIO,
        P.URL_IMG AS IMAGE,
        DC.CANTIDAD AS CANTIDAD,
        DC.SUBTOTAL AS SUBTOTAL
        FROM DETALLE_CARRITO AS DC
        JOIN PRODUCTO AS P
        ON DC.FKPRODUCTO = P.IDPRODUCTO
        WHERE DC.FKCARRITO = ($1);
        `,
        [idClient]
    );
    return result.rows;
}
