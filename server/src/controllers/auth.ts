import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export function auth(
  fn: (data: { email: string; password: string }) => Promise<string>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await fn(req.body);
      res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  };
}

export function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const userID = req.user?.userId;
    if (!userID) throw new AppError("User not found", 401);
    const newToken = jwt.sign({ userId: userID }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.cookie("refreshToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Refreshed" });
  } catch (error) {
    next(error);
  }
}
