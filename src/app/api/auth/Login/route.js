import { find_email, compare_pwd, generate_token } from "@/services/auth.service";
import { cookies } from "next/headers";
import { loginSchema } from "@/validator/schemas";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Verifica las credenciales del usuario y genera tokens de autenticación (access y refresh).
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Login exitoso. Retorna mensaje de confirmación y setea cookies con los tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "login exitoso"
 *       400:
 *         description: Error de validación en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El campo email es obligatorio"
 *       401:
 *         description: Credenciales incorrectas (contraseña errónea o usuario no encontrado).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña Erronea"
 *       500:
 *         description: Error interno del servidor.
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
        //Asignar Body
        const {email, password} = body;
        //Llamado al Servicio de Validacion
        const parsed = loginSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Buscar User segun el Email 
        const user = await find_email(email);
        //Verificar
        if(!user) return new Response("USER NO ENCONTRADO");
        //Verificar Contrasenha
        const match = await compare_pwd(password, user.pwd);
        if(!match) return new Response(JSON.stringify({ message: "Contraseña Erronea" }), { status: 401 });
        //Generate Token
        const {access_token, refresh_token} = generate_token(user);
        //Guardar en Una access_token en una cookie
        (await cookies()).set('access_token', access_token);
        //Guardar en Una refresh_token en una cookie
        (await cookies()).set('refresh_token', refresh_token);
        //Response
        return new Response(JSON.stringify({message : "login exitoso"}), {status:201})    
    } 
    catch (error) {
        return new Response(JSON.stringify({error : error.message}), {status:500})
    }
}
    