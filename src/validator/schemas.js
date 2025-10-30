import z from "zod";

//Schema para Iniciar Sesion
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Minimo el Uso de 6 Caracteres")
})

//Schema para Registrar Clientes
export const registerSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre no puede tener más de 100 caracteres"),
    email: z.email(),
    pwd: z.string().min(6, "Minimo el Uso de 6 Caracteres")
})

//Schema para la Insercion de Un Producto al Carrito
export const cartSchema = z.object({
    idProducto: z.number().int("Must be an Integer").nonnegative("El stock no puede ser negativo"),
    cantidad : z.number().int("Must be an Integer").nonnegative("El stock no puede ser negativo")
})

//Schema para Filtrar Productos por Categoria
export const productFilterSchema = z.object({
    category: z.enum(["Gato", "Perro", "Hamster"], {
        required_error: "La categoría es obligatoria",
        invalid_type_error: "Categoría inválida",
      }),
})

//Schema para Registrar Productos
export const productRegisterSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre no puede tener más de 100 caracteres"), 
    stock: z.number().int("Must be an Integer").nonnegative("El stock no puede ser negativo"), 
    precio: z.number().positive("El precio debe ser mayor que 0").max(9999999, "El precio es demasiado alto"), 
    category: z.enum(["Gato", "Perro", "Hamster"], {
        required_error: "La categoría es obligatoria",
        invalid_type_error: "Categoría inválida",
    })
})

//Schema para Actualizar Porductos
export const productUpdateSchema = z.object({
    idProducto: z.number().int("Must be an Integer").nonnegative("El Id no puede ser negativo"), 
    stock: z.number().int("Must be an Integer").nonnegative("El stock no puede ser negativo"),
    precio: z.number().positive("El precio debe ser mayor que 0").max(9999999, "El precio es demasiado alto")
})

//Schema para Eliminar Porductos
export const productDeleteSchema = z.object({
    idProducto: z.number().int("Must be an Integer").nonnegative("El Id no puede ser negativo")
})

//Schema para Registrar Venta
export const SaleSchema = z.object({
    idProductos: z.array(z.number().int("Must be an Integer")).nonempty("Debe haber al menos un producto"), 
    cantidad : z.array(z.number().int("Must be an Integer")).nonempty("Debe haber al menos una cantidad")
})
