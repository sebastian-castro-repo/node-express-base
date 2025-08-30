import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {RegisterRequest} from "../models/Auth.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RegisterResponse"
 */
router.post("/register", validateSchema(RegisterRequest), register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *           example:
 *             email: "usuario@ejemplo.com"
 *             password: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginResponse"
 *             example:
 *               message: "Login exitoso"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 id: 1
 *                 name: "Juan Pérez"
 *                 email: "usuario@ejemplo.com"
 */
router.post("/login", login);
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Perfil protegido", user: req.user });
});

export default router;
