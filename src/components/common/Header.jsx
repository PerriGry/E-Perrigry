"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

const logo = "/Perrigry_logo_ennegro.png";
const cart = "/cart.png";
const user = "/user.png";

export default function Headers() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/">
        <Image src={logo} width={100} height={100} alt="logo" className="cursor-pointer" />
      </Link>

      {/* Menú desktop */}
      <nav className="hidden md:flex items-center space-x-8 font-semibold text-black">
        <Link href="/" className="hover:text-gray-600 transition">Inicio</Link>
        <Link href="/" className="hover:text-gray-600 transition">Perros</Link>
        <Link href="/" className="hover:text-gray-600 transition">Gatos</Link>
        <Link href="/contact" className="hover:text-gray-600 transition">Hampter</Link>
      </nav>

      {/* Iconos (desktop + mobile) */}
      <div className="hidden md:flex items-center space-x-6">
        {!session ? (
            <Link href="/Login_user">
                <Image src={user} width={32} height={32} alt="user" className="cursor-pointer hover:opacity-80" />
            </Link>
        ):(
            <Link href="/Login_user" className="flex items-center gap-2">
                <p className="font-semibold text-black">Hola! {session.user.name}</p>
                <Image src={user} width={32} height={32} alt="user" className="cursor-pointer hover:opacity-80" />
            </Link>
        )}
        <Link href="/g_cart">
          <Image src={cart} width={32} height={32} alt="cart" className="cursor-pointer hover:opacity-80" />
        </Link>
      </div>

      {/* Botón hamburguesa (solo en móvil) */}
      <button 
        className="md:hidden flex flex-col space-y-1 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span className="w-7 h-1 bg-black rounded"></span>
        <span className="w-7 h-1 bg-black rounded"></span>
        <span className="w-7 h-1 bg-black rounded"></span>
      </button>

      {/* Menú mobile */}
      <div className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-lg w-64 p-6 transform 
                      transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Cerrar menú */}
        <button 
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        {/* Navegación móvil */}
        <nav className="flex flex-col space-y-6 text-lg font-semibold mt-10">
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/" onClick={() => setOpen(false)}>Perros</Link>
          <Link href="/" onClick={() => setOpen(false)}>Gatos</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Hampter</Link>
        </nav>

        {/* Iconos mobile */}
        <div className="flex items-center space-x-6 mt-10">
          <Link href="/Logout_user">
            <Image src={user} width={32} height={32} alt="user" className="cursor-pointer" />
          </Link>
          <Link href="/">
            <Image src={cart} width={32} height={32} alt="cart" className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
}
