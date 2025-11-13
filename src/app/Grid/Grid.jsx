"use client";

import Link from "next/link";
import Image from "next/image";

export default function GridSection() {
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

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      {/* Título */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-sans text-gray-800 ">
          Productos Destacados
        </h2>
        <p className="text-black mt-2 font-sans">Nuestros productos</p>
      </div>

      {/* Grid de productos */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link
            key={index}
            href={`/product?name=${encodeURIComponent(product.name)}`}
            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Imagen */}
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-blue-950 font-bold text-lg">
                  ${product.price.toLocaleString("es-CO")}
                </span>
                <button className="px-3 py-1 bg-black text-white text-sm font-medium hover:bg-blue-950 transition-colors">
                  Agregar
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
