import swaggerUi from "swagger-ui-express";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Roman Project Manager API",
    version: "1.0.0",
    description: "Project Management System API",
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
  ],

  paths: {
    "/health": {
      get: {
        summary: "Health Check",
        responses: {
          "200": {
            description: "Server is healthy",
          },
        },
      },
    },
  },
};

export { swaggerUi };