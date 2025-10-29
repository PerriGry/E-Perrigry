import { deleteProduct } from "@/services/producto.service";

export async function DELETE(req) {
    try {
        //Obtener Id del Porducto
        const {idProducto} = await req.json();  
        //llamado del servicio
        await deleteProduct(idProducto);
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Eliminado con Exito"}), {status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:400})
    }
}