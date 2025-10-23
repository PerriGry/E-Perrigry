import { inputPassword, inputUser, buttonSubmit, inputEmail } from "@/components";
import Image from "next/image";


const logo = "/userIcon.png"

export default function Register() {
    return (
        <div className="flex items-center justify-center align-middle w-screen h-screen bg-white">

            <div className="flex items-center justify-center">
                <div className="border-1 border-black w-80 h-100 flex items-center justify-center">
                    <Image src={logo} width={100} height={100} alt="" />
                </div>
                <div className=" w-80 h-100 bg-white text-black border-1 border-black flex flex-col items-center ">
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