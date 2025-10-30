import { saleRegister } from "@/services/sale.service";
import { verify_access_token } from "@/services/auth.service";
import { cookies } from "next/headers";
import { SaleSchema } from "@/validator/schemas";

export async function POST(req) {
    try {
        //Body
        const body = await req.json();
        //Datos necesarios para la venta
        const {idProductos, cantidad} = body;
        //Llamado al Servicio de Validacion
        const parsed = SaleSchema.safeParse(body);
        //Validacion de Estado de los Valores
        if(!parsed.success) return new Response(JSON.stringify({error: parsed.error.message}),{status:400});
        //Obtener Token proveniente de la cookie
        const token = (await cookies()).get('access_token')?.value;
        //Decodificar token
        const user = verify_access_token(token)
        //Servicio de Registrar venta
        const saleDone = await saleRegister(user.id, idProductos, cantidad)
        //Verificar estado de la Compra
        if(saleDone == false) return new Response(JSON.stringify({error: "Venta No Realizada"}), {status:400})
        //Retornar Respuesta exitosa
        return new Response(JSON.stringify({message:"Venta Realizada con Exito"}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}),{status:500})
    }
}