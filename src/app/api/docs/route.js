import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  spec: {
    url: "/api/swagger.json", //Archivo Json 
  },
  layout: "modern", 
  theme: "default", 
  hideDownloadButton: false,
};

export const GET = ApiReference(config);
