import { RegisterProductos } from "@/services/producto.service";
import { productRegisterSchema } from "@/validator/schemas";

export async function POST(req) {
    try {
        const body = await req.json();
        const {nombre, stock, precio, category} = body;
        //Llamado al Servicio de Validacion
        const parsed = productRegisterSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        await RegisterProductos(nombre, stock, precio, category);
        return new Response(JSON.stringify({Message: "Producto Registrado"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}