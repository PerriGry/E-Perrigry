"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components";

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1); // cantidad por defecto
  const [recommended, setRecommended] = useState([]);

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

    useEffect(() => {
      if (!product) return;

      const fetchRecommended = async () => {
        try {
          const res = await fetch("/api/Productos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: normalized.description }),
          });

          const data = await res.json();

          if (res.status === 201) {
            // Excluir el mismo producto
            const filtered = data.result.filter(
              (p) => p.idproducto !== product.idproducto
            );
            setRecommended(filtered);
          }
        } catch (err) {
          console.log("Error cargando recomendados", err);
        }
      };

      fetchRecommended();
    }, [product]);

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
  <div className="min-h-screen bg-gray-50">
    <Header />

    <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row items-start gap-12">

      {/* IMAGEN DEL PRODUCTO */}
      <div className="flex-shrink-0 mx-auto md:mx-0">
        <div className="relative w-80 h-80 md:w-[380px] md:h-[380px]">
          <img
            src={normalized.image}
            alt={normalized.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* DETALLES DEL PRODUCTO */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{normalized.name}</h1>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {normalized.description}
        </p>

        <p className="text-gray-700 mb-4 font-medium">
          <span className="font-semibold text-gray-900">Disponibles:</span> {product.stock}
        </p>

        <p className="text-3xl font-bold text-blue-950 mb-6">
          ${normalized.price.toLocaleString("es-CO")}
        </p>

        {/* CANTIDAD */}
        <div className="flex items-center mb-6">
          <label className="mr-3 font-medium text-gray-800">Cantidad:</label>
          <input
            type="number"
            min={1}
            max={product.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1 w-24 text-center text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* BOTÓN AGREGAR */}
        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto px-8 py-3 bg-blue-900 text-white rounded-md font-medium shadow-md hover:bg-blue-950 transition-all"
        >
          Agregar al carrito
        </button>
      </div>
    </div>

    {/* PRODUCTOS RECOMENDADOS */}
    {recommended.length > 0 && (
      <div className="max-w-6xl mx-auto mt-16 px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Productos Recomendados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recommended.map((item) => (
            <div
              key={item.idproducto}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-xl transition-all"
              onClick={() =>
                (window.location.href = `/product?name=${encodeURIComponent(item.nombre)}`)
              }
            >
              <img
                src={item.url_img}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.nombre}
                </h3>

                <p className="text-gray-600 text-sm mb-2 truncate">
                  {item.category}
                </p>

                <p className="text-blue-900 font-bold text-lg">
                  ${item.precio.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

}
