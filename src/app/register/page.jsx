import { inputPassword, inputUser, buttonSubmit, inputEmail } from "@/components";
import Image from "next/image";


const logo = "/userIcon.png"

export default function Register() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-yellow-200">

            <div className="flex items-center justify-center">
                <div className="border border-black w-80 h-110 flex items-center justify-center bg-white">
                    <Image src={logo} width={100} height={100} alt="Logo"/>
                </div>
                <div className=" w-100 h-110 bg-white text-black border-1 border-black flex flex-col items-center ">
                    <h1 className="font-bold text-4xl ">Registro</h1>
                    <h3>Registrate en PerriGry!</h3>
                    <form className="w-full ml-1">
                        {inputUser()}
                        {inputEmail()}
                        {inputPassword()}
                        <div className="flex justify-center mt-4">
                            {buttonSubmit()}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}