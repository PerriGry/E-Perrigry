import Link from "next/link";
import Image from "next/image";

const logo = '/Perrigry_logo_ennegro.png'
const cart = '/cart.png'
const user ='/user.png'

export default function Headers(){
    return(
        <header className="flex justify-between w-full h-[80px] bg-white ">
            <Image src ={logo} width={100} height={100} alt="logo"></Image>

            <div className=" flex justify-between mr-250 items-center text-black font-bold ">
                <Link className="mr-6 " href='/'>Inicio</Link>
                <Link className="mr-6" href='/' >Perros</Link>
                <Link className="mr-6" href='/' >Gatos</Link>
                <Link className="mr-6" href='/contact' >Hampter </Link>

            </div>

             <div className="flex items-center">
                    <Link className="mr-4" href={"/Logout_user"}>
                        <Image src={user} width={40} height={40} alt="user"></Image>
                    </Link>
                    <Link className="mr-20" href={"/"}>
                        <Image src={cart} width={40} height={40} alt="carrito"></Image>
                    </Link>
                </div>


        </header>
    )
}