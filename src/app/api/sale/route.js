import { saleRegister } from "@/services/sale.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";
import { SaleSchema } from "@/validator/schemas";

/**
 * @swagger
 * /api/sale:
 *   post:
 *     summary: Registrar una venta
 *     description: >
 *       Registra una venta realizada por un cliente autenticado.  
 *       Se requiere un **access_token** válido en las cookies para identificar al usuario.  
 *       La venta incluye los productos comprados y las cantidades correspondientes.
 *     tags:
 *       - Ventas
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProductos
 *               - cantidad
 *             properties:
 *               idProductos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de los productos vendidos
 *                 example: [1, 3, 5]
 *               cantidad:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de cantidades correspondientes a cada producto
 *                 example: [2, 1, 4]
 *     responses:
 *       200:
 *         description: Venta realizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Venta Realizada con Exito"
 *       400:
 *         description: Error de validación o venta no realizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Venta No Realizada"
 *       401:
 *         description: Token inválido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: token inválido o expirado"
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
export async function POST(req) {
    try {
        //Body
        const body = await req.json();
        //Datos necesarios para la venta
        const {idProductos, cantidad} = body;
        //Llamado al Servicio de Validacion
        const parsed = SaleSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Obtener Token proveniente de la cookie
        const token = (await cookies()).get('access_token')?.value;
        //Decodificar token
        const user = verify_access_token(token)
        //Servicio de Registrar venta
        const saleDone = await saleRegister(user.id, idProductos, cantidad)
        //Verificar estado de la Compra
        if(saleDone == false) return new Response(JSON.stringify({error: "Venta No Realizada"}), {status:400})
        //Retornar Respuesta exitosa
        return new Response(JSON.stringify({message:"Venta Realizada con Exito"}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}