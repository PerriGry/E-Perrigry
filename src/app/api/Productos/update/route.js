import { updateProduct } from "@/services/producto.service";

export async function PUT(req) {
    try {
        //Obtener Id del Porducto
        const {idProducto, stock, precio} = await req.json();  
        //llamado del servicio
        await updateProduct(idProducto, stock, precio);
        //Retornar Respuesta
        return new Response(JSON.stringify({message : "Producto Actualizado con Exito"}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}))
    }
}