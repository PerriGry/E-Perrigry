
export default function inputCheckPassword() {
    return (
        <div>
            <p className="text-2xl font-bold">Confirma tu Contraseña</p>
            <input type="password" placeholder="contraseña" className="border border-gray-300 rounded-md p-2 w-70 mb-4" name="checkPassword" />
        </div>
    );
}