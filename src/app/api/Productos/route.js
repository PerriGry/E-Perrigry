import { getFilterProduct } from "@/services/producto.service";

export async function POST(req) {
    try {
        const {category} = await req.json()
        const result = await getFilterProduct(category);
        return new Response(JSON.stringify({result}), {status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: error.message}), {status:500})
    }
}