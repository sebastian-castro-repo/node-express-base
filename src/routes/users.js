import { Router } from "express";
import { getUsers, createUser } from "../services/userService.js";

const router = Router();

router.get("/", async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.post("/", async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json(user);
});

export default router;
