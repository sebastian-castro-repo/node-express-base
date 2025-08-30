import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function authMiddleware(req, res, next) {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Token requerido" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Token inválido" });

    try {
        req.user = jwt.verify(token, config.jwtSecret);
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token no válido o expirado" });
    }
}
