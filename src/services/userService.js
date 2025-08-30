import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js"; // donde guardaste JWT_SECRET

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function createUser(data) {
    return await prisma.user.create({ data });
}

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: "Email ya registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        res.status(500).json({ error: "Error en el registro" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

        // Comparar password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Credenciales inválidas" });

        // Generar token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ error: "Error en el login" });
    }
}

