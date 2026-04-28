import { NextFunction, Request, Response } from "express";

export function auth(
  fn: (data: { email: string; password: string }) => Promise<string>,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await fn(req.body);
      res.cookie("refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  };
}
