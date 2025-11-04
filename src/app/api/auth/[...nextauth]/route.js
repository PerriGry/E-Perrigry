import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { googleLogin } from "@/services/google.service";
import { generate_token } from "@/services/auth.service";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //CallBack al momento que el User Realice un Inicio de Sesion
    async signIn({ user }) {
      try {
        //Llamar al servicio de Login con google
        //Sí no se encuentra en la base de datos, lo registra automaticamente
        const result = await googleLogin(user.name, user.email, user.id);
        //Verificacion de los Resultados
        if (!result || !result.idcliente) {
          console.error("Error: no se obtuvo idCliente");
          return false;
        }

        //Generar tokens con el id correspondiente
        const { access_token, refresh_token } = generate_token({
          idcliente: result.idcliente, 
        });

        //Guardar los tokens en cookies
        const cookieStore = await cookies();
        cookieStore.set("access_token", access_token);
        cookieStore.set("refresh_token", refresh_token);
        //Retornar true -> Decirle a Nextauth que el login ha sido exitoso
        return true;
      } catch (error) {
        console.error("Error en signIn con Google:", error);
        //Retornar false -> Decirle a Nextauth que cancele el proceso de login
        return false;
      }
    },

    //Callback para manejar datos sin la necesidad de tokens (Funcion disponible solo en Produccion)
    async session({ session }) {
      return session;
    },
  },
});
//Decirle al handler que maneje rutas GET y POST
//GET -> Retornar los datos del user gracias a session
//POST -> Poder Insertar los datos traidos de google hacia los servicios de la base de datos
export { handler as GET, handler as POST };
