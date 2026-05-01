import Router from "express";
import { auth, refreshToken } from "../controllers/auth";
import { loginUser, registerUser } from "../models/auth";
import { authMiddleware } from "../middleware/auth";

const authRouter = Router();

authRouter.post("/register", auth(registerUser));
authRouter.post("/login", auth(loginUser));
authRouter.post("/refresh", authMiddleware, refreshToken);

export default authRouter;
