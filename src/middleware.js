import { NextResponse } from "next/server";
import { cookies } from "next/headers.js";
import { verify_access_token } from "./services/auth.service.js";

export async function middleware(request){
    //Declarar EndPoints Públicos
    const routesPublic = [
        '/api/auth/Login',
        '/api/auth/register',
        '/api/auth/auth_google',
        '/api/docs',
        '/api/swagger.json'
    ];
    //Recorrer cada ruta y ver Sí alguna Coincide con lo solicitado (.some())
    //(.nextUrl) -> Acceder a la URL de la request
    //(.pathname) -> Obtener solamente el path, Sin Dominio
    //(.startsWith()) -> Verifica Sí el String empieza con lo solicitado
    //Es decir, Mirar Sí el pathname de la request está habilitada cómo Ruta Pública
    if(routesPublic.some( route => request.nextUrl.pathname.startsWith(route))){
        //Permitir Seguir el Flujo
        return NextResponse.next();
    } 
    //Obtener Token Contenido en la Cookie
    const token = (await cookies()).get('access_token')?.value;
    //Verificar Disponibilidad del Token
    if(!token) {
        return NextResponse.json({message : 'Token No Proporcionado'}, {status:401})
    }
    
    try {
        //Verificar Integridad del Token
        verify_access_token(token)
        //Sí ha sido correcto la verificación, permitirá Seguir el flujo
        return NextResponse.next()
    } catch (error) {
        console.log(error)
        //Sí hubo error en la verificación del token, entrará en el catch
        return NextResponse.json({message : 'Token Invalido'}, {status:401})
    }
}
//Aplicar Middleware en las rutas de /Api
export const config = {
    matcher: ['/api/:path*'],
    runtime: 'nodejs',
}