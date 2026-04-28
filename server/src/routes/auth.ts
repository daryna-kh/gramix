import Router from "express";
import { auth } from "../controllers/auth";
import { loginUser, registerUser } from "../models/auth";

const authRouter = Router();

authRouter.post("/register", auth(registerUser));
authRouter.post("/login", auth(loginUser));

export default authRouter;
