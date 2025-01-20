import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const createSwaggerSpec = (apiPaths) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "3W API Node",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
          description: "Development server",
        },
        {
          url: "https://api-3w-social-media-backend.netlify.app",
          description: "Live server",
        },
      ],
    },
    apis: apiPaths,
  };

  return swaggerJsdoc(options);
};

export const swaggerConfig = (app) => {
  app.use((req, res, next) => {
    let param = req.url.split("/").filter(Boolean)[1];

    if (param === "user") {
      const userSpec = createSwaggerSpec(["./User/Routes/**/*.js"]);
      app.use("/swagger/user", serve, setup(userSpec));
    }

    if (param === "admin") {
      const adminSpec = createSwaggerSpec(["./Admin/Routes/**/*.js"]);
      app.use("/swagger/admin", serve, setup(adminSpec));
    }

    next();
  });
};
