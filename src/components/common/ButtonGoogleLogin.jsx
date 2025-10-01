'use client'

import { signIn } from "next-auth/react";

const Google_logo = "/Google_logo.png";

export default function ButtonGoogleLogin() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })} // 👈 fuerza el flujo de Google
      className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
    >
      <img src={Google_logo} width={30} height={130} alt="" />
      <span className="text-gray-700 font-medium">
        Iniciar sesión con Google
      </span>
    </button>
  );
}
