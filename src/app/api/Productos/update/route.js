import { updateProduct } from "@/services/producto.service";

/**
 * @swagger
 * /api/docs/update:
 *   put:
 *     summary: Actualizar información de un producto
 *     description: >
 *       Permite modificar los datos principales de un producto existente en la base de datos.  
 *       Solo se pueden actualizar los campos **stock** y **precio**, identificando el producto mediante su **idProducto**.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - stock
 *               - precio
 *             properties:
 *               idProducto:
 *                 type: integer
 *                 description: ID del producto a actualizar
 *                 example: 5
 *               stock:
 *                 type: integer
 *                 description: Nuevo stock del producto
 *                 example: 30
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Nuevo precio del producto (mayor que 0)
 *                 example: 59999.99
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto Actualizado con Exito"
 *       400:
 *         description: Error de validación en los datos enviados (Zod)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El Id no puede ser negativo"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export async function PUT(req) {
    try {
        //Obtener Id del Porducto
        const {idProducto, stock, precio} = await req.json();  
        //llamado del servicio
        await updateProduct(idProducto, stock, precio);
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Actualizado con Exito"}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}))
    }
}