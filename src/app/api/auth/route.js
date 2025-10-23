import { insert_cliente, hashed } from "@/services/auth.service";

export async function POST(req) {
    try {
        //Body
        const {nombre, email, pwd} = await req.json();
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