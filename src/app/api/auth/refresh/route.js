import {  find_id, verify_refresh_token, generate_token } from "@/services/auth.service";
import { cookies } from "next/headers";
export async function POST(req) {
    try {
        //Obtener Cookie con el Refresh Token
        const token = (await cookies()).get("refresh_token")?.value;
        //Llamado del servicio de verificar refresh token y Obtener data del token
        let payload = verify_refresh_token(token);
        //Verificacion Del Resultado Retornado
        if(!payload) return new Response(JSON.stringify({error : "Token Invalido o Expirado"}));    
        //Llamado del Servicio busqueda del ID
        const result = await find_id(payload.id);
        //Verificacion del servicio
        if(result === 0) return new Response(JSON.stringify({error: "Cliente No Encontrado"}), {status:401});
        //Llamado del servicio para regenerar el token
        const {access_token, refresh_token} = generate_token(result);
        //SET en Una access_token en una cookie
        (await cookies()).set('access_token', access_token);
        //SET en Una refresh_token en una cookie
        (await cookies()).set('refresh_token', refresh_token);
        //Respuesta Exitosa
        return new Response(JSON.stringify({result:"Refresco Exitoso"}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error : error.message}), {status:500})
    }
    
}