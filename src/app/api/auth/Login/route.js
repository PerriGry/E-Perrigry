import { find_email, compare_pwd, generate_token } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        //Body
        const {email, password} = await req.json();
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
    