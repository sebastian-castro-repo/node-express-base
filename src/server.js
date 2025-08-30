import dotenv from "dotenv";
import { swaggerDocs } from "./config/swagger.js";

const env = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${env}` });

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} [${env}]`);
});

swaggerDocs(app);