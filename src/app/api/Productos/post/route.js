import { RegisterProductos } from "@/services/producto.service";

export async function POST(req) {
    try {
        const {nombre, stock, precio, category} = await req.json()
        await RegisterProductos(nombre, stock, precio, category);
        return new Response(JSON.stringify({Message: "Producto Registrado"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}