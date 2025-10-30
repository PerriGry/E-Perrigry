import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  spec: {
    url: "/api/swagger.json", // Tu archivo OpenAPI
  },
  layout: "modern", // puedes probar "classic" o "sidebar"
  theme: "default", // otros: "alternate", "dark"
  hideDownloadButton: false,
};

export const GET = ApiReference(config);
