import { deleteProductCart } from "@/services/cart.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function DELETE(req, {params}) {
    try {
        //Obtener Id de la Url
        const {id} = await params;
        //Obtener Token de la Cookie
        const token = (await cookies()).get('access_token')?.value;
        const user = verify_access_token(token)
        //Llamado al servicio de Eliminacion de Productos
        await deleteProductCart(user.id, id)
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Eliminado Correctamente"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error : error.message}), {status:500})
    }
    
}