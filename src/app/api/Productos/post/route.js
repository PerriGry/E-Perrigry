import { RegisterProductos } from "@/services/producto.service";
import { productRegisterSchema } from "@/validator/schemas";

/**
 * @swagger
 * /api/Productos/post:
 *   post:
 *     summary: Registrar un nuevo producto
 *     description: >
 *       Crea un nuevo producto en la base de datos validando sus datos con Zod.  
 *       Los campos requeridos son **nombre**, **stock**, **precio**, **category** y **img_url** (debe ser una URL válida).
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
 *               - img_url
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
 *               img_url:
 *                 type: string
 *                 format: uri
 *                 description: URL de la imagen del producto (debe ser una URL válida)
 *                 example: "https://tse1.mm.bing.net/th/id/OIP.PTP4IQV-roMyF3EpbCqE7wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
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
        const {nombre, stock, precio, category, img_url} = body;
        //Llamado al Servicio de Validacion
        const parsed = productRegisterSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        await RegisterProductos(nombre, stock, precio, category, img_url);
        return new Response(JSON.stringify({Message: "Producto Registrado"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}