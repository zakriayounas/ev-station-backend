// src/utils/swagger.js
require("dotenv").config(); // load env variables first
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EV Booking & User Management API",
      version: "1.0.0",
      description: "API documentation for EV station booking app",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:5000", // uses env or fallback
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // <-- correct path from project root
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
