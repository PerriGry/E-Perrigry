import { addProductCart, getCartByClient } from "@/services/cart.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";
import { cartSchema } from "@/validator/schemas";

//Objetivo -> Visualizar productos contenidos en el carrito segun el cliente
export async function GET(req) {
    try {
        //Obtener token de la cookie
        const token = (await cookies()).get('access_token')?.value;
        //Obtener value del Token
        const user = verify_access_token(token)
        //Servicio de Obtencion de productos provenientes del carrito
        const result = await getCartByClient(user.id)
        //Retornar Respuesta
        return new Response (JSON.stringify({result: result}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}


//Objetivo -> Agregar al Carrito un Producto y su Respectiva Cantidad
export async function POST(req){
    try {
        //Body 
        const body = await req.json();
        const {idProducto, cantidad} = body;
        //Llamado al Servicio de Validacion
        const parsed = cartSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Obtener Token de la Cookie
        const token = (await cookies()).get('access_token')?.value;
        //Obtener value del Token
        const user = verify_access_token(token)
        //Llamado del Servicio addProductCart
        await addProductCart(user.id, idProducto, cantidad);
        return new Response(JSON.stringify({message: "Agregado al Carrito con Exito"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
    
}