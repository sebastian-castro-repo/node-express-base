import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "Usuario creado", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { user, token } = await loginUser(req.body);
        res.json({ message: "Login exitoso", token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
