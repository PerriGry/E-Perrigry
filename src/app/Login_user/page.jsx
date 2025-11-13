'use client'
import Image from "next/image";
import { ButtonGoogleLogin, inputPassword, inputUser, buttonSubmit, inputEmail } from "@/components";

const logo = "/user.png"


export default function Login() {
    return (
        <div className="flex items-center justify-center align-middle w-screen h-screen bg-white">

            <div className="flex items-center justify-center">
                <div className="border-2 border-black w-90 h-120 flex items-center justify-center">
                    <Image src={logo} width={200} height={200} alt="" />
                </div>
                <div className=" w-90 h-120 bg-white text-black border-2 border-black flex flex-col items-center ">
                    <h1 className="font-bold text-4xl ">E- Perrigry</h1>
                    <h3 className="font-semibold ">Los mejores accesorios para tu mascota</h3>
                    <form className="w-full mt-2 ml-20">
                        {inputUser()}
                        {inputEmail()}
                        {inputPassword()}
                        <div className="flex justify-center mt-4 mr-20">
                            {buttonSubmit()}
                        </div>
                        <div className="flex justify-center mt-4 mr-20">
                        <ButtonGoogleLogin />
                    </div>
                    </form>
                </div>
            </div>

        </div>
    );
}