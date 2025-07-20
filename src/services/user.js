import { prisma } from "@/utils/prisma";

import { hashPassword } from "./auth";

export async function createUser(name, email, password) {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function getUserByEmail(email, withPassword = false) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: withPassword,
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: withPassword ? user.password : undefined,
  };
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
