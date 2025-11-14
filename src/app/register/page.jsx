"use client"
import { useState } from "react";
import Image from "next/image";
import { ButtonGoogleLogin, inputCheckPassword, inputPassword, inputUser, buttonSubmit, inputEmail } from "@/components";

export default function Register() {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const nombre = formData.get("nombre");
        const email = formData.get("email");
        const pwd = formData.get("password");
        const checkPwd = formData.get("checkPassword");

        if (pwd !== checkPwd) {
            alert("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, email, pwd }),
            });

            const data = await res.json();
            console.log("Registro:", data);

            if (res.status === 201) {
                alert("Registro exitoso");
                window.location.href = "/Login_user";
            } else {
                alert(data.error || "Error al registrar el usuario");
            }

        } catch (err) {
            console.log("Error frontend:", err);
            alert("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white w-screen h-screen flex items-center justify-center">

            {/* IMAGEN */}
            <div className="border-2 border-black w-100 h-150 flex items-center justify-center">
                <Image src={"/login_cat.jpg"} width={400} height={100} alt="Registro" />
            </div>

            {/* FORMULARIO */}
            <div className="w-100 h-150 text-black border-2 border-black flex flex-col items-center p-1">
                <h1 className="text-black text-2xl font-bold">Registro</h1>
                <p className="text-black text-lg font-semibold">¡Regístrate en PerriGry!</p>

                <form className="w-full mt-2 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
                    {inputUser()}       {/* Debe tener name="nombre" */}
                    {inputEmail()}      {/* Debe tener name="email" */}
                    {inputPassword()}   {/* Debe tener name="password" */}
                    {inputCheckPassword()} {/* Debe tener name="checkPassword" */}

                    <div className="flex justify-center mt-4">
                        {buttonSubmit(loading ? "Registrando..." : "Registrarse")}
                    </div>

                    <div className="flex justify-center mt-4">
                        <ButtonGoogleLogin />
                    </div>
                </form>

                {/* BOTON DE LOGIN */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/Login_user" className="text-blue-600 hover:underline font-semibold">
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

}
