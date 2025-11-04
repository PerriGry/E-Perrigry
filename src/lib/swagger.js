import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de tu Proyecto Next.js",
      version: "1.0.0",
      description: "Documentación Swagger de la API construida con Next.js App Router",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "access_token",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor local",
      },
    ],
  },
  // Ruta de Endpoints con comentarios @swagger
  apis: ["./src/app/api/**/*.js", "./src/app/api/**/*.jsx", "./src/app/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
