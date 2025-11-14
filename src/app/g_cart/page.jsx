"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar el carrito
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (res.status === 200) {
        setCart(data.result || []);
      } else if (res.status === 401) {
        alert("Debes iniciar sesión para ver tu carrito");
        window.location.href = "/login_user";
      }
    } catch (err) {
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAdd = async (item, qty) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idProducto: item.idproducto,
          cantidad: qty,
        }),
      });

      const data = await res.json();
      if (res.status === 200) fetchCart();
      else alert(data.error || "Error");
    } catch (err) {
      alert("No se pudo conectar con el servidor");
    }
  };

  const handleDelete = async (item) => {
    try {
      const res = await fetch("/api/cart/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.idproducto }),
      });

      if (res.status === 200) fetchCart();
    } catch (err) {
      alert("No se pudo conectar con el servidor");
    }
  };

  if (loading) return <p className="p-10 text-center">Cargando carrito...</p>;

  return (
    <section className="p-6 min-h-screen bg-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">My Cart</h1>

        <button
          className="px-4 py-2 border rounded-lg bg-gray-600 hover:bg-gray-500"
          onClick={() => (window.location.href = "/")}
        >
          ← Continue shopping
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-4 px-4 text-gray-500 font-semibold mb-4">
        <p>PRODUCT</p>
        <p>PRICE</p>
        <p className="text-center">QTY</p>
        <p className="text-right">TOTAL</p>
      </div>

      {/* PRODUCTS */}
      <div className="flex flex-col divide-y">
        {cart.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 items-center py-6 px-4 bg-white"
          >
            {/* PRODUCT INFO */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md border"
              />
              <div>
                <p className="font-semibold text-gray-900">{item.producto}</p>
                <p className="text-gray-500 text-sm">
                  ID: #{item.idproducto}
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div>
              <p className="text-gray-900 font-medium">
                ${item.precio.toLocaleString("es-CO")}
              </p>
            </div>

            {/* QTY */}
            <div className="flex items-center justify-center gap-3">
              {/* BOTÓN - */}
              <button
                className="text-black w-7 h-7 flex items-center justify-center border rounded-md bg-gray-300 hover:bg-gray-100"
                onClick={() => handleAdd(item, -1)}
                disabled={item.cantidad <= 1}
              >
                –
              </button>

              <span className="font-semibold text-black">{item.cantidad}</span>

              {/* BOTÓN + */}
              <button
                className="text-black w-7 h-7 flex items-center justify-center border rounded-md bg-gray-300 hover:bg-gray-100"
                onClick={() => handleAdd(item, +1)}
              >
                +
              </button>
            </div>

            {/* TOTAL + DELETE */}
            <div className="text-right flex justify-end items-center gap-4">

              {/* TOTAL */}
              <div>
                <p className="text-gray-900 font-medium">
                  ${item.subtotal.toLocaleString("es-CO")}
                </p>
              </div>

              {/* BOTÓN ELIMINAR */}
              <button
                className="text-gray-400 hover:text-red-500 text-xl"
                onClick={() => handleDelete(item)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
