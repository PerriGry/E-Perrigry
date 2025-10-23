import { GetProductos, RegisterProductos } from "@/services/producto.service";

export async function GET() {
    try {
        const result = await GetProductos();
        return new Response(JSON.stringify({result}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}

export async function POST(req) {
    try {
        const {nombre, stock, precio} = await req.json()
        await RegisterProductos(nombre, stock, precio);
        return new Response(JSON.stringify({Message: "Producto Registrado"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}