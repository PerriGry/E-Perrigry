    import pool from "@/lib/db";

/*
Servicio de Registrar venta

    idCliente -> Id del cliente que va a hacer la compra
    idProductos -> Array de Productos a comprar
    cantidad -> Array de Cantidades Respectivas de cada Producto

    **Arrays de 'idProductos & Cantidad' deben ser concordes uno con el otro**
*/
export const saleRegister = async(idCliente, idProductos, cantidad) => {
    try {
        await pool.query(
            'CALL registrar_venta($1, $2, $3)',
            [idCliente, idProductos, cantidad]
        );
        return true;  
    } catch (error) {
        console.log('Error en saleRegister.sale.service: ', error)
        return false;
    }
    
}