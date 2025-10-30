import { getFilterProduct } from "@/services/producto.service";
import { productFilterSchema } from "@/validator/schemas";

export async function POST(req) {
    try {
        const body = await req.json();
        const {category} = body
        //Llamado al Servicio de Validacion
        const parsed = productFilterSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        const result = await getFilterProduct(category);
        return new Response(JSON.stringify({result}), {status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}