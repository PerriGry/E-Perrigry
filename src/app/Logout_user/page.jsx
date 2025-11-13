"use client";

import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center  min-h-screen">
   
      {!session ? (
        <>
          <h2>Inicia sesión con Google</h2>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Iniciar sesión con Google
          </button>
        </>
      ) : (
        <>
          <h2>Hola, {session.user.name}</h2>
          <img
            src={session.user.image}
            alt="foto"
            className="rounded-full w-16 h-16"
          />
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white p-2 rounded mt-3"
          >
            Cerrar sesión
          </button>
        </>
      )}

    </div>

    
  );

}