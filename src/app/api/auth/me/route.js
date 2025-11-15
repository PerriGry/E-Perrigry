// /api/me/route.js
import { cookies } from "next/headers";
import { verify_access_token } from "@/services/auth.service";

export async function GET() {
  const token = cookies().get("access_token")?.value;

  if (!token) {
    return new Response("No autorizado", { status: 401 });
  }

  try {
    const payload = verify_access_token(token);
    return Response.json(payload);
  } catch {
    return new Response("Token inválido", { status: 401 });
  }
}
