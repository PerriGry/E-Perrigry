import { insert_cliente, hashed } from "@/services/auth.service";
import { registerSchema } from "@/validator/schemas";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de un nuevo cliente
 *     description: Crea un nuevo usuario cliente con su nombre, correo y contraseña (hasheada antes de guardar).
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - pwd
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: "Cristian Valderrama"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "cristian@example.com"
 *               pwd:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   example:
 *                     id_cliente: 1
 *                     nombre: "Cristian Valderrama"
 *                     email: "cristian@example.com"
 *       400:
 *         description: Error de validación en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El nombre es obligatorio"
 *       500:
 *         description: Error interno del servidor al registrar al usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al insertar en base de datos"
 */
export async function POST(req) {
    try {
        //Body
        const body = await req.json();
        //Aisignar data
        const {nombre, email, pwd} = body;
        //Llamado al Servicio de Validacion
        const parsed = registerSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Hashear PassWord
        const hashed_pwd = await hashed(pwd);
        //Insertar En Table_Cliente
        const result = await insert_cliente(nombre, email, hashed_pwd);
        //Enviar Respuesta
        return new Response(JSON.stringify({result}), {status:201});
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}