import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import routes from "./routes/index.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

app.use("/api", routes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


export default app;