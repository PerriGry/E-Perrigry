import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  //Borrar cookie del backend
  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    //Eliminar de Inmediato
    expires: new Date(0), 
  });

  return response;
}
