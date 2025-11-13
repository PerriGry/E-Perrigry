"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  // Aquí podrías traer los datos reales de una API o base de datos
  const products = [
    {
      name: "Collar para perro",
      description: "Collar ajustable con diseño moderno y cómodo.",
      price: 45000,
      image: "/images/collar.jpg",
    },
    {
      name: "Cama para gato",
      description: "Cama suave y acogedora para el descanso de tu gato.",
      price: 80000,
      image: "/images/cama.jpg",
    },
    {
      name: "Juguete interactivo",
      description: "Ideal para mantener activo a tu mascota.",
      price: 25000,
      image: "/images/juguete.jpg",
    },
    {
      name: "Comedero doble",
      description: "Incluye compartimientos para comida y agua.",
      price: 60000,
      image: "/images/comedero.jpg",
    },
  ];

  const product = products.find((p) => p.name === name);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Producto no encontrado :c
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] mb-6 md:mb-0 md:mr-10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-950 mb-6">
          ${product.price.toLocaleString("es-CO")}
        </p>
        <button className="px-6 py-2 bg-black text-white hover:bg-blue-950 transition-colors">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
