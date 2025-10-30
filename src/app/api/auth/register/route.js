import { insert_cliente, hashed } from "@/services/auth.service";
import { registerSchema } from "@/validator/schemas";

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