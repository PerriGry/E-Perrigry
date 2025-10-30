import { getFilterProduct } from "@/services/producto.service";
import { productFilterSchema } from "@/validator/schemas";

/**
 * @swagger
 * /api/Productos:
 *   post:
 *     summary: Filtrar productos por categoría
 *     description: >
 *       Retorna una lista de productos según la categoría seleccionada.  
 *       Solo se permiten las categorías: **Gato**, **Perro** y **Hamster**.  
 *       La validación se realiza con Zod antes de consultar los datos en la base.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 enum: ["Gato", "Perro", "Hamster"]
 *                 example: "Gato"
 *             required:
 *               - category
 *     responses:
 *       200:
 *         description: Lista de productos filtrados correctamente
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
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       nombre:
 *                         type: string
 *                         example: "Arena Sanitaria Premium"
 *                       precio:
 *                         type: number
 *                         example: 25.5
 *                       stock:
 *                         type: integer
 *                         example: 40
 *                       category:
 *                         type: string
 *                         example: "Gato"
 *       400:
 *         description: Error de validación (Zod)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "La categoría es obligatoria"
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
export async function POST(req) {
    try {
        const body = await req.json();
        const {category} = body
        //Llamado al Servicio de Validacion
        const parsed = productFilterSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        const result = await getFilterProduct(category);
        return new Response(JSON.stringify({result}), {status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}