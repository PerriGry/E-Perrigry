import { RegisterProductos } from "@/services/producto.service";
import { productRegisterSchema } from "@/validator/schemas";

/**
 * @swagger
 * /api/Productos/post:
 *   post:
 *     summary: Registrar un nuevo producto
 *     description: >
 *       Crea un nuevo producto en la base de datos validando sus datos con Zod.  
 *       Los campos requeridos son **nombre**, **stock**, **precio** y **category**.
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - stock
 *               - precio
 *               - category
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Croquetas Premium"
 *               stock:
 *                 type: integer
 *                 description: Cantidad disponible del producto
 *                 example: 100
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto (mayor a 0)
 *                 example: 45000.99
 *               category:
 *                 type: string
 *                 enum: [Gato, Perro, Hamster]
 *                 description: Categoría del producto
 *                 example: "Perro"
 *     responses:
 *       201:
 *         description: Producto registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Message:
 *                   type: string
 *                   example: "Producto Registrado"
 *       400:
 *         description: Error de validación en los datos enviados (Zod)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El nombre es obligatorio"
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
        const body = await req.json();
        const {nombre, stock, precio, category} = body;
        //Llamado al Servicio de Validacion
        const parsed = productRegisterSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        await RegisterProductos(nombre, stock, precio, category);
        return new Response(JSON.stringify({Message: "Producto Registrado"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}