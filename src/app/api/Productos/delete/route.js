import { deleteProduct } from "@/services/producto.service";
import { productDeleteSchema } from "@/validator/schemas";

/**
 * @swagger
 * /api/Productos/delete:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     description: >
 *       Elimina un producto existente en la base de datos utilizando su identificador único (**idProducto**).  
 *       Antes de eliminar, se valida el dato con Zod para garantizar que sea un número entero positivo.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProducto:
 *                 type: integer
 *                 example: 15
 *             required:
 *               - idProducto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto Eliminado con Exito"
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
 *                   example: "Error interno del servidor"
 */
export async function DELETE(req) {
    try {
        const body = await req.json();
        //Obtener Id del Porducto
        const {idProducto} = body;
        //Llamado al Servicio de Validacion
        const parsed = productDeleteSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});  
        //llamado del servicio
        await deleteProduct(idProducto);
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Eliminado con Exito"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}