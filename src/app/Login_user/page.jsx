import {Input} from '@/components'
import Image from 'next/image'


export default function Login() {
    return (
        <div className="bg-slate-200 w-screen h-screen flex items-center justify-center" >

            <div className=" ">
                <Image src=""></Image>
            </div>
            <div className="text-black">
                <h1>E- Perrigry</h1>
                <p>Los mejores accesorios para tu mascota</p>

                <form action="">
                    <p>Nombre de usuario</p>
                    <input type="text" placeholder="Ingrese el usuario" className="border-1 border-black bg-white " />
                    <p>Contraseña</p>
                    <button className="text-decoration-none text-teal-700 cursor-pointer">
                        olvidaste tu contraseña?
                    </button>

                    <button className="bg-slate-700 text-white border-black cursor-pointer">
                        Enviar
                    </button>
                </form>
            </div>
        </div>

    )
}