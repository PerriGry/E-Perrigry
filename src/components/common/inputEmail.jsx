

export default function inputEmail() {
    return (
        <div>
            <p className="text-2xl font-bold">Correo Electrónico</p>
            <input type="email" placeholder="Ingresa tu correo electrónico" className="border border-gray-300 rounded-md p-2 w-70 mb-4" name="email"  />
        </div>
    );
}