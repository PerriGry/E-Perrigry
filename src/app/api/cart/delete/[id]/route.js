import { deleteProductCart } from "@/services/cart.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";

/**
 * @swagger
 * /cart/delete/{id}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     description: Elimina un producto específico del carrito del cliente autenticado usando su ID.
 *     tags:
 *       - Carrito
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto que se desea eliminar del carrito.
 *         example: 12
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente del carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Producto Eliminado Correctamente"
 *       400:
 *         description: ID inválido o no encontrado en el carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El ID proporcionado no existe en el carrito"
 *       401:
 *         description: Token de acceso inválido o ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido o no autorizado"
 *       500:
 *         description: Error interno del servidor al eliminar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar producto del carrito"
 */
export async function DELETE(req, {params}) {
    try {
        //Obtener Id de la Url
        const {id} = await params;
        //Obtener Token de la Cookie
        const token = (await cookies()).get('access_token')?.value;
        const user = verify_access_token(token)
        //Llamado al servicio de Eliminacion de Productos
        await deleteProductCart(user.id, id)
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Eliminado Correctamente"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error : error.message}), {status:500})
    }
    
}