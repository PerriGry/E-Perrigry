import { deleteProduct } from "@/services/producto.service";
import { productDeleteSchema } from "@/validator/schemas";

export async function DELETE(req) {
    try {
        const body = await req.json();
        //Obtener Id del Porducto
        const {idProducto} = body;
        //Llamado al Servicio de Validacion
        const parsed = productDeleteSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});  
        //llamado del servicio
        await deleteProduct(idProducto);
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Eliminado con Exito"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}