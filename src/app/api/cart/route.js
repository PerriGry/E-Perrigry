import { addProductCart, getCartByClient } from "@/services/cart.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";
import { cartSchema } from "@/validator/schemas";

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener productos del carrito
 *     description: Retorna los productos actuales en el carrito del cliente autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_producto:
 *                         type: integer
 *                         example: 12
 *                       nombre:
 *                         type: string
 *                         example: "Croquetas para perro"
 *                       precio:
 *                         type: number
 *                         example: 52000
 *                       cantidad:
 *                         type: integer
 *                         example: 2
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
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el carrito del cliente"
 *
 *   post:
 *     summary: Agregar producto al carrito
 *     description: Agrega un producto con una cantidad específica al carrito del cliente autenticado.
 *     tags:
 *       - Carrito
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - cantidad
 *             properties:
 *               idProducto:
 *                 type: integer
 *                 example: 15
 *               cantidad:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Producto agregado correctamente al carrito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Agregado al Carrito con Exito"
 *       400:
 *         description: Error de validación en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El campo cantidad debe ser un número entero positivo"
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
 *         description: Error interno del servidor al agregar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al agregar producto al carrito"
 */
//Objetivo -> Visualizar productos contenidos en el carrito segun el cliente
export async function GET(req) {
    try {
        //Obtener token de la cookie
        const token = (await cookies()).get('access_token')?.value;
        //Obtener value del Token
        const user = verify_access_token(token)
        //Servicio de Obtencion de productos provenientes del carrito
        const result = await getCartByClient(user.id)
        //Retornar Respuesta
        return new Response (JSON.stringify({result: result}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}


//Objetivo -> Agregar al Carrito un Producto y su Respectiva Cantidad
export async function POST(req){
    try {
        //Body 
        const body = await req.json();
        const {idProducto, cantidad} = body;
        //Llamado al Servicio de Validacion
        const parsed = cartSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Obtener Token de la Cookie
        const token = (await cookies()).get('access_token')?.value;
        //Obtener value del Token
        const user = verify_access_token(token)
        //Llamado del Servicio addProductCart
        await addProductCart(user.id, idProducto, cantidad);
        return new Response(JSON.stringify({message: "Agregado al Carrito con Exito"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
    
}