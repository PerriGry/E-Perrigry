import { deleteProductoFromCart } from "@/services/cart.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";

export async function DELETE(req) {
    try {
        const body = await req.json();
        const {idProduct, Cantidad} = body;
        //Obtener token de la cookie
        const token = (await cookies()).get('access_token')?.value;
        //Obtener value del Token
        const user = verify_access_token(token)
        //Llamado al servicio
        const result = await deleteProductoFromCart(user.id, idProduct, Cantidad)
        //Si es diferente de True, es porque no se realizó correctamente la elimiancion
        if (!result) return new Response(JSON.stringify({message: 'Producto No Eliminado Correctamente'}), {status:400})
        //Retornar Mensaje
        return new Response(JSON.stringify({meesage: 'Eliminacion Exitosa'}), {status:200})

    } catch (error) {
        console.log("Error en deleteproducto: ", error);
        return new Error(JSON.stringify({message : error.message}), {status:500})
    }
}