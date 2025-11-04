'use client'
import Image from "next/image";
import { ButtonGoogleLogin, inputCheckPassword, inputPassword, inputUser, buttonSubmit, inputEmail } from "@/components";
const login_cat = "/login_cat.jpg"


export default function Login() {
    return (
        <div className="bg-white w-screen h-screen flex items-center justify-center" >

            <div className="border-1 border-black w-100 h-150 flex items-center justify-center">
                <Image src={login_cat} width={400} height={100} alt="" />
            </div>

            <div className="w-100 h-150 text-black border-1 border-black flex flex-col items-center">
                <h1 className="text-black text-2xl font-bold">E- Perrigry</h1>
                <p className="text-black text-2xl font-bold">Los mejores accesorios para tu mascota</p>

                <form action="">
                    {inputUser()}
                    {inputEmail()}
                    {inputPassword()}
                    {inputCheckPassword()}
                    <div className="flex justify-center mt-4">
                        {buttonSubmit()}
                    </div>
                    <div className="flex justify-center mt-4">
                        <ButtonGoogleLogin />
                    </div>
                </form>
            </div>
        </div>

    )
}