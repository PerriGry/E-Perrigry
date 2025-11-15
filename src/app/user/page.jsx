"use client";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components";
import Image from "next/image";

export default function UserPage() {
  const user = useAuth();

  const logoutUniversal = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/Login_user";
  };

  if (user === null) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg animate-pulse">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      {/* HEADER FIJO */}
      <div className="w-full shadow-md bg-white sticky top-0 z-50">
        <Header />
      </div>

      {/* CONTENIDO */}
      <div className="flex items-center justify-center px-4 py-12">

        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-200
                        animate-[fadeIn_0.4s_ease]">

          {/* IMAGEN DEL USUARIO */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-gray-200">
              <Image
                src="/user.png"
                alt="User Avatar"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>

          {/* TITULO */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Hola, {user.id} 
          </h2>

          <p className="text-gray-500 mb-8">
            Bienvenido a tu panel de usuario.
          </p>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <button
            onClick={logoutUniversal}
            className="bg-red-500 hover:bg-red-600 transition-all text-white font-semibold py-3 rounded-xl w-full shadow-md"
          >
            Cerrar sesión
          </button>
        </div>

      </div>
    </section>
  );
}
