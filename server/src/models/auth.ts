import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export async function registerUser(data: { email: string; password: string }) {
  const hashed = await bcrypt.hash(data.password, 10);
  const findedUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (findedUser) throw new AppError("User already exists", 409);

  const user = await prisma.user.create({
    data: { ...data, password: hashed },
  });

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export async function loginUser(data: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new AppError("User not found", 401);

  const passwordIsValid = await bcrypt.compare(data.password, user.password);
  if (!passwordIsValid) throw new AppError("Invalid password", 401);

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
