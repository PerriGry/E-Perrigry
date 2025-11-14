"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GridSection() {
  const [allProducts, setAllProducts] = useState([]);       // Siempre contiene TODOS los productos
  const [productsList, setProductsList] = useState([]);     // Solo lo que se muestra
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Cargar TODOS los productos
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/Productos");
      const data = await res.json();

      const list = data.result || [];

      setAllProducts(list);   // Guardar los originales
      setProductsList(list);  // Mostrar los mismos por defecto
    } catch (err) {
      console.log("Error al cargar productos", err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filtrado LOCAL sin romper las URLs
  const handleFilterClick = (category) => {
    setActiveCategory(category);

    if (category === "Todos") {
      setProductsList(allProducts);
      return;
    }

    const filtered = allProducts.filter((p) => p.category === category);
    setProductsList(filtered);
  };

  const handleAddToCart = async (e, product) => {
    e.preventDefault();        // Evita que el Link navegue
    e.stopPropagation();       // Evita que el click lo capture el Link

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idProducto: product.idproducto, // ← importante, ya corregiste esto
          cantidad: 1                     // Solo 1 producto por click
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Producto agregado al carrito 😎");
      } else if (res.status === 401) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        window.location.href = "/login_user";
      } else {
        console.log(data.error);
        alert(data.error || "Error agregando al carrito");
      }

    } catch (error) {
      console.log("Error al agregar al carrito:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      {/* Título */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-sans text-gray-800">Productos Destacados</h2>
        <p className="text-black mt-2 font-sans">Nuestros productos</p>
      </div>

      {/* Botones de categorías */}
      <div className="flex justify-center gap-4 mb-10">
        {["Todos", "Perro", "Gato", "Hamster"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition 
              ${activeCategory === cat ? "bg-black text-white" : "bg-white text-black border-gray-400"}
              hover:bg-blue-950 hover:text-white`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {productsList.map((product, index) => {
          const safeImage =
            product.url_img &&
            (product.url_img.startsWith("http://") || product.url_img.startsWith("https://"))
              ? product.url_img
              : null;

          return (
            <Link
              key={index}
              href={`/product?name=${encodeURIComponent(product.nombre)}`}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-200">
                {safeImage ? (
                  <img
                    src={safeImage}
                    alt={product.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/default.jpg";
                    }}
                  />
                ) : (
                  <Image src="/images/default.jpg" alt="default" fill className="object-cover" />
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.nombre}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  Categoria: {product.category || "Sin categoría"}
                </p>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  Cantidades Disponibles: {product.stock || "Producto No Disponible"}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-blue-950 font-bold text-lg">
                    ${Number(product.precio).toLocaleString("es-CO")}
                  </span>

                  <button
                    className="px-3 py-1 bg-black text-white text-sm font-medium hover:bg-blue-950 transition-colors"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Agregar
                  </button>

                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
