import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import * as Schemas from "../models/index.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: process.env.API_TITLE,
            version: process.env.API_VERSION,
            description: process.env.API_DESCRIPTION
        },
        servers: [
            {
                url: process.env.API_SERVER_URL,
                description: `Servidor ${process.env.NODE_ENV}`
            }
        ],
        components: {
            schemas: {
                ...Schemas
            }
        }
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/docs-json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.json(swaggerSpec);
    });
}
