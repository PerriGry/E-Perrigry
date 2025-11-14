"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1); // cantidad por defecto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/Productos");
        const data = await res.json();
        setProductsList(data.result || []);
      } catch (err) {
        console.log("Error cargando productos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let product = productsList.find((p) => p.nombre === name);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Producto no encontrado :c
        </h2>
      </div>
    );
  }

  // Normalización (API/local)
  const normalized = {
    name: product.name || product.nombre,
    description: product.description || product.category || "Sin descripción",
    price: parseFloat(product.price || product.precio || 0),
    image: product.url_img || "/Perrigry_logo_ennegro.png",
  };

  // Función para agregar al carrito
  const handleAddToCart = async () => {
    
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idProducto: product.idproducto, cantidad }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Producto agregado al carrito 😎");
      } else if (res.status === 401) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        window.location.href = "/login_user";
      } else {
        console.log(data.error)
        alert(data.error || "Error agregando al carrito");
      }
    } catch (error) {
      console.log("Error al agregar al carrito:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] mb-6 md:mb-0 md:mr-10">
        <img
          src={normalized.image}
          alt={normalized.name}
          className="w-full h-full object-cover shadow-lg rounded-md"
        />
      </div>

      <div className="max-w-md text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{normalized.name}</h1>
        <p className="text-gray-600 mb-6">{normalized.description}</p>
        <p className="text-gray-600 mb-6">Cantidades Disponibles: {product.stock}</p>

        <p className="text-2xl font-semibold text-blue-950 mb-4">
          ${normalized.price.toLocaleString("es-CO")}
        </p>

        {/* Selector de cantidad */}
        <div className="mb-4">
          <label className="mr-2 font-medium text-black">Cantidad:</label>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="border rounded px-2 py-1 w-20 text-center text-black"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-black text-white hover:bg-blue-950 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
