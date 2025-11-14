"use client"
import Image from "next/image";
import Link from "next/link";
import { ButtonGoogleLogin, inputPassword, buttonSubmit, inputEmail } from "@/components";

export default function Login() {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("Respuesta Login:", data);

            if (res.status === 201) {
                alert("Login exitoso");
                window.location.href = "/";
            } else {
                alert(data.error || data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            console.log("Error frontend:", error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-white">

            <div className="flex items-center justify-center">
                
                {/* PANEL IZQUIERDO */}
                <div className="border-2 border-black w-90 h-120 flex items-center justify-center">
                    <Image src={"/user.png"} width={200} height={200} alt="" />
                </div>

                {/* PANEL DERECHO */}
                <div className="w-90 h-120 bg-white text-black border-2 border-black flex flex-col items-center">
                    
                    <h1 className="font-bold text-4xl">E- Perrigry</h1>
                    <h3 className="font-semibold">Los mejores accesorios para tu mascota</h3>

                    {/* FORMULARIO */}
                    <form className="w-full mt-2 ml-20" onSubmit={handleSubmit}>
                        
                        {inputEmail()}
                        {inputPassword()}

                        <div className="flex justify-center mt-4 mr-20">
                            {buttonSubmit("Iniciar Sesión")}
                        </div>

                        <div className="flex justify-center mt-4 mr-20">
                            <ButtonGoogleLogin />
                        </div>

                    </form>

                    {/* BOTÓN DE REGISTRO */}
                    <div className="mt-4">
                        <Link 
                            href="/register" 
                            className="text-blue-600 font-medium hover:underline"
                        >
                            ¿No tienes una cuenta? Regístrate
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}
