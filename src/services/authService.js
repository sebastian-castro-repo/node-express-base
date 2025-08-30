import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { PrismaClient } from "@prisma/client";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages.js";

const prisma = new PrismaClient();

export async function registerUser({ name, email, password }) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    const { password: _, ...safeUser } = user;

    return { message: SUCCESS_MESSAGES.AUTH.REGISTER, user: safeUser };
}

export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

    const token = jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
    );

    const { password: _, ...safeUser } = user;

    return { message: SUCCESS_MESSAGES.AUTH.LOGIN, token, user: safeUser };
}
